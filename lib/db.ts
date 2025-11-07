/**
 * Simple JSON-based database for purchases
 * In production, replace with a real database (Prisma + PostgreSQL, Supabase, etc.)
 */

import { promises as fs } from 'fs';
import path from 'path';
import { getTierById } from '../config/storeTiers';

export interface Purchase {
  id: string;
  userId: string; // Discord user ID
  tier: string;
  priorityPoints: number;
  startDate: string; // ISO date string
  expiryDate: string; // ISO date string
  discordRoleId: string;
  active: boolean;
  createdAt: string; // ISO date string
}

const DB_PATH = path.join(process.cwd(), 'data', 'purchases.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.dirname(DB_PATH);
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
}

/**
 * Read all purchases from JSON file
 */
export async function getPurchases(): Promise<Purchase[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist yet, return empty array
    return [];
  }
}

/**
 * Write purchases to JSON file
 */
async function savePurchases(purchases: Purchase[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(DB_PATH, JSON.stringify(purchases, null, 2), 'utf-8');
}

/**
 * Create a new purchase record
 */
export async function createPurchase(
  userId: string,
  tierId: string
): Promise<Purchase> {
  const tier = getTierById(tierId);
  if (!tier) {
    throw new Error(`Tier not found: ${tierId}`);
  }

  const purchases = await getPurchases();
  const now = new Date();
  const expiryDate = new Date(now);
  expiryDate.setDate(expiryDate.getDate() + tier.durationDays);

  const purchase: Purchase = {
    id: `purchase_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    tier: tierId,
    priorityPoints: tier.priorityPoints,
    startDate: now.toISOString(),
    expiryDate: expiryDate.toISOString(),
    discordRoleId: tier.discordRoleId,
    active: true,
    createdAt: now.toISOString()
  };

  purchases.push(purchase);
  await savePurchases(purchases);

  return purchase;
}

/**
 * Get active purchases for a user
 */
export async function getUserPurchases(userId: string): Promise<Purchase[]> {
  const purchases = await getPurchases();
  return purchases.filter(
    p => p.userId === userId && p.active && new Date(p.expiryDate) > new Date()
  );
}

/**
 * Get all expired purchases
 */
export async function getExpiredPurchases(): Promise<Purchase[]> {
  const purchases = await getPurchases();
  const now = new Date();
  return purchases.filter(
    p => p.active && new Date(p.expiryDate) <= now
  );
}

/**
 * Mark purchases as inactive (expired)
 */
export async function deactivatePurchases(purchaseIds: string[]): Promise<void> {
  const purchases = await getPurchases();
  purchases.forEach(p => {
    if (purchaseIds.includes(p.id)) {
      p.active = false;
    }
  });
  await savePurchases(purchases);
}

/**
 * Get purchase by ID
 */
export async function getPurchaseById(id: string): Promise<Purchase | null> {
  const purchases = await getPurchases();
  return purchases.find(p => p.id === id) || null;
}

