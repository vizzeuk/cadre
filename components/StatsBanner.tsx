"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "+ Horas", label: "Recuperadas para ti" },
  { value: "80%", label: "Menos tareas manuales" },
  { value: "< 4s", label: "Respuesta de sistemas" },
  { value: "24h", label: "Respuesta diagnóstico" },
];

export default function StatsBanner() {
  return (
    <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            className="flex flex-col items-center justify-center gap-1 bg-black px-4 py-8 text-center"
          >
            <span className="font-display text-3xl font-bold text-white sm:text-4xl">
              {stat.value}
            </span>
            <span className="text-xs tracking-wide text-zinc-400">{stat.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
