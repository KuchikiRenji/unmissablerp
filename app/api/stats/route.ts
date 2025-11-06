import { NextResponse } from "next/server";
import { generateMockStats } from "../../../lib/mock";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = generateMockStats();
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}


