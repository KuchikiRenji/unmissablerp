"use client";
import { useEffect, useState } from "react";
import { useMotionValue, useTransform, animate } from "framer-motion";

export default function AnimatedCounter({ value, duration = 0.8 }: { value: number; duration?: number }) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest).toLocaleString());
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      setDisplay(String(v));
    });
    return unsubscribe;
  }, [rounded]);

  useEffect(() => {
    const controls = animate(motionValue, value, { duration, ease: "easeOut" });
    return () => {
      if (controls && typeof controls.stop === "function") controls.stop();
    };
  }, [value, duration, motionValue]);

  return <span>{display}</span>;
}


