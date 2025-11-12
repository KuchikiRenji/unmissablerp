"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

function isExternalUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");
}

export default function Hero() {
  const discordUrl = (process.env.NEXT_PUBLIC_DISCORD_INVITE || "https://discord.gg/9GEpKfgx") as string;
  const isExternal = isExternalUrl(discordUrl);
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <Image
        src="/IMAGEA.jpg"
        alt="UNMISSABLERP hero"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 100vw"
        className="object-cover"
        style={{ top: 0, right: 0, bottom: 0, left: 0 }}
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          UNMISSABLERP — Next-level GTA RP
        </h1>
        <p className="mt-4 text-white/80 max-w-2xl mx-auto">
          Gritty stories. High-stakes moments. A living city that remembers.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/apply"
            className="px-6 py-3 rounded-pill bg-brand-orange text-black font-semibold hover:scale-105 hover:shadow-glow transition"
          >
            Apply (Whitelist)
          </Link>
          {isExternal ? (
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-pill bg-accent-blue2/80 hover:bg-accent-blue2 text-white font-medium transition"
            >
              Join Discord
            </a>
          ) : (
            <Link
              href={discordUrl as any}
              className="px-6 py-3 rounded-pill bg-accent-blue2/80 hover:bg-accent-blue2 text-white font-medium transition"
            >
              Join Discord
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  );
}


