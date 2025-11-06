<<<<<<< HEAD
# unmissableRP
=======
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
Create `.env.local` in the project root:

```
# Discord bot token placeholder for future server/bot actions
DISCORD_BOT_TOKEN=

# Public invite (used in CTAs)
NEXT_PUBLIC_DISCORD_INVITE=https://discord.gg/9GEpKfgx
```

## Pages
- `/` Home (hero, features, live preview, Discord CTA)
- `/apply` Whitelist application (client + server validation; posts to `/api/apply`)
- `/store` Store placeholder (mock items; checkout disabled)
- `/community` Social hub (links + Discord widget + teaser + Web3 placeholder)
- `/dashboard` Public stats (live player count; charts; 10s polling)

## APIs (mock)
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
3. Set Environment Variables from above
4. Deploy (defaults in `vercel.json`)

Vercel will auto-build and provide a preview URL. Production promotes on merge.

## Discord integration (placeholders)
- Prominent Join Discord CTAs use `NEXT_PUBLIC_DISCORD_INVITE`
- Placeholder for Discord OAuth and user ↔ in-game identity linking is noted on the Apply page
- `DISCORD_BOT_TOKEN` is reserved for future bot actions (not used in mock)

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
  api/apply/route.ts
  api/stats/route.ts
  apply/page.tsx
  community/page.tsx
  dashboard/page.tsx
  layout.tsx
  page.tsx
components/
  AnimatedCounter.tsx
  ApplyForm.tsx
  DashboardStats.tsx
  DiscordJoin.tsx
  FeatureCard.tsx
  Footer.tsx
  Header.tsx
lib/
  mock.ts
  types.ts
styles/
  globals.css
```

## Design decisions
- App Router with client components for UX-heavy parts (forms, charts)
- Framer Motion for page/section motion without overdoing it
- Live stats poll every 10s via SWR; animated numbers for delight
- Store is non-transactional placeholder by intent

---

Made sensible defaults where ambiguous. Adjust copy in `lib/types.ts` and colors in `tailwind.config.js`.


>>>>>>> 554a449 (initial commit)
