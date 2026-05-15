"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Plus } from "@phosphor-icons/react";

type Item = { q: string; a: string };

function FAQItem({ q, a, defaultOpen = false }: Item & { defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const id = React.useId();
  return (
    <li className="border-b border-[var(--color-ink-200)] last:border-b-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`faq-${id}`}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-lg font-semibold tracking-tight text-[var(--color-ink-900)] md:text-xl">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-chip)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
          aria-hidden
        >
          <Plus size={16} weight="bold" />
        </motion.span>
      </button>
      <div
        id={`faq-${id}`}
        role="region"
        className="accordion-grid"
        data-open={open || undefined}
      >
        <div>
          <p className="pb-6 pr-12 text-[15px] leading-relaxed text-[var(--color-ink-500)]">{a}</p>
        </div>
      </div>
    </li>
  );
}

export function FAQ() {
  const t = useTranslations("home.faq");
  const items = t.raw("items") as Item[];

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container-page grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-[var(--color-ink-500)]">{t("subtitle")}</p>
        </div>
        <ul className="md:col-span-7">
          {items.map((it, i) => (
            <FAQItem key={it.q} q={it.q} a={it.a} defaultOpen={i === 0} />
          ))}
        </ul>
      </div>
    </section>
  );
}
