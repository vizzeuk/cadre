"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Solicitud de Diagnóstico",
    interval: null,
    description: "Recepción de requerimientos iniciales.",
    micro: "El primer paso hacia la eficiencia.",
  },
  {
    number: "02",
    title: "Validación y Agendamiento",
    interval: "< 1 Día",
    description: "Respuesta técnica y coordinación de sesión inicial.",
    micro: "Filtramos y evaluamos viabilidad técnica.",
  },
  {
    number: "03",
    title: "Sesión de Descubrimiento",
    interval: null,
    description: "Definición de objetivos y alcance estratégico.",
    micro: "Entendemos la raíz de sus desafíos operativos.",
  },
  {
    number: "04",
    title: "Entrega de Propuesta",
    interval: "3–5 Días",
    description: "Presentación de solución técnica y plan de trabajo.",
    micro: "Arquitectura, stack (Vercel / Supabase / n8n) y ROI claro.",
  },
  {
    number: "05",
    title: "Activación del Servicio",
    interval: "1 Día",
    description: "Formalización e inicio de implementación.",
    micro: "Kickoff del proyecto y primeros pasos.",
  },
];

/* Vertical arm height for desktop alternating layout */
const ARM_H = 96; // px — matches h-24

export default function Methodology() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-28 sm:px-6 lg:px-8">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-20"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Metodología CADRE
        </p>
        <h2 className="font-display max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          El camino hacia su
          <br />
          <span className="text-zinc-400">transformación digital.</span>
        </h2>
      </motion.div>

      {/* ── MOBILE: vertical timeline (left rail) ── */}
      <div className="relative lg:hidden">
        {/* Vertical rail */}
        <div className="absolute left-[18px] top-0 h-full w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />

        <div className="flex flex-col gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
              className="relative flex items-start gap-5 pl-10"
            >
              {/* Node */}
              <div
                className={`absolute left-0 top-0 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold tracking-wider
                  ${i % 2 === 0
                    ? "border-white/30 bg-white text-black"
                    : "border-white/20 bg-black text-zinc-400"
                  }`}
              >
                {step.number}
              </div>

              {/* Card */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="font-display text-sm font-semibold text-white">
                    {step.title}
                  </h3>
                  {step.interval && (
                    <span className="rounded-full border border-white/10 bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                      {step.interval}
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {step.description}
                </p>
                <p className="mt-2 text-xs italic text-zinc-600">{step.micro}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── DESKTOP: horizontal timeline with alternating arms ── */}
      <div className="relative hidden lg:block">
        {/*
          Layout structure (per step, 5 columns equal width):
          - top area   (h-24): cards for even-index steps (0, 2, 4) + spacing for odd
          - axis row   (h-px):  the horizontal rail
          - bottom area(h-24): cards for odd-index steps (1, 3)     + spacing for even
        */}

        {/* Grid wrapper */}
        <div
          className="grid items-center"
          style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
        >
          {/* ── TOP HALF: even steps ── */}
          {steps.map((step, i) => (
            <div key={`top-${step.number}`} className="flex flex-col items-center">
              {i % 2 === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: -16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
                  className="flex flex-col items-center"
                >
                  <NodeCard step={step} solid />
                  {/* Arm down to axis */}
                  <div className="w-px bg-white/20" style={{ height: ARM_H }} />
                </motion.div>
              ) : (
                /* Spacer so odd columns keep height */
                <div style={{ height: ARM_H + 160 }} />
              )}
            </div>
          ))}
        </div>

        {/* ── HORIZONTAL AXIS ── */}
        <div className="relative -mt-px flex items-center">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          {/* Nodes on axis */}
          <div
            className="absolute inset-0 grid"
            style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
          >
            {steps.map((step, i) => (
              <div key={`axis-${step.number}`} className="flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-[10px] font-bold tracking-wider
                    ${i % 2 === 0
                      ? "border-white/30 bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                      : "border-white/20 bg-black text-zinc-500 ring-1 ring-white/10"
                    }`}
                >
                  {step.number}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM HALF: odd steps ── */}
        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
        >
          {steps.map((step, i) => (
            <div key={`bot-${step.number}`} className="flex flex-col items-center">
              {i % 2 !== 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
                  className="flex flex-col items-center"
                >
                  {/* Arm up from axis */}
                  <div className="w-px bg-white/20" style={{ height: ARM_H }} />
                  <NodeCard step={step} solid={false} />
                </motion.div>
              ) : (
                <div style={{ height: ARM_H + 160 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Reusable card ─── */
function NodeCard({
  step,
  solid,
}: {
  step: (typeof steps)[number];
  solid: boolean;
}) {
  return (
    <div
      className={`w-44 rounded-2xl border p-4 backdrop-blur-md xl:w-52
        ${solid
          ? "border-white/15 bg-white/[0.05]"
          : "border-white/10 bg-white/[0.03]"
        }`}
    >
      {step.interval && (
        <span className="mb-2 inline-block rounded-full border border-white/10 bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
          {step.interval}
        </span>
      )}
      <h3 className="font-display text-sm font-semibold leading-snug text-white">
        {step.title}
      </h3>
      <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
        {step.description}
      </p>
      <p className="mt-2 text-[11px] italic text-zinc-600">{step.micro}</p>
    </div>
  );
}
