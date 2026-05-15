"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, Quotes } from "@phosphor-icons/react";

type Item = { quote: string; author: string; role: string; kind?: string };

function Initials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return (
    <span
      aria-hidden
      className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-soft)] font-display text-base font-bold text-[var(--color-accent-ink)] ring-1 ring-[var(--color-ink-200)]"
    >
      {initials}
    </span>
  );
}

export function Testimonials() {
  const reduce = useReducedMotion();
  const t = useTranslations("home.testimonials");
  const items = t.raw("items") as Item[];
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % items.length), 7000);
    return () => clearInterval(id);
  }, [items.length, reduce]);

  const go = (next: number) => setIdx((next + items.length) % items.length);
  const current = items[idx];

  return (
    <section className="py-20 md:py-24">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
              {t("title")}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={t("prev")}
              onClick={() => go(idx - 1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-ink-200)] bg-white transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <ArrowLeft size={18} weight="bold" aria-hidden />
            </button>
            <button
              type="button"
              aria-label={t("next")}
              onClick={() => go(idx + 1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-ink-200)] bg-white transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <ArrowRight size={18} weight="bold" aria-hidden />
            </button>
          </div>
        </div>

        <div className="mt-10 rounded-[var(--radius-card)] border border-[var(--color-ink-200)] bg-white p-8 shadow-[var(--shadow-ring)] md:p-12">
          <Quotes size={36} weight="fill" aria-hidden className="text-[var(--color-accent-soft)]" />
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current.quote}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-3xl font-display text-2xl font-medium leading-snug tracking-tight text-[var(--color-ink-900)] md:text-3xl"
            >
              &ldquo;{current.quote}&rdquo;
            </motion.blockquote>
          </AnimatePresence>
          <footer className="mt-8 flex items-center gap-4">
            <Initials name={current.author} />
            <div>
              <p className="font-semibold text-[var(--color-ink-900)]">{current.author}</p>
              <p className="text-sm text-[var(--color-ink-500)]">{current.role}</p>
            </div>
          </footer>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${t("goTo")} ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === idx ? "w-8 bg-[var(--color-accent)]" : "w-4 bg-[var(--color-ink-200)]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
