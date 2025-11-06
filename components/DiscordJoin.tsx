import Link from "next/link";

function isExternalUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");
}

export default function DiscordJoin({ className = "" }: { className?: string }) {
  const discordUrl = (process.env.NEXT_PUBLIC_DISCORD_INVITE || "https://discord.gg/9GEpKfgx") as string;
  const isExternal = isExternalUrl(discordUrl);
  const linkClasses = "inline-block mt-4 px-5 py-2 rounded-pill bg-brand-orange text-black font-semibold hover:scale-105 hover:shadow-glow transition";

  return (
    <div className={`glass rounded-card p-6 border border-white/10 ${className}`}>
      <h3 className="font-heading text-xl font-semibold">Join our Discord</h3>
      <p className="text-white/70 mt-2 text-sm">
        Tap into live dispatch, whitelisting, and events. Your story starts here.
      </p>
      {isExternal ? (
        <a
          href={discordUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClasses}
        >
          Join Discord
        </a>
      ) : (
        <Link href={discordUrl as any} className={linkClasses}>
          Join Discord
        </Link>
      )}
    </div>
  );
}


