const socials = [
  { name: "Discord", href: "https://discord.gg/9GEpKfgx" },
  { name: "Reddit", href: "https://reddit.com" },
  { name: "Telegram", href: "https://t.me" },
  { name: "X", href: "https://twitter.com" },
  { name: "YouTube", href: "https://youtube.com" }
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-6 md:grid-cols-2 items-center">
        <div>
          <div className="font-heading text-lg">UNMISSABLERP</div>
          <p className="text-white/60 mt-2">Next-level GTA RP. Built for story, grit, and unforgettable moments.</p>
        </div>
        <div className="flex gap-4 md:justify-end flex-wrap">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition"
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>
      <div className="text-center text-xs text-white/50 pb-6">© {new Date().getFullYear()} UNMISSABLERP</div>
    </footer>
  );
}


