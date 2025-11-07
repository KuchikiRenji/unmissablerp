"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { STORE_TIERS, ADDON_24H, StoreTier } from "../config/storeTiers";
import PurchaseModal from "./PurchaseModal";
import Toast from "./Toast";
import DiscordConfigWarning from "./DiscordConfigWarning";

export default function StoreGrid() {
  const [selectedTier, setSelectedTier] = useState<StoreTier | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  
  // Mock user ID - in production, get from auth/session
  const [userId] = useState<string>("mock_user_" + Math.random().toString(36).substr(2, 9));

  const handleBuyClick = (tier: StoreTier) => {
    setSelectedTier(tier);
    setIsModalOpen(true);
  };

  const handlePurchaseConfirm = async (tierId: string) => {
    try {
      const response = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          tierId,
          paymentConfirmed: true // Mock payment
        })
      });

      const data = await response.json();

      if (data.ok) {
        setToast({
          message: `You've been granted ${selectedTier?.name}! 🎉`,
          type: "success"
        });
      } else {
        throw new Error(data.message || "Purchase failed");
      }
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : "Purchase failed. Please try again.",
        type: "error"
      });
      throw error;
    }
  };

  const allTiers = [...STORE_TIERS, ADDON_24H];

  return (
    <>
      <DiscordConfigWarning />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allTiers.map((tier, index) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="glass rounded-card overflow-hidden border border-white/10 relative group cursor-pointer"
            style={{
              background: `linear-gradient(135deg, ${tier.color}15 0%, transparent 100%)`
            }}
          >
            {/* Gradient overlay on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: tier.gradient + "20" }}
            />

            <div className="relative z-10">
              {/* Header with gradient */}
              <div
                className="h-32 relative flex items-center justify-center"
                style={{ background: tier.gradient }}
              >
                <div className="text-center">
                  <h3 className="font-heading font-bold text-xl text-white drop-shadow-lg">
                    {tier.name}
                  </h3>
                  <div className="mt-2 text-white/90 text-sm">
                    {tier.priorityPoints} Priority Points
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-white/70 text-sm mb-4 min-h-[3rem]">
                  {tier.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-xs">Duration:</span>
                    <span className="text-white font-semibold text-sm">
                      {tier.durationDays === 1 ? "24 hours" : `${tier.durationDays} days`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-xs">Priority Points:</span>
                    <span className="text-white font-semibold text-sm">{tier.priorityPoints}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-heading font-bold text-brand-orange">
                    ${tier.price.toFixed(2)}
                  </span>
                  {tier.id === "24hour" && (
                    <span className="text-xs text-white/60 bg-blue-500/20 px-2 py-1 rounded">
                      Add-on
                    </span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBuyClick(tier)}
                  className="w-full px-4 py-2 rounded-md bg-brand-orange text-black font-semibold hover:shadow-glow transition"
                  style={{
                    boxShadow: "0 0 0 0 rgba(255, 106, 0, 0.4)"
                  }}
                >
                  Buy Now
                </motion.button>
              </div>
            </div>

            {/* Glow effect on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-xl"
              style={{
                background: tier.gradient,
                transform: "scale(1.2)"
              }}
            />
          </motion.div>
        ))}
      </div>

      <PurchaseModal
        tier={selectedTier}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTier(null);
        }}
        onConfirm={handlePurchaseConfirm}
        userId={userId}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={!!toast}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
