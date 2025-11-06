import { NextResponse } from "next/server";
import type { ApplyRequest } from "../../../lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as ApplyRequest;
  // Mock validation + processing; in real usage, save to DB, notify Discord, etc.
  if (!body.fullName || !body.discordTag || !body.ign) {
    return NextResponse.json({ ok: false, message: "Invalid" }, { status: 400 });
  }

  return NextResponse.json({ ok: true, message: "Application received" });
}


