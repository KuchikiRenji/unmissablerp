"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function DiscordConfigWarning() {
  const { data } = useSWR<{ configured: boolean }>("/api/discord/checkConfig", fetcher);

  if (data?.configured) {
    return null;
  }

  return (
    <div className="mb-6 glass rounded-card p-4 border border-yellow-500/50 bg-yellow-500/10">
      <p className="text-yellow-400 text-sm">
        ⚠️ Discord integration not configured. Please set DISCORD_BOT_TOKEN and DISCORD_GUILD_ID in your environment variables.
      </p>
    </div>
  );
}

