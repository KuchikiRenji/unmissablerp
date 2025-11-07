import { NextResponse } from 'next/server';
import { isDiscordConfigured } from '../../../../lib/discord';

export async function GET() {
  return NextResponse.json({
    configured: isDiscordConfigured()
  });
}

