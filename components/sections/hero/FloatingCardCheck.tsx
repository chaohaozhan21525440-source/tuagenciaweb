"use client";

import { Check } from "@phosphor-icons/react";

type Props = { number: string; label: string };

export function FloatingCardCheck({ number, label }: Props) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-elevated)] px-4 py-3 shadow-[0_15px_40px_-15px_rgba(15,23,42,0.20)]">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#D1FAE5] text-[#10B981]">
        <Check size={20} weight="bold" />
      </span>
      <div>
        <p className="font-display text-lg font-bold leading-none">{number}</p>
        <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">{label}</p>
      </div>
    </div>
  );
}
