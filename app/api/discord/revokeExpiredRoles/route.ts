import { NextResponse } from 'next/server';
import { getExpiredPurchases, deactivatePurchases } from '../../../../lib/db';
import { removeDiscordRole } from '../../../../lib/discord';

/**
 * Endpoint to revoke expired Discord roles
 * Should be called by a cron job (e.g., Vercel Cron) daily
 * 
 * GET /api/discord/revokeExpiredRoles?secret=YOUR_CRON_SECRET
 */
export async function GET(request: Request) {
  try {
    // Optional: Add a secret check for cron security
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const expectedSecret = process.env.CRON_SECRET;

    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json(
        { ok: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get all expired purchases
    const expiredPurchases = await getExpiredPurchases();

    if (expiredPurchases.length === 0) {
      return NextResponse.json({
        ok: true,
        message: 'No expired purchases found',
        revoked: 0
      });
    }

    // Revoke roles for each expired purchase
    const results = await Promise.allSettled(
      expiredPurchases.map(async (purchase) => {
        const result = await removeDiscordRole(purchase.userId, purchase.discordRoleId);
        return {
          purchaseId: purchase.id,
          userId: purchase.userId,
          roleId: purchase.discordRoleId,
          success: result.success,
          message: result.message
        };
      })
    );

    const successful = results.filter(r => r.status === 'fulfilled' && r.value.success);
    const failed = results.filter(r => r.status === 'rejected' || (r.status === 'fulfilled' && !r.value.success));

    // Deactivate all expired purchases (even if role removal failed)
    const purchaseIds = expiredPurchases.map(p => p.id);
    await deactivatePurchases(purchaseIds);

    return NextResponse.json({
      ok: true,
      message: `Processed ${expiredPurchases.length} expired purchases`,
      revoked: successful.length,
      failed: failed.length,
      details: results.map(r => 
        r.status === 'fulfilled' ? r.value : { error: 'Promise rejected' }
      )
    });
  } catch (error) {
    console.error('Revoke expired roles error:', error);
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : 'Failed to revoke expired roles'
      },
      { status: 500 }
    );
  }
}

// Also support POST for cron services that prefer POST
export async function POST(request: Request) {
  return GET(request);
}

