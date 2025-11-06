const socials = [
  { name: "Discord", href: "https://discord.gg/9GEpKfgx", desc: "Join the server hub" },
  { name: "Reddit", href: "https://reddit.com", desc: "Community threads" },
  { name: "Telegram", href: "https://t.me", desc: "Fast updates" },
  { name: "X (Twitter)", href: "https://twitter.com", desc: "Announcements" },
  { name: "YouTube", href: "https://youtube.com", desc: "Clips & trailers" }
];

export default function SocialHub() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {socials.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="glass rounded-card border border-white/10 p-5 hover:scale-[1.01] transition"
        >
          <div className="font-heading font-semibold">{s.name}</div>
          <div className="text-white/70 text-sm mt-1">{s.desc}</div>
        </a>
      ))}
    </div>
  );
}


