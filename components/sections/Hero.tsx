"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Play, Star } from "@phosphor-icons/react";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20, delay: i * 0.08 },
  }),
};

export function Hero() {
  const t = useTranslations("home.hero");

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
        {/* LEFT — text block */}
        <div className="md:col-span-6">
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

          <motion.div
            initial="hidden"
            animate="show"
            custom={4}
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

        {/* RIGHT — ChatGPT composition image, used literally */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          className="md:col-span-6"
        >
          <Image
            src="/hero/composition.png"
            alt="Tuagenciaweb — laptop y móvil con webs de ejemplo y métricas"
            width={1478}
            height={985}
            priority
            className="h-auto w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
