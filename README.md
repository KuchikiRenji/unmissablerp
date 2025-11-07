# UNMISSABLERP — Next-level GTA RP (Next.js + Tailwind + TS)

Modern, animated website scaffold for a FiveM GTA RP community. Uses Next.js App Router, Tailwind, TypeScript, Framer Motion, SWR, and Recharts. Built for Vercel.

## Quick start

1. Place your 5 images in `public/` using `.jpg` filenames:
   - `IMAGEA.jpg`, `IMAGEB.jpg`, `IMAGEC.jpg`, `IMAGED.jpg`, `IMAGEE.jpg`
2. Install and run:

```bash
npm i
npm run dev
```

Open http://localhost:3000

## Tech
- Next.js App Router + TypeScript
- TailwindCSS
- Framer Motion
- SWR (polling)
- Recharts (responsive charts)
- React Hook Form + Zod (validation)

## Environment variables
Create `.env.local` in the project root (see `.env.local.example` for template):

```env
# Discord Bot Configuration
# Get your bot token from https://discord.com/developers/applications
DISCORD_BOT_TOKEN=your_discord_bot_token_here

# Discord Guild (Server) ID
# Right-click your Discord server → Server Settings → Widget → Enable Server Widget
DISCORD_GUILD_ID=your_discord_guild_id_here

# Discord Role IDs for each tier
# Get role IDs by enabling Developer Mode in Discord, right-clicking a role, and selecting "Copy ID"
DISCORD_ROLE_ID_BRONZE=your_bronze_role_id_here
DISCORD_ROLE_ID_SILVER=your_silver_role_id_here
DISCORD_ROLE_ID_GOLD=your_gold_role_id_here
DISCORD_ROLE_ID_DIAMOND=your_diamond_role_id_here
DISCORD_ROLE_ID_GOD=your_god_role_id_here
DISCORD_ROLE_ID_24H=your_24h_role_id_here

# Public invite (used in CTAs)
NEXT_PUBLIC_DISCORD_INVITE=https://discord.gg/9GEpKfgx

# Cron Secret (optional, for securing the revokeExpiredRoles endpoint)
CRON_SECRET=your_random_secret_here
```

### Discord Setup Steps

1. **Create a Discord Bot:**
   - Go to https://discord.com/developers/applications
   - Click "New Application" and give it a name
   - Go to the "Bot" section and click "Add Bot"
   - Copy the bot token (this is your `DISCORD_BOT_TOKEN`)

2. **Get Your Server (Guild) ID:**
   - Enable Developer Mode in Discord (User Settings → Advanced → Developer Mode)
   - Right-click your server → "Copy Server ID" (this is your `DISCORD_GUILD_ID`)

3. **Create Roles and Get Role IDs:**
   - In your Discord server, create roles for each tier: Bronze, Silver, Gold, Diamond, God, and 24-Hour
   - Right-click each role → "Copy ID" (these are your `DISCORD_ROLE_ID_*` values)
   - **Important:** The bot's role must be higher in the hierarchy than the roles it will assign

4. **Invite Bot to Server:**
   - In Discord Developer Portal, go to "OAuth2" → "URL Generator"
   - Select scopes: `bot`
   - Select bot permissions: `MANAGE_ROLES`, `VIEW_CHANNEL`, `CONNECT`
   - Copy the generated URL and open it in your browser to invite the bot

5. **Set Role Hierarchy:**
   - In Discord Server Settings → Roles, ensure the bot's role is above all tier roles
   - This allows the bot to assign/remove roles

## Pages
- `/` Home (hero, features, live preview, Discord CTA)
- `/apply` Whitelist application (client + server validation; posts to `/api/apply`)
- `/store` **Premium Queue Priority Store** (5 tiers + 24-hour add-on with Discord role integration)
- `/community` Social hub (links + Discord widget + teaser + Web3 placeholder)
- `/dashboard` Public stats (live player count; charts; 10s polling)

## APIs

### Store & Purchase APIs
- `POST /api/purchase` → Creates a purchase record and assigns Discord role
  - Body: `{ userId: string, tierId: string, paymentConfirmed?: boolean }`
  - Returns: `{ ok: boolean, purchase: {...}, discordRoleAssigned: boolean }`

- `POST /api/discord/assignRole` → Manually assign a Discord role to a user
  - Body: `{ userId: string, roleId: string }`

- `GET /api/discord/revokeExpiredRoles?secret=CRON_SECRET` → Revoke expired roles (for cron)
  - Returns: `{ ok: boolean, revoked: number, failed: number }`

- `GET /api/discord/checkConfig` → Check if Discord integration is configured
  - Returns: `{ configured: boolean }`

### Other APIs
- `GET /api/stats` → example live stats JSON
- `POST /api/apply` → returns `{ ok: true }`

To swap in real FiveM stats, replace logic inside `lib/mock.ts` and/or point the `fetcher` to your own endpoint.

### Mock seeding script (example)
The stats endpoint uses `generateMockStats()` from `lib/mock.ts`. Replace it with your server query (e.g., CFX/FiveM API) and return this shape:

