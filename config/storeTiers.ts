export interface StoreTier {
  id: string;
  name: string;
  description: string;
  price: number;
  priorityPoints: number;
  durationDays: number;
  discordRoleId: string;
  color: string;
  gradient: string;
}

// Base tier definitions (client-safe, no process.env)
const BASE_TIERS = [
  {
    id: 'bronze',
    name: 'Bronze Queue Priority',
    description: 'Skip ahead in the queue with basic priority access. Perfect for casual players.',
    price: 5.99,
    priorityPoints: 10,
    durationDays: 30,
    color: '#cd7f32',
    gradient: 'linear-gradient(135deg, #cd7f32 0%, #8b5a2b 100%)'
  },
  {
    id: 'silver',
    name: 'Silver Queue Priority',
    description: 'Enhanced queue priority with faster access during peak hours.',
    price: 9.99,
    priorityPoints: 25,
    durationDays: 30,
    color: '#c0c0c0',
    gradient: 'linear-gradient(135deg, #c0c0c0 0%, #8b8b8b 100%)'
  },
  {
    id: 'gold',
    name: 'Gold Queue Priority',
    description: 'Premium priority access with significant queue advantages. Get in fast!',
    price: 14.99,
    priorityPoints: 50,
    durationDays: 30,
    color: '#ffd700',
    gradient: 'linear-gradient(135deg, #ffd700 0%, #ffb347 100%)'
  },
  {
    id: 'diamond',
    name: 'Diamond Queue Priority',
    description: 'Elite tier with maximum queue priority. Almost instant access guaranteed.',
    price: 24.99,
    priorityPoints: 100,
    durationDays: 30,
    color: '#b9f2ff',
    gradient: 'linear-gradient(135deg, #b9f2ff 0%, #4dd0e1 100%)'
  },
  {
    id: 'god',
    name: 'God Queue Priority',
    description: 'Ultimate priority tier. Bypass the queue entirely and join instantly.',
    price: 39.99,
    priorityPoints: 200,
    durationDays: 30,
    color: '#ff6a00',
    gradient: 'linear-gradient(135deg, #ff6a00 0%, #ffb347 50%, #ffd700 100%)'
  }
];

const BASE_ADDON_24H = {
  id: '24hour',
  name: '24-Hour Priority',
  description: 'Short-term priority boost. Perfect for a gaming session or event.',
  price: 2.99,
  priorityPoints: 15,
  durationDays: 1,
  color: '#4F98C0',
  gradient: 'linear-gradient(135deg, #4F98C0 0%, #1F4BBE 100%)'
};

// Server-side: Add role IDs from environment variables
// Client-side: Role IDs will be empty strings (not used on client)
function getRoleId(tierId: string): string {
  if (typeof process === 'undefined' || !process.env) return '';
  
  const roleIdMap: Record<string, string> = {
    'bronze': process.env.DISCORD_ROLE_ID_BRONZE || '',
    'silver': process.env.DISCORD_ROLE_ID_SILVER || '',
    'gold': process.env.DISCORD_ROLE_ID_GOLD || '',
    'diamond': process.env.DISCORD_ROLE_ID_DIAMOND || '',
    'god': process.env.DISCORD_ROLE_ID_GOD || '',
    '24hour': process.env.DISCORD_ROLE_ID_24H || ''
  };
  
  return roleIdMap[tierId] || '';
}

export const STORE_TIERS: StoreTier[] = BASE_TIERS.map(tier => ({
  ...tier,
  discordRoleId: getRoleId(tier.id)
}));

export const ADDON_24H: StoreTier = {
  ...BASE_ADDON_24H,
  discordRoleId: getRoleId('24hour')
};

export function getTierById(id: string): StoreTier | undefined {
  return STORE_TIERS.find(tier => tier.id === id) || (id === '24hour' ? ADDON_24H : undefined);
}

