import { NextResponse } from 'next/server';
import { createPurchase } from '../../../lib/db';
import { assignDiscordRole } from '../../../lib/discord';
import { getTierById } from '../../../config/storeTiers';

export interface PurchaseRequest {
  userId: string; // Discord user ID
  tierId: string;
  paymentConfirmed?: boolean; // Mock payment confirmation
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PurchaseRequest;

    // Validate request
    if (!body.userId || !body.tierId) {
      return NextResponse.json(
        { ok: false, message: 'Missing userId or tierId' },
        { status: 400 }
      );
    }

    // Validate tier exists
    const tier = getTierById(body.tierId);
    if (!tier) {
      return NextResponse.json(
        { ok: false, message: 'Invalid tier ID' },
        { status: 400 }
      );
    }

    // Mock payment confirmation (in production, verify with Stripe/PayPal/etc.)
    if (body.paymentConfirmed === false) {
      return NextResponse.json(
        { ok: false, message: 'Payment not confirmed' },
        { status: 400 }
      );
    }

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Create purchase record
    const purchase = await createPurchase(body.userId, body.tierId);

    // Assign Discord role
    const roleResult = await assignDiscordRole(body.userId, tier.discordRoleId);

    // Return success even if Discord role assignment fails (purchase is still recorded)
    // In production, you might want to handle this differently (queue for retry, etc.)
    return NextResponse.json({
      ok: true,
      message: 'Purchase successful',
      purchase: {
        id: purchase.id,
        tier: purchase.tier,
        expiryDate: purchase.expiryDate,
        priorityPoints: purchase.priorityPoints
      },
      discordRoleAssigned: roleResult.success,
      discordMessage: roleResult.message
    });
  } catch (error) {
    console.error('Purchase error:', error);
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : 'Purchase failed'
      },
      { status: 500 }
    );
  }
}

