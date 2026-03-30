"use client";

import {
  ArrowRight,
  FileSpreadsheet,
  Layers3,
  Workflow,
  CheckCircle2,
  Linkedin,
  Mail,
  Zap,
  Gauge,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import InfiniteMarquee from "@/components/InfiniteMarquee";
import ProblemCard from "@/components/ProblemCard";
import SectionReveal from "@/components/SectionReveal";
import Navbar from "@/components/Navbar";
import StatsBanner from "@/components/StatsBanner";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Methodology from "@/components/Methodology";

/* ─── Data ─── */
const marqueeItems = [
  "HubSpot",
  "Google Workspace",
  "Meta Ads",
  "Shopify",
  "WhatsApp Business",
  "Stripe",
  "Notion",
  "Microsoft 365",
];

const problemCards = [
  {
    title: "Procesos en Excel",
    description:
      "Tu equipo invierte horas en actualizar hojas, copiar datos y validar versiones que cambian cada día.",
    icon: <FileSpreadsheet className="h-5 w-5" />,
  },
  {
    title: "Cuellos de botella manuales",
    description:
      "Aprobaciones, seguimientos y reportes dependen de personas clave y frenan ventas, operaciones y servicio.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Silos de información",
    description:
      "La desconexión de los flujos de información interna compromete la precisión operativa y la calidad de las decisiones.",
    icon: <Layers3 className="h-5 w-5" />,
  },
];

const solutionItems = [
  {
    title: "Operación más rápida",
    description:
      "Reducimos tiempos de ejecución en tareas críticas para que tu equipo enfoque su energía en vender y crecer.",
    icon: <Gauge className="h-6 w-6" />,
    badge: "Velocidad",
  },
  {
    title: "Control y trazabilidad",
    description:
      "Unificamos el flujo de trabajo para que cada área trabaje con información clara, actualizada y accionable.",
    icon: <ShieldCheck className="h-6 w-6" />,
    badge: "Control",
  },
  {
    title: "Crecimiento rentable",
    description:
      "Diseñamos procesos que escalan contigo y generan impacto medible en productividad, conversión y rentabilidad.",
    icon: <TrendingUp className="h-6 w-6" />,
    badge: "ROI",
  },
];

const trustSignals = [
  "Sin contrato a largo plazo",
  "Resultado en 30 días o menos",
  "Equipo dedicado a tu proyecto",
];

/* ─── Hero word-by-word animation ─── */
const heroWords = "Escala tu empresa. Elimina el trabajo manual.".split(" ");

/* ─── Page ─── */
export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white antialiased overflow-x-hidden">

      {/* ── Background atmosphere ── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Primary glow top-left */}
        <div className="absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full bg-white/[0.025] blur-[120px]" />
        {/* Secondary glow top-right */}
        <div className="absolute -top-16 right-0 h-[400px] w-[400px] rounded-full bg-white/[0.018] blur-[100px]" />
        {/* Bottom center glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-white/[0.015] blur-[130px]" />
        {/* Dot grid */}
        <div className="dot-grid absolute inset-0 opacity-[0.25]" />
      </div>

      {/* ── Navbar ── */}
      <Navbar />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section
        id="top"
        className="relative z-10 mx-auto flex min-h-[95vh] w-full max-w-6xl flex-col items-start justify-center px-4 pt-32 pb-20 sm:px-6 lg:px-8"
      >
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-zinc-300 backdrop-blur"
        >
          <Zap className="h-3 w-3 text-zinc-300" />
          Transformación digital para Empresas
        </motion.span>

        {/* Animated headline */}
        <h1 className="font-display max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {heroWords.map((word, i) => (
            <motion.span
              key={i}
              className="mr-[0.25em] inline-block"
              initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: "easeOut" }}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-zinc-400"
        >
          En CADRE Solutions diseñamos sistemas digitales a medida para que tu equipo
          ahorre horas operativas, reduzca errores humanos y convierta más oportunidades
          en ventas reales.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05, ease: "easeOut" }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          {/* Primary CTA */}
          <a
            href="#diagnostico"
            className="pulse-ring relative inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white px-7 py-3.5 text-sm font-semibold tracking-wide text-black transition-all duration-300 hover:bg-zinc-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          >
            Solicitar Diagnóstico Digital
            <ArrowRight className="h-4 w-4" />
          </a>

          {/* Secondary */}
          <span className="flex items-center gap-1.5 text-sm text-zinc-500">
            <CheckCircle2 className="h-4 w-4 text-zinc-500" />
            Respuesta en menos de 1 día hábil
          </span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="h-5 w-px bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          STATS BANNER
      ════════════════════════════════════════ */}
      <SectionReveal className="relative z-10 pb-16">
        <StatsBanner />
      </SectionReveal>

      {/* ════════════════════════════════════════
          MARQUEE
      ════════════════════════════════════════ */}
      <div className="relative z-10 mb-24 space-y-0">
        <div className="mb-0">
          <InfiniteMarquee items={marqueeItems} />
        </div>
        <div>
          <InfiniteMarquee items={[...marqueeItems].reverse()} reverse />
        </div>
      </div>

      {/* ════════════════════════════════════════
          PROBLEM SECTION
      ════════════════════════════════════════ */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-28 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            El problema
          </p>
          <h2 className="font-display max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Tu operación no necesita más esfuerzo.
            <br />
            <span className="text-zinc-400">Necesita un mejor sistema.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-zinc-400">
            Si hoy dependes de procesos manuales, tu crecimiento siempre chocará con
            los mismos límites. Este es el patrón que vemos en la mayoría de Empresas antes
            de transformar su operación.
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {problemCards.map((card, i) => (
            <SectionReveal key={card.title} delay={i * 0.1}>
              <ProblemCard {...card} index={i} />
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          METHODOLOGY
      ════════════════════════════════════════ */}
      <Methodology />

      {/* ════════════════════════════════════════
          STACK / SOLUTION SECTION
      ════════════════════════════════════════ */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-28 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl">
            {/* Header strip */}
            <div className="border-b border-white/10 px-8 py-8 sm:px-10">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Nuestra solución
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Cómo transformamos tu operación en resultados
              </h2>
              <p className="mt-4 max-w-2xl text-zinc-400">
                Convertimos procesos desordenados en un sistema claro, eficiente y orientado a crecimiento.
                Menos tareas manuales, más control y mejores decisiones para tu negocio.
              </p>
            </div>

            {/* Stack cards */}
            <div className="grid gap-px bg-white/[0.06] md:grid-cols-3">
              {solutionItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                  className="group relative flex flex-col gap-4 bg-black p-7 transition-colors duration-300"
                >
                  {/* Accent top border */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Badge */}
                  <span className="w-fit rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500">
                    {item.badge}
                  </span>

                  {/* Icon */}
                  <div className="inline-flex w-fit rounded-xl border border-white/10 bg-white/[0.05] p-3 text-zinc-300 transition-colors duration-300 group-hover:text-white">
                    {item.icon}
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ════════════════════════════════════════
          FAQ
      ════════════════════════════════════════ */}
      <SectionReveal className="relative z-10">
        <Faq />
      </SectionReveal>

      {/* ════════════════════════════════════════
          CTA FINAL
      ════════════════════════════════════════ */}
      <section
        id="diagnostico"
        className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-28 sm:px-6 lg:px-8"
      >
        <SectionReveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl">
            {/* Decorative lines */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-white/[0.03] blur-[100px]" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <div className="relative grid gap-0 lg:grid-cols-2">
              {/* ── LEFT: copy ── */}
              <div className="flex flex-col justify-center border-b border-white/10 px-8 py-12 lg:border-b-0 lg:border-r lg:px-10 lg:py-14">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                  Diagnóstico digital · CADRE Solutions
                </p>
                <h2 className="font-display mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                  Descubre dónde estás perdiendo
                  <br />
                  <span className="shimmer-text">tiempo, dinero y clientes.</span>
                </h2>
                <p className="mt-5 text-zinc-400 leading-relaxed">
                  En una sesión estratégica revisamos tus procesos actuales y definimos
                  un plan de acción con impacto directo en tu negocio.
                </p>
                {/* Trust signals */}
                <ul className="mt-8 space-y-2.5">
                  {trustSignals.map((s) => (
                    <li key={s} className="flex items-center gap-2.5 text-sm text-zinc-400">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-zinc-500" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── RIGHT: form ── */}
              <div className="px-8 py-12 lg:px-10 lg:py-14">
                <p className="mb-6 font-display text-lg font-semibold text-white">
                  Completa tus datos y te contactamos
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <Footer />
    </main>
  );
}
