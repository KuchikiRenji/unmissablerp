"use client";
import useSWR from "swr";
import AnimatedCounter from "./AnimatedCounter";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import type { StatsResponse } from "../lib/types";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function DashboardStats() {
  const { data } = useSWR<StatsResponse>("/api/stats", fetcher, { refreshInterval: 10000 });

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="glass rounded-card p-5 border border-white/10">
        <div className="text-white/60 text-sm">Live Players</div>
        <div className="text-3xl font-heading mt-1 text-brand-orange">
          <AnimatedCounter value={data?.playerCount ?? 0} />
        </div>
        <div className="text-white/60 text-xs mt-1">Updates every 10s</div>
      </div>
      <div className="glass rounded-card p-5 border border-white/10">
        <div className="text-white/60 text-sm">Server Uptime</div>
        <div className="text-3xl font-heading mt-1"><AnimatedCounter value={data?.uptimeHours ?? 0} />h</div>
      </div>
      <div className="glass rounded-card p-5 border border-white/10">
        <div className="text-white/60 text-sm">Economy Snapshot</div>
        <div className="text-3xl font-heading mt-1">${(data?.economy?.gdp ?? 0).toLocaleString()}</div>
        <div className="text-white/60 text-xs mt-1">Active businesses: {data?.economy?.businesses ?? 0}</div>
      </div>
      <div className="lg:col-span-3 glass rounded-card p-5 border border-white/10">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-semibold">Players Over Time</h3>
          <span className="text-xs text-white/60">Mock data</span>
        </div>
        <div className="h-72 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data?.playersOverTime ?? []} margin={{ left: -20, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="t" stroke="rgba(255,255,255,0.6)" tick={{ fill: "rgba(255,255,255,0.6)" }} />
              <YAxis stroke="rgba(255,255,255,0.6)" tick={{ fill: "rgba(255,255,255,0.6)" }} />
              <Tooltip contentStyle={{ background: "#111", border: "1px solid #333" }} />
              <Line type="monotone" dataKey="v" stroke="#FF6A00" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}


