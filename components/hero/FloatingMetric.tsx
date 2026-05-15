"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  value: string;
  label: string;
  iconBg?: "brand" | "success";
  delay?: number;
};

/**
 * Floating glassy card with a single metric. Idle float animation
 * (respects prefers-reduced-motion).
 */
export function FloatingMetric({ icon, value, label, iconBg = "brand", delay = 0 }: Props) {
  const reduce = useReducedMotion();

  const bg =
    iconBg === "success"
      ? "bg-[var(--color-success-soft)] text-[var(--color-success)]"
      : "bg-[var(--color-brand-soft)] text-[var(--color-brand)]";

  return (
    <motion.div
      animate={reduce ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay }}
      className="flex items-center gap-3 rounded-[var(--radius-card)] border border-white/60 bg-white/95 px-4 py-3 shadow-[0_20px_50px_-15px_rgba(10,23,51,0.20)] backdrop-blur-xl"
    >
      <span className={`flex size-10 shrink-0 items-center justify-center rounded-[10px] ${bg}`}>
        {icon}
      </span>
      <div className="leading-tight">
        <p className="font-display text-base font-bold text-[var(--color-ink-900)]">{value}</p>
        <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--color-ink-400)]">{label}</p>
      </div>
    </motion.div>
  );
}
