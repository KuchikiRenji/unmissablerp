"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/apply", label: "Apply" },
  { href: "/store", label: "Store" },
  { href: "/community", label: "Community" },
  { href: "/dashboard", label: "Dashboard" }
];

function isExternalUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const discordUrl = (process.env.NEXT_PUBLIC_DISCORD_INVITE || "https://discord.gg/9GEpKfgx") as string;
  const isExternal = isExternalUrl(discordUrl);
  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-black/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <Link href={"/" as any} className="flex items-center gap-2">
            <Image src="/logo.png" alt="UNMISSABLERP" width={32} height={32} className="rounded-lg object-contain" priority />
            <span className="font-heading font-semibold tracking-wide">UNMISSABLERP</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href as any} className="text-sm text-white/80 hover:text-white transition">
                {item.label}
              </Link>
            ))}
            {isExternal ? (
              <a
                href={discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-pill bg-brand-orange text-black font-medium hover:scale-105 hover:shadow-glow transition-transform"
              >
                Join Discord
              </a>
            ) : (
              <Link
                href={discordUrl as any}
                className="px-4 py-2 rounded-pill bg-brand-orange text-black font-medium hover:scale-105 hover:shadow-glow transition-transform"
              >
                Join Discord
              </Link>
            )}
          </nav>
          <button
            aria-label="Toggle navigation"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-white/10 focus-ring"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Open Menu</span>
            <div className="w-6 h-0.5 bg-white mb-1.5" />
            <div className="w-6 h-0.5 bg-white mb-1.5" />
            <div className="w-6 h-0.5 bg-white" />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-white/10"
          >
            <div className="px-4 py-3 space-y-2 bg-black/70">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href as any} className="block py-2 text-white/90" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ))}
              {isExternal ? (
                <a
                  href={discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 text-black bg-brand-orange rounded-md text-center font-medium"
                  onClick={() => setOpen(false)}
                >
                  Join Discord
                </a>
              ) : (
                <Link
                  href={discordUrl as any}
                  className="block py-2 text-black bg-brand-orange rounded-md text-center font-medium"
                  onClick={() => setOpen(false)}
                >
                  Join Discord
                </Link>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}


