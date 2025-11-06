"use client";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import DiscordJoin from "../components/DiscordJoin";
import { copy } from "../lib/types";
import useSWR from "swr";
import AnimatedCounter from "../components/AnimatedCounter";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function HomePage() {
  // Live preview of player count
  const { data } = useSWR("/api/stats", fetcher, { refreshInterval: 10000 });

  return (
    <div>
      <Hero />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-6">
          {copy.features.map((f) => (
            <FeatureCard key={f.title} title={f.title} description={f.desc} imageSrc={f.image} />
          ))}
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6 items-stretch">
          <div className="glass rounded-card p-6 border border-white/10">
            <div className="text-white/60 text-sm">Live Players</div>
            <div className="text-4xl font-heading text-brand-orange mt-1">
              <AnimatedCounter value={data?.playerCount ?? 0} />
            </div>
            <p className="text-xs text-white/60 mt-1">Mock stats, updates every 10s</p>
          </div>
          <div className="glass rounded-card p-6 border border-white/10">
            <h3 className="font-heading font-semibold">Server Rules</h3>
            <ul className="list-disc list-inside text-white/70 mt-2 text-sm">
              {copy.rules.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <DiscordJoin />
        </div>
      </section>
    </div>
  );
}


