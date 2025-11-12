"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import type { AssetItem } from "../lib/types";

interface AssetCardProps {
  asset: AssetItem;
  index: number;
  onSourceToggle: (id: string, source: "custom" | "premade") => void;
}

const getTypeIcon = (type: AssetItem["type"]) => {
  switch (type) {
    case "script":
      return "📜";
    case "mlo":
      return "🏢";
    case "vehicle":
      return "🚗";
    default:
      return "📦";
  }
};

const getStatusColor = (status: AssetItem["status"]) => {
  switch (status) {
    case "active":
      return "bg-green-500/20 text-green-400 border-green-500/40";
    case "testing":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/40";
    case "pending":
      return "bg-blue-500/20 text-blue-400 border-blue-500/40";
    default:
      return "bg-white/10 text-white/60 border-white/20";
  }
};

export default function AssetCard({ asset, index, onSourceToggle }: AssetCardProps) {
  const [localSource, setLocalSource] = useState<"custom" | "premade">(asset.source);

  useEffect(() => {
    // Load from localStorage on mount
    const stored = localStorage.getItem(`asset-source-${asset.id}`);
    if (stored === "custom" || stored === "premade") {
      setLocalSource(stored);
    }
  }, [asset.id]);

  const handleSourceToggle = (newSource: "custom" | "premade") => {
    setLocalSource(newSource);
    localStorage.setItem(`asset-source-${asset.id}`, newSource);
    onSourceToggle(asset.id, newSource);
  };

  const isCustom = localSource === "custom";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`glass rounded-card overflow-hidden border ${
        isCustom ? "border-brand-orange/30 hover:border-brand-orange/50 hover:shadow-glow" : "border-white/10"
      } transition-all`}
    >
      <div className="relative h-32">
        <Image
          src={asset.previewImage || "/IMAGEA.jpg"}
          alt={asset.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          style={{ top: 0, right: 0, bottom: 0, left: 0 }}
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(asset.status)}`}>
            {asset.status}
          </span>
        </div>
        <div className="absolute top-2 left-2 text-2xl">{getTypeIcon(asset.type)}</div>
      </div>
      <div className="p-4">
        <h3 className="font-heading font-semibold text-lg">{asset.name}</h3>
        {asset.description && (
          <p className="text-white/60 text-sm mt-1 line-clamp-2">{asset.description}</p>
        )}
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => handleSourceToggle("custom")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
              isCustom
                ? "bg-brand-orange text-black hover:bg-brand-orange/90"
                : "bg-white/10 text-white/60 hover:bg-white/15"
            }`}
            aria-label={`Mark as ${isCustom ? "custom" : "premade"}`}
          >
            Custom
          </button>
          <button
            onClick={() => handleSourceToggle("premade")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
              !isCustom
                ? "bg-accent-blue1 text-white hover:bg-accent-blue1/90"
                : "bg-white/10 text-white/60 hover:bg-white/15"
            }`}
            aria-label={`Mark as ${!isCustom ? "premade" : "custom"}`}
          >
            Premade
          </button>
        </div>
      </div>
    </motion.div>
  );
}

