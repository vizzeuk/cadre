"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur transition-all duration-200 outline-none focus:border-white/30 focus:bg-white/[0.08] focus:ring-1 focus:ring-white/20";

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (formState === "error") {
      setFormState("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.company.trim() || !form.email.trim()) {
      setFormState("error");
      setErrorMessage("Completa nombre, empresa y correo electrónico para continuar.");
      return;
    }

    setFormState("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "No se pudo enviar la solicitud.");
      }

      setFormState("success");
    } catch (error) {
      setFormState("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Ocurrió un error inesperado al enviar la solicitud."
      );
    }
  };

  return (
    <AnimatePresence mode="wait">
      {formState === "success" ? (
        /* ── Success state ── */
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center gap-5 py-10 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
            className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/[0.07]"
          >
            <CheckCircle2 className="h-8 w-8 text-white" />
          </motion.div>
          <div>
            <h3 className="font-display text-2xl font-bold text-white">
              ¡Solicitud recibida!
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
              Nos pondremos en contacto en menos de 1 día hábil.
            </p>
          </div>
          <button
            onClick={() => {
              setFormState("idle");
              setForm({ name: "", company: "", email: "", phone: "", message: "" });
            }}
            className="text-xs text-zinc-500 underline underline-offset-4 transition-colors hover:text-zinc-300"
          >
            Enviar otra solicitud
          </button>
        </motion.div>
      ) : (
        /* ── Form ── */
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4"
        >
          {/* Row 1: Name + Company */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium tracking-wide text-zinc-400">
                Nombre *
              </label>
              <input
                required
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Juan García"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium tracking-wide text-zinc-400">
                Empresa *
              </label>
              <input
                required
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Mi Empresa S.A."
                className={inputClass}
              />
            </div>
          </div>

          {/* Row 2: Email + Phone */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium tracking-wide text-zinc-400">
                Correo electrónico *
              </label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="juan@empresa.com"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium tracking-wide text-zinc-400">
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+56 9 11 1234-5678"
                className={inputClass}
              />
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium tracking-wide text-zinc-400">
              ¿Cuál es tu mayor desafío operativo? (opcional)
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={3}
              placeholder="Ej: Nuestro equipo pierde 3 horas diarias en reportes manuales..."
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={formState === "loading"}
            className="pulse-ring group relative mt-2 inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl border border-white/20 bg-white px-6 py-3.5 text-sm font-semibold tracking-wide text-black transition-all duration-300 hover:bg-zinc-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {formState === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                Solicitar Diagnóstico Digital
                <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </>
            )}
          </button>

          <p className="text-center text-[11px] text-zinc-600">
            * Campos obligatorios · Respuesta en menos de 24 horas hábiles
          </p>

          {formState === "error" && (
            <p className="rounded-lg border border-white/15 bg-white/[0.03] px-3 py-2 text-center text-xs text-zinc-300">
              {errorMessage}
            </p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
