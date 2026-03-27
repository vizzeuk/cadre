"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav
        className={`mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border px-4 py-2.5 backdrop-blur-xl sm:px-6 transition-all duration-500 ${
          scrolled
            ? "border-white/20 bg-black/70 shadow-[0_4px_40px_rgba(0,0,0,0.6)]"
            : "border-white/10 bg-white/[0.03]"
        }`}
      >
        {/* Logo */}
        <a href="#top" className="group flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg overflow-hidden">
            <Image
              src="/cadre-logo.png"
              alt="CADRE Solutions"
              width={36}
              height={36}
              className="h-9 w-9 object-contain invert opacity-90 transition-opacity duration-300 group-hover:opacity-100"
              priority
            />
          </div>
          <span className="font-display text-sm font-semibold tracking-[0.2em] text-white">
            CADRE SOLUTIONS
          </span>
        </a>

        {/* CTA */}
        <a
          href="#diagnostico"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-white/20 bg-white/[0.07] px-4 py-2 text-xs font-semibold tracking-[0.1em] text-white backdrop-blur transition-all duration-300 hover:border-white/35 hover:bg-white/[0.13]"
        >
          <span className="relative z-10">Solicitar Diagnóstico</span>
          <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      </nav>
    </motion.header>
  );
}
