import { NextResponse } from 'next/server';
import { assignDiscordRole } from '../../../../lib/discord';

export interface AssignRoleRequest {
  userId: string;
  roleId: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AssignRoleRequest;

    if (!body.userId || !body.roleId) {
      return NextResponse.json(
        { ok: false, message: 'Missing userId or roleId' },
        { status: 400 }
      );
    }

    const result = await assignDiscordRole(body.userId, body.roleId);

    if (result.success) {
      return NextResponse.json({
        ok: true,
        message: result.message
      });
    } else {
      return NextResponse.json(
        {
          ok: false,
          message: result.message,
          error: result.error
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Assign role error:', error);
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : 'Failed to assign role'
      },
      { status: 500 }
    );
  }
}

