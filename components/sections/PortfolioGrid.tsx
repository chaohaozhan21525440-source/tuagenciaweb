"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "@phosphor-icons/react";
import { PROJECTS, type Sector } from "@/lib/portfolio";
import { FadeUp } from "@/components/motion/FadeUp";
import { cn } from "@/lib/cn";

const SECTOR_ORDER: Array<Sector | "all"> = ["all", "dental", "legal", "reforms", "hospitality"];

export function PortfolioGrid() {
  const t = useTranslations("portfolio");
  const [filter, setFilter] = useState<Sector | "all">("all");

  const items = useMemo(() => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.sector === filter)), [filter]);

  return (
    <section className="py-12 md:py-20">
      <div className="container-page">
        <FadeUp>
          <ul className="flex flex-wrap gap-2">
            {SECTOR_ORDER.map((s) => (
              <li key={s}>
                <button
                  onClick={() => setFilter(s)}
                  className={cn(
                    "rounded-pill border px-4 py-2 text-sm transition-colors",
                    filter === s
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                      : "border-[var(--color-border-default)] bg-[var(--color-elevated)] text-[var(--color-text-body)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
                  )}
                >
                  {t(`filters.${s}` as never)}
                </button>
              </li>
            ))}
          </ul>
        </FadeUp>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {items.map((p, i) => (
            <FadeUp key={p.slug} delay={i * 0.05}>
              {p.comingSoon ? (
                <div className="block overflow-hidden rounded-[var(--radius-card)] border border-dashed border-[var(--color-border-default)] bg-[var(--color-divider)] p-12 text-center">
                  <p className="font-display text-lg font-semibold text-[var(--color-text-muted)]">{t("comingSoon")}</p>
                </div>
              ) : (
                <a href={p.url!} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-default)] bg-[var(--color-elevated)] transition-all hover:-translate-y-1 hover:shadow-[0_25px_60px_-30px_rgba(15,23,42,0.25)]">
                  <div className="aspect-[16/10] overflow-hidden bg-[var(--color-divider)]">
                    <Image src={p.image} alt={p.name} width={1280} height={800} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" unoptimized />
                  </div>
                  <div className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                      <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">{p.sector} · {p.year}</p>
                    </div>
                    <span className="flex items-center gap-1 text-sm font-medium text-[var(--color-accent)]">
                      {t("viewLive")}
                      <ArrowUpRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </a>
              )}
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
