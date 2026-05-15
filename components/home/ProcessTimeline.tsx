"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChatCircle, PencilRuler, Code, Rocket } from "@phosphor-icons/react";

type Step = { title: string; body: string };

const ICONS = [ChatCircle, PencilRuler, Code, Rocket];

export function ProcessTimeline() {
  const reduce = useReducedMotion();
  const t = useTranslations("home.process");
  const steps = t.raw("steps") as Step[];

  return (
    <section className="py-20 md:py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-[var(--color-ink-500)]">{t("subtitle")}</p>
        </div>

        <div className="relative mt-16">
          {/* connector line (desktop) */}
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-[var(--color-ink-200)] md:block" aria-hidden />
          <motion.div
            className="absolute left-0 top-6 hidden h-px origin-left bg-[var(--color-accent)] md:block"
            style={{ width: "100%" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: reduce ? 1 : 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden
          />

          <ol className="relative grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
            {steps.map((s, i) => {
              const Icon = ICONS[i] ?? ChatCircle;
              return (
                <motion.li
                  key={s.title}
                  className="relative"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                    delay: i * 0.12,
                  }}
                >
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-[var(--radius-chip)] bg-white text-[var(--color-accent)] ring-1 ring-[var(--color-ink-200)] shadow-[var(--shadow-soft)]">
                    <Icon size={22} weight="bold" aria-hidden />
                  </span>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-400)]">
                    Paso {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-bold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink-500)]">{s.body}</p>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
