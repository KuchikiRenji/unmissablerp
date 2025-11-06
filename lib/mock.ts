import type { StatsResponse } from "./types";

export function generateMockStats(): StatsResponse {
  const now = Date.now();
  const points = Array.from({ length: 24 }, (_, i) => {
    const t = new Date(now - (23 - i) * 60 * 60 * 1000);
    return { t: t.getHours().toString().padStart(2, "0") + ":00", v: Math.floor(20 + Math.random() * 120) };
  });

  const playerCount = points[points.length - 1]?.v ?? 0;
  return {
    playerCount,
    uptimeHours: Math.floor(24 + Math.random() * 300),
    economy: { gdp: 1_250_000 + Math.floor(Math.random() * 500_000), businesses: 32 + Math.floor(Math.random() * 18) },
    playersOverTime: points
  };
}


