"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
}

export default function FeatureCard({ title, description, imageSrc }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass rounded-card overflow-hidden border border-white/10"
    >
      <div className="relative h-40">
        <Image src={imageSrc} alt={title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" style={{ top: 0, right: 0, bottom: 0, left: 0 }} />
      </div>
      <div className="p-5">
        <h3 className="font-heading text-lg font-semibold">{title}</h3>
        <p className="text-white/70 mt-2 text-sm">{description}</p>
      </div>
    </motion.div>
  );
}


