"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ProblemCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  index: number;
};

export default function ProblemCard({ title, description, icon, index }: ProblemCardProps) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
    >
      {/* Gradient top border accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-white/[0.03] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Inner spotlight */}
      <div className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-white/[0.04] blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Number label */}
      <p className="mb-4 font-display text-xs font-semibold tracking-[0.18em] text-zinc-600">
        {num}
      </p>

      {/* Icon */}
      <div className="mb-4 inline-flex rounded-xl border border-white/10 bg-white/[0.05] p-3 text-zinc-300 transition-colors duration-300 group-hover:border-white/20 group-hover:text-white">
        {icon}
      </div>

      {/* Content */}
      <h3 className="mb-2 font-display text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
    </motion.article>
  );
}
