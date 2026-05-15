"use client";

import { motion } from "framer-motion";

type Props = { number: string; label: string };

const BAR_HEIGHTS = [40, 55, 45, 70, 100] as const;

export function FloatingCardSparkline({ number, label }: Props) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-elevated)] px-4 py-3 shadow-[0_15px_40px_-15px_rgba(15,23,42,0.20)]">
      <svg viewBox="0 0 48 30" className="h-7 w-12 shrink-0" preserveAspectRatio="none">
        {BAR_HEIGHTS.map((h, i) => {
          const barWidth = 6;
          const gap = 3;
          const x = i * (barWidth + gap);
          const heightPct = h / 100;
          return (
            <motion.rect
              key={i}
              x={x}
              y={30 - heightPct * 30}
              width={barWidth}
              height={heightPct * 30}
              fill="var(--color-accent)"
              rx={1}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.4 + i * 0.08 }}
              style={{ transformOrigin: `${x + barWidth / 2}px 30px` }}
            />
          );
        })}
      </svg>
      <div>
        <p className="font-display text-lg font-bold leading-none">{number}</p>
        <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">{label}</p>
      </div>
    </div>
  );
}