```ts
export type StatsResponse = {
  playerCount: number;
  uptimeHours: number;
  economy: { gdp: number; businesses: number };
  playersOverTime: { t: string; v: number }[];
};
```

## Store System

The store system includes:

- **5 Premium Tiers:** Bronze, Silver, Gold, Diamond, and God Queue Priority
- **24-Hour Add-on:** Short-term priority boost
- **Discord Role Integration:** Automatically assigns/removes Discord roles based on purchases
- **Purchase Tracking:** JSON-based database (easily replaceable with Prisma/PostgreSQL/Supabase)
- **Expiry Management:** Cron job endpoint to revoke expired roles

### Store Tiers Configuration

Tiers are configured in `config/storeTiers.ts`. Each tier includes:
- Name, description, price
- Priority points
- Duration (30 days default, 24 hours for add-on)
- Discord role ID mapping
- Color gradients for UI

### Database

Purchases are stored in `data/purchases.json` (created automatically). In production, replace `lib/db.ts` with a real database:

```ts
// Example: Replace with Prisma
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
```

### Cron Job Setup (Vercel)

Add to `vercel.json`:

```json
{
  "crons": [{
    "path": "/api/discord/revokeExpiredRoles?secret=YOUR_CRON_SECRET",
    "schedule": "0 0 * * *"
  }]
}
```

This runs daily at midnight UTC to revoke expired roles.

## Brand & design tokens
Tailwind theme contains:
- `colors.brand.orange` `#FF6A00`
- `colors.brand.black` `#000000`
- `colors.accent.blue1` `#1F4BBE`
- `colors.accent.blue2` `#4F98C0`
- `colors.accent.blue3` `#21327B`
- `colors.muted` `#BDC1D6`

Change colors in `tailwind.config.js`. Global gradient utilities: `bg-gradient-hero`, `bg-gradient-brand`, `bg-gradient-deep`.

Fonts are loaded with `next/font` in `app/layout.tsx` (Poppins for headings, Inter for body). Update families/weights there.

## Accessibility
- Semantic headings, labeled inputs, validation messages
- Focus styles (`.focus-ring`) and WCAG AA-friendly contrast
- Keyboard navigation supported

## Performance & SEO
- `next/image` everywhere with responsive sizes
- Metadata + OG tags in `app/layout.tsx`
- Suggestion: create `public/og-image.png` by overlaying title on `IMAGEA` (e.g., via Figma/Photoshop or `sharp` script)

## Deployment (Vercel)
1. Push to GitHub
2. Import project in Vercel
3. Set Environment Variables (see Environment variables section above)
4. Add Cron Job configuration in `vercel.json` (see Cron Job Setup)
5. Deploy (defaults in `vercel.json`)

Vercel will auto-build and provide a preview URL. Production promotes on merge.

## Discord Integration

The Discord integration includes:

- **Automatic Role Assignment:** When a user purchases a tier, they automatically receive the corresponding Discord role
- **Role Revocation:** Expired purchases automatically remove Discord roles via cron job
- **Error Handling:** Graceful fallbacks if Discord API is unavailable
- **Configuration Check:** UI warning banner if Discord is not configured

### Required Discord Bot Permissions
- `MANAGE_ROLES` - To assign/remove roles
- `VIEW_CHANNEL` - To access guild information
- `CONNECT` - To interact with guild members

**Important:** The bot's role must be higher in the Discord server's role hierarchy than the roles it will assign.

## Web3 gating (future)
A clear placeholder card exists on `/community`. Swap in your wallet connector and token/NFT checks later.

## Tests
Run:

```bash
npm run test
```

Includes a simple ApplyForm validation test using Vitest + Testing Library.

## Project structure
```
app/
  api/
    apply/route.ts
    stats/route.ts
    purchase/route.ts
    discord/
      assignRole/route.ts
      revokeExpiredRoles/route.ts
      checkConfig/route.ts
  apply/page.tsx
  community/page.tsx
  dashboard/page.tsx
  store/page.tsx
  layout.tsx
  page.tsx
components/
  AnimatedCounter.tsx
  ApplyForm.tsx
  DashboardStats.tsx
  DiscordJoin.tsx
  DiscordConfigWarning.tsx
  FeatureCard.tsx
  Footer.tsx
  Header.tsx
  PurchaseModal.tsx
  StoreGrid.tsx
  Toast.tsx
config/
  storeTiers.ts
lib/
  db.ts
  discord.ts
  mock.ts
  types.ts
data/
  purchases.json (auto-generated)
styles/
  globals.css
```

## Design decisions
- App Router with client components for UX-heavy parts (forms, charts, store)
- Framer Motion for page/section motion and purchase animations
- Live stats poll every 10s via SWR; animated numbers for delight
- Store includes purchase modal with confetti animation on success
- Metallic gradient cards for each tier with hover effects
- Toast notifications for purchase feedback

---

Made sensible defaults where ambiguous. Adjust copy in `lib/types.ts` and colors in `tailwind.config.js`.
