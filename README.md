# UNMISSABLERP — FiveM GTA RP Community Website

**A modern, animated FiveM GTA RP (Grand Theft Auto roleplay) community website.** Built with Next.js, TypeScript, and Tailwind CSS. Whitelist applications, live server stats, server assets management, and Discord integration — designed for serious roleplay communities.

---

## About UNMISSABLERP

UNMISSABLERP is a **FiveM GTA RP server** and community focused on **serious roleplay**, a living economy, and high-stakes stories. This repository is the official **community website**: landing page, whitelist application form, public stats dashboard, store placeholder, and server assets management (scripts, MLOs, vehicles).

- **Serious RP, zero nonsense** — Curated whitelist keeps quality high.
- **Economy that breathes** — Player-driven businesses and supply/demand.
- **Events that matter** — Heists, elections, turf wars; choices ripple through the city.

---

## Quick Start

1. **Images:** Place 5 hero/feature images in `public/` as:
   - `IMAGEA.jpg`, `IMAGEB.jpg`, `IMAGEC.jpg`, `IMAGED.jpg`, `IMAGEE.jpg`
2. **Install and run:**

```bash
npm install
npm run dev
```

Open **http://localhost:3000**

---

## Tech Stack

| Category        | Technology                          |
|----------------|-------------------------------------|
| Framework      | Next.js 14 (App Router) + TypeScript |
| Styling        | Tailwind CSS                        |
| Animation      | Framer Motion                       |
| Data fetching  | SWR (polling)                       |
| Charts         | Recharts                            |
| Forms          | React Hook Form + Zod               |

---

## Pages & Features

| Route         | Description |
|---------------|-------------|
| **/**         | Home — Hero, features, live player count, Discord CTA |
| **/apply**    | Whitelist application (client + server validation → `/api/apply`) |
| **/store**    | Store placeholder (mock items) |
| **/community**| Social hub — links, Discord widget, Web3 placeholder |
| **/dashboard**| Public stats (live player count, charts, 10s polling) + **Server Assets** (scripts, MLOs, vehicles) |

---

## API Endpoints

- `GET /api/stats` — Live stats (player count, uptime, economy, players over time)
- `POST /api/apply` — Submit whitelist application
- `GET /api/assets/[type]` — List assets by type (script, mlo, vehicle)
- `POST /api/assets/upload` — Placeholder for future OneDrive sync

Replace mock logic in `lib/mock.ts` or point fetchers to your own FiveM/CFX API for production.

---

## Environment Variables

Create `.env.local` in the project root:

```env
# Discord (public invite used in CTAs)
NEXT_PUBLIC_DISCORD_INVITE=https://discord.gg/9GEpKfgx

# Optional: future bot / OneDrive integration
DISCORD_BOT_TOKEN=
ONEDRIVE_API_KEY=
# Or Microsoft Graph:
# AZURE_CLIENT_ID=
# AZURE_CLIENT_SECRET=
# ONEDRIVE_FOLDER_PATH=/ServerAssets
```

---

## Server Assets Management

The dashboard includes a **Server Assets** section:

- **Types:** Scripts, MLOs, Vehicles
- **Classification:** Custom vs pre-made; filter by source, status, search
- **UI:** Framer Motion transitions; preferences stored client-side
- **Data:** Edit `data/assets.json` (structure in `lib/types.ts` → `AssetItem`)

Future: OneDrive/SharePoint sync via Microsoft Graph API (see `app/api/assets/upload/route.ts`).

---

## Brand & Design

- **Colors (Tailwind):** `brand.orange` `#FF6A00`, `brand.black`, `accent.blue1/2/3`, `muted`
- **Gradients:** `bg-gradient-hero`, `bg-gradient-brand`, `bg-gradient-deep`
- **Fonts:** Poppins (headings), Inter (body) via `next/font` in `app/layout.tsx`

Edit `tailwind.config.js` and `app/layout.tsx` to customize.

---

## Deployment (Vercel)

1. Push to GitHub  
2. Import project in [Vercel](https://vercel.com)  
3. Set environment variables  
4. Deploy (defaults in `vercel.json`)

---

## Tests

```bash
npm run test
```

Uses **Vitest** and **Testing Library** (e.g. ApplyForm validation in `__tests__/ApplyForm.test.tsx`).

---

## Project Structure

```
app/
  api/apply, stats, assets/[type], assets/upload
  apply, community, dashboard, store, page.tsx, layout.tsx
components/
  Hero, Header, Footer, ApplyForm, AssetCard, DashboardStats, DiscordJoin, ...
data/
  assets.json
lib/
  mock.ts, types.ts
styles/
  globals.css
```

---

## Author & Contact

**KuchikiRenji**

- **Email:** [KuchikiRenji@outlook.com](mailto:KuchikiRenji@outlook.com)
- **GitHub:** [github.com/KuchikiRenji](https://github.com/KuchikiRenji)
- **Discord:** `kuchiki_renji`

---

## License & Credits

© UNMISSABLERP. This project is the official UNMISSABLERP community website. Adjust copy in `lib/types.ts` and theme in `tailwind.config.js` for your own deployment.
