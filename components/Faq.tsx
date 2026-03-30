"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "¿Cuánto tarda una implementación típica?",
    answer:
      "Depende del alcance, pero nuestros diagnósticos y primeras automatizaciones en n8n toman semanas, no meses.",
  },
  {
    question: "¿Necesito un equipo técnico?",
    answer:
      "Cero. En CADRE nos encargamos de la arquitectura, desarrollo e integración completa.",
  },
  {
    question: "¿Mis datos están seguros?",
    answer:
      "Sí, usamos infraestructura de clase mundial (Vercel, Supabase) con máxima encriptación.",
  },
  {
    question: "¿Ofrecen soporte post-desarrollo?",
    answer:
      "Sí, contamos con planes de mantenimiento y mejora continua.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-28 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Preguntas frecuentes
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Todo lo que necesitas saber
        </h2>
      </div>

      {/* Accordion */}
      <div className="flex flex-col gap-3">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md"
            >
              {/* Question row */}
              <button
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-white/[0.03]"
                aria-expanded={isOpen}
              >
                <span className="font-display text-base font-semibold text-white sm:text-lg">
                  {faq.question}
                </span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-zinc-400 transition-colors duration-200 group-hover:border-white/20">
                  {isOpen ? (
                    <Minus className="h-3.5 w-3.5" />
                  ) : (
                    <Plus className="h-3.5 w-3.5" />
                  )}
                </span>
              </button>

              {/* Answer */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="border-t border-white/[0.07] px-6 py-5">
                      <p className="text-sm leading-relaxed text-zinc-400">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
