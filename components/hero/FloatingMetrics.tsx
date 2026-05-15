"use client";

/*
 * FloatingMetrics
 * Three small metric cards that float around the hero mockups with an
 * idle y-bob and animated count-up on viewport entry. Uses CountUp
 * (ported from react-bits).
 */

import { motion, useReducedMotion } from "framer-motion";
import { Lightning, MagnifyingGlass, TrendUp } from "@phosphor-icons/react";
import { CountUp } from "@/components/animations/CountUp";

type Card = {
  id: "conv" | "lcp" | "seo";
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  Icon: typeof TrendUp;
  position: string; // absolute classes
  delay: number;
};

const CARDS: Card[] = [
  {
    id: "conv",
    to: 47,
    prefix: "+",
    suffix: "%",
    label: "conversión",
    Icon: TrendUp,
    position: "-top-4 -left-6 md:-left-12",
    delay: 0,
  },
  {
    id: "lcp",
    to: 2.1,
    decimals: 1,
    suffix: "s",
    label: "LCP",
    Icon: Lightning,
    position: "top-1/2 -right-4 md:-right-10 -translate-y-1/2",
    delay: 1.6,
  },
  {
    id: "seo",
    to: 100,
    suffix: "/100",
    label: "SEO",
    Icon: MagnifyingGlass,
    position: "-bottom-6 left-8 md:left-20",
    delay: 3.2,
  },
];

export function FloatingMetrics() {
  const reduce = useReducedMotion();

  return (
    <>
      {CARDS.map((c) => (
        <motion.div
          key={c.id}
          className={`absolute z-20 ${c.position} flex w-max items-center gap-3 rounded-[var(--radius-card)] bg-white p-3 pr-4 shadow-[var(--shadow-soft)] ring-1 ring-[var(--color-ink-200)]`}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.2 + c.delay * 0.1 }}
        >
          <motion.div
            className="flex items-center gap-3"
            animate={reduce ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: c.delay }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-chip)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
              <c.Icon size={18} weight="bold" aria-hidden />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-base font-bold tabular-nums text-[var(--color-ink-900)]">
                <CountUp
                  to={c.to}
                  decimals={c.decimals ?? 0}
                  prefix={c.prefix}
                  suffix={c.suffix}
                />
              </span>
              <span className="text-[11px] font-medium text-[var(--color-ink-500)]">{c.label}</span>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}

export default FloatingMetrics;
