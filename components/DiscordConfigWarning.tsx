"use client";
import useSWR from "swr";

const fetcher = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return { configured: false };
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to check Discord config:", error);
    return { configured: false };
  }
};

export default function DiscordConfigWarning() {
  const { data, error } = useSWR<{ configured: boolean }>("/api/discord/checkConfig", fetcher);

  // Don't show warning if we're still loading or if configured
  if (!data || data.configured || error) {
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

