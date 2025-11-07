"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = "success",
  isVisible,
  onClose,
  duration = 3000
}: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const colors = {
    success: "bg-green-500/90 text-white",
    error: "bg-red-500/90 text-white",
    info: "bg-blue-500/90 text-white"
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-4 right-4 z-50 max-w-md"
        >
          <div
            className={`${colors[type]} px-6 py-4 rounded-card shadow-soft backdrop-blur-sm border border-white/20`}
          >
            <p className="font-semibold">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

