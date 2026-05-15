"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { PaintBrush, MagnifyingGlass, DeviceMobile, Rocket, Play, Star, CheckCircle, Gauge, TrendUp } from "@phosphor-icons/react";

const ICONS: Record<string, typeof PaintBrush> = {
  PaintBrush,
  MagnifyingGlass,
  DeviceMobile,
  Rocket,
};

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20, delay: i * 0.08 },
  }),
};

const floatLoop = (delay: number) => ({
  y: [0, -6, 0],
  transition: { duration: 4, ease: "easeInOut" as const, repeat: Infinity, delay },
});

export function Hero() {
  const t = useTranslations("home.hero");
  const features = t.raw("features") as Array<{ title: string; icon: string }>;

  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      {/* gradient orb top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 600px at 90% -10%, rgba(31, 163, 229, 0.18), transparent 60%)",
        }}
      />

      <div className="container-page relative grid grid-cols-1 items-center gap-12 py-16 md:grid-cols-12 md:gap-10 md:py-24">
        {/* LEFT */}
        <div className="md:col-span-7">
          <motion.p
            initial="hidden"
            animate="show"
            custom={0}
            variants={fade}
            className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-accent-deep)]"
          >
            {t("tagline")}
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="show"
            custom={1}
            variants={fade}
            className="mt-5 font-display text-5xl font-bold leading-[0.95] tracking-tighter md:text-7xl"
          >
            {t("headlineLead")}{" "}
            <span className="text-[var(--color-accent)]">{t("headlineHighlight")}</span>.
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={2}
            variants={fade}
            className="mt-6 max-w-[55ch] text-base leading-relaxed text-[var(--color-text-body)] md:text-lg"
          >
            {t("subheadline")}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            custom={3}
            variants={fade}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="lg">
              <Link href="/contacto">{t("ctaPrimary")}</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link href="/portfolio">
                <Play size={18} weight="fill" />
                {t("ctaSecondary")}
              </Link>
            </Button>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            custom={4}
            variants={fade}
            className="mt-10 grid max-w-md grid-cols-2 gap-x-6 gap-y-4"
          >
            {features.map((f) => {
              const Icon = ICONS[f.icon] ?? PaintBrush;
              return (
                <li key={f.title} className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                    <Icon size={18} weight="bold" />
                  </span>
                  <span className="text-sm font-medium">{f.title}</span>
                </li>
              );
            })}
          </motion.ul>

          <motion.div
            initial="hidden"
            animate="show"
            custom={5}
            variants={fade}
            className="mt-8 flex items-center gap-3"
          >
            <div className="flex items-center gap-0.5 text-[var(--color-accent)]">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={16} weight="fill" />
              ))}
            </div>
            <span className="text-sm font-semibold">{t("rating")}</span>
            <span className="text-xs text-[var(--color-text-muted)]">· {t("ratingSource")}</span>
          </motion.div>
        </div>

        {/* RIGHT — visual composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          className="relative md:col-span-5"
        >
          {/* Laptop frame */}
          <div className="relative mx-auto w-full max-w-[520px] -rotate-[3deg]">
            <div className="overflow-hidden rounded-[1.25rem] border border-[var(--color-border-default)] bg-[var(--color-elevated)] shadow-[0_40px_80px_-30px_rgba(15,23,42,0.30)]">
              {/* Browser bar */}
              <div className="flex items-center gap-1.5 border-b border-[var(--color-border-default)] bg-[var(--color-divider)] px-4 py-3">
                <span className="size-2.5 rounded-full bg-[#FF5F57]" />
                <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="size-2.5 rounded-full bg-[#28C840]" />
              </div>
              <Image
                src="/portfolio/dentistlab.png"
                alt="Dentistlab"
                width={1280}
                height={800}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>

          {/* Phone frame */}
          <div className="absolute -right-4 bottom-4 hidden w-[140px] rotate-[5deg] md:block lg:w-[170px]">
            <div className="overflow-hidden rounded-[1.75rem] border-[6px] border-[var(--color-text-strong)] bg-[var(--color-text-strong)] shadow-[0_30px_50px_-20px_rgba(15,23,42,0.35)]">
              <Image
                src="/portfolio/chinaway.png"
                alt="Chinaway"
                width={400}
                height={800}
                className="h-auto w-full"
              />
            </div>
          </div>

          {/* Floating cards */}
          <motion.div
            animate={floatLoop(0)}
            className="absolute -top-4 right-0 hidden flex-row items-center gap-3 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-elevated)] px-4 py-3 shadow-[0_15px_40px_-15px_rgba(15,23,42,0.20)] md:flex"
          >
            <CheckCircle size={22} weight="duotone" className="text-[var(--color-accent)]" />
            <div>
              <p className="font-display text-lg font-bold leading-none">{t("badgeProjects").split(" ")[0]}</p>
              <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">{t("badgeProjects").split(" ").slice(1).join(" ")}</p>
            </div>
          </motion.div>

          <motion.div
            animate={floatLoop(1)}
            className="absolute top-1/2 -left-6 hidden -translate-y-1/2 flex-row items-center gap-3 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-elevated)] px-4 py-3 shadow-[0_15px_40px_-15px_rgba(15,23,42,0.20)] lg:flex"
          >
            <Gauge size={22} weight="duotone" className="text-[var(--color-accent)]" />
            <div>
              <p className="font-display text-lg font-bold leading-none">{t("badgePagespeed").split(" ")[0]}</p>
              <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">{t("badgePagespeed").split(" ").slice(1).join(" ")}</p>
            </div>
          </motion.div>

          <motion.div
            animate={floatLoop(2)}
            className="absolute -bottom-6 right-8 hidden flex-row items-center gap-3 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-elevated)] px-4 py-3 shadow-[0_15px_40px_-15px_rgba(15,23,42,0.20)] md:flex"
          >
            <TrendUp size={22} weight="duotone" className="text-[var(--color-accent)]" />
            <div>
              <p className="font-display text-lg font-bold leading-none">{t("badgeLeads").split(" ")[0]}</p>
              <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">{t("badgeLeads").split(" ").slice(1).join(" ")}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
