"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSWR from "swr";
import AssetCard from "./AssetCard";
import type { AssetItem } from "../lib/types";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

type AssetType = "script" | "mlo" | "vehicle";

const tabs: { id: AssetType; label: string; icon: string }[] = [
  { id: "script", label: "Scripts", icon: "📜" },
  { id: "mlo", label: "MLOs", icon: "🏢" },
  { id: "vehicle", label: "Vehicles", icon: "🚗" }
];

export default function ServerAssets() {
  const [activeTab, setActiveTab] = useState<AssetType>("script");
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState<"all" | "custom" | "premade">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | AssetItem["status"]>("all");

  const { data: assets = [], isLoading } = useSWR<AssetItem[]>(
    `/api/assets/${activeTab}`,
    fetcher
  );

  const handleSourceToggle = (id: string, source: "custom" | "premade") => {
    // In future, this will sync to backend
    // For now, localStorage is handled in AssetCard
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = sourceFilter === "all" || asset.source === sourceFilter;
    const matchesStatus = statusFilter === "all" || asset.status === statusFilter;
    return matchesSearch && matchesSource && matchesStatus;
  });

  return (
    <div className="glass rounded-card p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold">Server Assets</h2>
        <button
          disabled
          className="px-4 py-2 rounded-md bg-white/10 text-white/60 text-sm cursor-not-allowed"
          title="OneDrive sync coming soon"
        >
          Sync with OneDrive
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium transition relative ${
              activeTab === tab.id
                ? "text-brand-orange"
                : "text-white/60 hover:text-white/80"
            }`}
            aria-label={`View ${tab.label}`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange"
              />
            )}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm text-white/80 mb-2">Search</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search assets..."
            className="w-full rounded-md bg-white/5 border border-white/15 px-4 py-2 focus-ring"
            aria-label="Search assets"
          />
        </div>
        <div>
          <label className="block text-sm text-white/80 mb-2">Source</label>
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value as typeof sourceFilter)}
            className="w-full rounded-md bg-white/5 border border-white/15 px-4 py-2 focus-ring"
            aria-label="Filter by source"
          >
            <option value="all">All Sources</option>
            <option value="custom">Custom</option>
            <option value="premade">Premade</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-white/80 mb-2">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="w-full rounded-md bg-white/5 border border-white/15 px-4 py-2 focus-ring"
            aria-label="Filter by status"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="testing">Testing</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Asset Grid */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12 text-white/60"
          >
            Loading assets...
          </motion.div>
        ) : filteredAssets.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12 text-white/60"
          >
            No assets found. {searchQuery && "Try adjusting your filters."}
          </motion.div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredAssets.map((asset, index) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                index={index}
                onSourceToggle={handleSourceToggle}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-sm text-white/60">
        <span>
          Showing {filteredAssets.length} of {assets.length} {activeTab}s
        </span>
        <span className="text-xs">
          {assets.filter((a) => a.source === "custom").length} custom,{" "}
          {assets.filter((a) => a.source === "premade").length} premade
        </span>
      </div>
    </div>
  );
}

