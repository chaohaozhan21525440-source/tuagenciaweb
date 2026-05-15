"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { PaintBrush, MagnifyingGlass, DeviceMobile, Rocket, Play, Star } from "@phosphor-icons/react";
import { LaptopMockup } from "@/components/sections/hero/LaptopMockup";
import { PhoneMockup } from "@/components/sections/hero/PhoneMockup";
import { FloatingCardCheck } from "@/components/sections/hero/FloatingCardCheck";
import { FloatingCardGauge } from "@/components/sections/hero/FloatingCardGauge";
import { FloatingCardSparkline } from "@/components/sections/hero/FloatingCardSparkline";

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

  // Split badge strings into number + label fragments
  const projectsParts = t("badgeProjects").split(" ");
  const projectsNumber = projectsParts[0];
  const projectsLabel = projectsParts.slice(1).join(" ");
  const leadsParts = t("badgeLeads").split(" ");
  const leadsNumber = leadsParts[0];
  const leadsLabel = leadsParts.slice(1).join(" ");

  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      {/* Gradient orb top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 600px at 90% -10%, rgba(12, 120, 247, 0.18), transparent 60%)",
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
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                    <Icon size={20} weight="bold" />
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
          {/* Laptop */}
          <div className="-rotate-[3deg]">
            <LaptopMockup src="/portfolio/dentistlab.png" alt="Dentistlab" />
          </div>

          {/* Phone overlap, only md+ */}
          <div className="absolute -right-4 bottom-4 hidden rotate-[5deg] md:block">
            <PhoneMockup src="/portfolio/chinaway.png" alt="Chinaway" />
          </div>

          {/* Floating cards */}
          <motion.div animate={floatLoop(0)} className="absolute -top-4 right-0 hidden md:block">
            <FloatingCardCheck number={projectsNumber} label={projectsLabel} />
          </motion.div>

          <motion.div animate={floatLoop(1)} className="absolute top-1/2 -left-6 hidden -translate-y-1/2 lg:block">
            <FloatingCardGauge value={95} label={t("badgePagespeed").split(" ").slice(1).join(" ")} />
          </motion.div>

          <motion.div animate={floatLoop(2)} className="absolute -bottom-6 right-8 hidden md:block">
            <FloatingCardSparkline number={leadsNumber} label={leadsLabel} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
