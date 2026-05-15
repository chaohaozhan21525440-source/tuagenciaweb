"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle, Lightning, ChartLineUp, MagnifyingGlass, Star } from "@phosphor-icons/react";
import { LaptopMockup } from "@/components/hero/LaptopMockup";
import { PhoneMockup } from "@/components/hero/PhoneMockup";
import { FloatingMetric } from "@/components/hero/FloatingMetric";

const ease = [0.16, 1, 0.3, 1] as const;

const fade = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease, delay: i * 0.08 },
});

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 md:pt-20">
      {/* Ambient glow + grid */}
      <div aria-hidden className="bg-hero-glow absolute inset-0" />
      <div
        aria-hidden
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent_75%)]"
      >
        <div className="bg-grid-soft absolute inset-0" />
      </div>

      <div className="container-page relative grid grid-cols-1 items-center gap-16 pb-24 lg:grid-cols-12 lg:gap-12 lg:pb-32">
        {/* LEFT */}
        <div className="lg:col-span-6">
          <motion.div {...fade(0)} className="inline-flex items-center gap-2 rounded-full border border-[var(--color-ink-100)] bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-700)] shadow-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-success)] opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-[var(--color-success)]" />
            </span>
            Disponibles 2 slots · Mayo 2026
          </motion.div>

          <motion.h1 {...fade(1)} className="mt-7 font-display text-[clamp(2.75rem,6vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.03em] text-[var(--color-ink-900)]">
            Webs que convierten visitas en <span className="text-[var(--color-brand)]">clientes</span>.
          </motion.h1>

          <motion.p {...fade(2)} className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-ink-500)]">
            Pack único, sin cuotas mensuales abusivas. Diseñamos, desarrollamos y posicionamos tu web. Diseño, desarrollo, SEO y dominio incluidos.
          </motion.p>

          <motion.div {...fade(3)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#precios"
              className="ring-brand group inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] bg-[var(--color-brand)] px-6 py-3.5 text-base font-semibold text-white shadow-[0_18px_40px_-12px_rgba(37,99,235,0.55)] transition-all hover:bg-[var(--color-brand-hover)] active:scale-[0.98]"
            >
              Ver packs y precios
              <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#proyectos"
              className="ring-brand inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] border border-[var(--color-ink-200)] bg-white px-6 py-3.5 text-base font-semibold text-[var(--color-ink-900)] transition-all hover:border-[var(--color-ink-300)] active:scale-[0.98]"
            >
              <Play size={16} weight="fill" />
              Ver proyectos
            </a>
          </motion.div>

          {/* Trust row */}
          <motion.div {...fade(4)} className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5 text-amber-400">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={15} weight="fill" />
                ))}
              </div>
              <span className="font-semibold text-[var(--color-ink-900)]">5.0</span>
              <span className="text-[var(--color-ink-400)]">en Google</span>
            </div>
            <span className="hidden h-4 w-px bg-[var(--color-ink-100)] md:block" />
            <span className="text-[var(--color-ink-500)]">+30 proyectos entregados</span>
            <span className="hidden h-4 w-px bg-[var(--color-ink-100)] md:block" />
            <span className="text-[var(--color-ink-500)]">Entrega en 2–3 semanas</span>
          </motion.div>
        </div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.25 }}
          className="relative lg:col-span-6"
        >
          {/* Laptop */}
          <LaptopMockup src="/portfolio/dentistlab.png" alt="Dentistlab" />

          {/* Phone overlap (md+) */}
          <div className="pointer-events-none absolute -right-2 bottom-2 hidden md:block lg:-right-4 lg:bottom-4">
            <PhoneMockup src="/portfolio/chinaway.png" alt="Chinaway" />
          </div>

          {/* Floating metrics */}
          <div className="pointer-events-none absolute -left-2 top-6 hidden md:block lg:-left-8 lg:top-4">
            <FloatingMetric
              icon={<ChartLineUp size={20} weight="bold" />}
              value="+42 leads"
              label="este mes"
              iconBg="brand"
              delay={0}
            />
          </div>

          <div className="pointer-events-none absolute -top-2 right-8 hidden lg:block">
            <FloatingMetric
              icon={<Lightning size={20} weight="fill" />}
              value="95+"
              label="PageSpeed"
              iconBg="brand"
              delay={0.5}
            />
          </div>

          <div className="pointer-events-none absolute left-12 -bottom-6 hidden md:block">
            <FloatingMetric
              icon={<CheckCircle size={20} weight="fill" />}
              value="+300%"
              label="conversiones"
              iconBg="success"
              delay={1}
            />
          </div>

          <div className="pointer-events-none absolute right-2 bottom-24 hidden xl:block">
            <FloatingMetric
              icon={<MagnifyingGlass size={20} weight="bold" />}
              value="SEO ready"
              label="optimizado"
              iconBg="brand"
              delay={1.5}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
