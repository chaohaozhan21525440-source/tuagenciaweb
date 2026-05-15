"use client";

import { motion } from "framer-motion";

type Props = { value: number; max?: number; label: string };

/**
 * Circular progress gauge. value/max determines the fill ratio of the ring.
 * Animates the dashoffset on mount.
 */
export function FloatingCardGauge({ value, max = 100, label }: Props) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius; // ≈ 138.23
  const ratio = Math.max(0, Math.min(1, value / max));
  const filled = circumference * ratio;
  const offset = circumference - filled;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-elevated)] px-4 py-3 shadow-[0_15px_40px_-15px_rgba(15,23,42,0.20)]">
      <div className="relative flex size-12 shrink-0 items-center justify-center">
        <svg viewBox="0 0 56 56" className="size-12 -rotate-90">
          <circle cx="28" cy="28" r={radius} fill="none" stroke="var(--color-accent-soft)" strokeWidth="4" />
          <motion.circle
            cx="28"
            cy="28"
            r={radius}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          />
        </svg>
        <span className="absolute font-display text-sm font-bold">{value}</span>
      </div>
      <p className="text-xs leading-tight text-[var(--color-text-muted)]">{label}</p>
    </div>
  );
}
