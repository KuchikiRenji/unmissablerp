"use client";
import { motion, AnimatePresence } from "framer-motion";
import { StoreTier } from "../config/storeTiers";
import { useState, useEffect } from "react";

interface PurchaseModalProps {
  tier: StoreTier | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (tierId: string) => Promise<void>;
  userId: string;
}

export default function PurchaseModal({
  tier,
  isOpen,
  onClose,
  onConfirm,
  userId
}: PurchaseModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleConfirm = async () => {
    if (!tier) return;
    setIsProcessing(true);
    try {
      await onConfirm(tier.id);
      setShowConfetti(true);
      setTimeout(() => {
        onClose();
        setIsProcessing(false);
        setShowConfetti(false);
      }, 2000);
    } catch (error) {
      setIsProcessing(false);
      setShowConfetti(false);
      console.error("Purchase failed:", error);
      // Error is already handled by parent component's toast
    }
  };

  if (!tier) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-card border border-white/20 p-6 max-w-md w-full relative overflow-hidden"
              style={{ background: tier.gradient + "20" }}
            >
              {/* Confetti overlay */}
              {showConfetti && <ConfettiEffect />}

              <div className="relative z-10">
                <h2 className="font-heading text-2xl font-bold mb-2">{tier.name}</h2>
                <p className="text-white/80 text-sm mb-4">{tier.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Price:</span>
                    <span className="text-brand-orange font-semibold text-xl">
                      ${tier.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Priority Points:</span>
                    <span className="text-white font-semibold">{tier.priorityPoints}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Duration:</span>
                    <span className="text-white font-semibold">
                      {tier.durationDays === 1 ? "24 hours" : `${tier.durationDays} days`}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    disabled={isProcessing}
                    className="flex-1 px-4 py-2 rounded-md bg-white/10 text-white hover:bg-white/20 transition disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={isProcessing}
                    className="flex-1 px-4 py-2 rounded-md bg-brand-orange text-black font-semibold hover:scale-105 hover:shadow-glow transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? "Processing..." : "Confirm Purchase"}
                  </button>
                </div>

                {showConfetti && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-center"
                  >
                    <p className="text-brand-orange font-semibold text-lg">
                      🎉 Purchase Successful!
                    </p>
                    <p className="text-white/70 text-sm mt-1">
                      You've been granted {tier.name}!
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Simple confetti effect component
function ConfettiEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: ["#FF6A00", "#FFD700", "#4F98C0", "#FFB347", "#1F4BBE"][
              Math.floor(Math.random() * 5)
            ]
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: typeof window !== "undefined" ? window.innerHeight + 20 : 1000,
            opacity: [1, 1, 0],
            rotate: 360,
            x: (Math.random() - 0.5) * 100
          }}
          transition={{
            duration: 2 + Math.random(),
            delay: Math.random() * 0.5,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}

