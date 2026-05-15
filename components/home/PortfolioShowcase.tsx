"use client";

/*
 * PortfolioShowcase
 * Uses TiltedCard interaction (react-bits, Components/TiltedCard) — ported
 * to a hover-tilt wrapper around the project images. Capped at ~6deg.
 */

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "@/i18n/routing";
import { PROJECTS } from "@/lib/portfolio";

function TiltCard({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 14, mass: 1 });
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 14, mass: 1 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - r.left - r.width / 2;
    const offsetY = e.clientY - r.top - r.height / 2;
    rx.set((offsetY / (r.height / 2)) * -6);
    ry.set((offsetX / (r.width / 2)) * 6);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="relative h-full"
    >
      {children}
    </motion.div>
  );
}

export function PortfolioShowcase() {
  const t = useTranslations("home.portfolio");

  // Masonry-ish: alternate aspect ratios for visual rhythm
  const aspects = [
    "aspect-[16/11]",
    "aspect-[4/5]",
    "aspect-[16/11]",
    "aspect-[16/11]",
    "aspect-[4/5]",
    "aspect-[16/11]",
  ];

  return (
    <section className="bg-[var(--color-ink-50)] py-20 md:py-24">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-lg text-[var(--color-ink-500)]">{t("subtitle")}</p>
          </div>
          <Link
            href="/portfolio"
            className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-ink-900)]"
          >
            {t("cta")}
            <ArrowUpRight size={16} weight="bold" aria-hidden />
          </Link>
        </div>

        <ul className="mt-12 grid auto-rows-[1fr] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <li key={p.slug} className="group">
              <TiltCard>
                <a
                  href={p.url ?? "#"}
                  target={p.url ? "_blank" : undefined}
                  rel={p.url ? "noopener noreferrer" : undefined}
                  className="block overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-ink-200)] bg-white shadow-[var(--shadow-ring)] transition-shadow duration-300 hover:shadow-[var(--shadow-soft)]"
                  aria-label={`${p.name} — ${t("viewCase")}`}
                >
                  <div className={`relative ${aspects[i % aspects.length]} overflow-hidden bg-[var(--color-ink-100)]`}>
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      unoptimized
                    />
                    {/* overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[var(--color-ink-900)]/70 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="inline-flex w-fit items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-accent-ink)]">
                        {t("viewCase")}
                        <ArrowUpRight size={11} weight="bold" aria-hidden />
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-5">
                    <div>
                      <h3 className="font-display text-lg font-bold tracking-tight text-[var(--color-ink-900)]">
                        {p.comingSoon ? t("comingSoon") : p.name}
                      </h3>
                      <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-[var(--color-ink-400)]">
                        {p.sector} · {p.year}
                      </p>
                    </div>
                    {p.url && (
                      <ArrowUpRight
                        size={20}
                        weight="bold"
                        aria-hidden
                        className="text-[var(--color-accent)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    )}
                  </div>
                </a>
              </TiltCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
