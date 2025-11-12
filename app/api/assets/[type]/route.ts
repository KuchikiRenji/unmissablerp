import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { AssetItem } from "../../../../lib/types";

const DB_PATH = path.join(process.cwd(), "data", "assets.json");

async function getAssets(): Promise<AssetItem[]> {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;
  const validTypes = ["script", "mlo", "vehicle"];

  if (!validTypes.includes(type)) {
    return NextResponse.json(
      { error: "Invalid asset type. Must be: script, mlo, or vehicle" },
      { status: 400 }
    );
  }

  const assets = await getAssets();
  const filtered = assets.filter((asset) => asset.type === type);

  return NextResponse.json(filtered);
}

