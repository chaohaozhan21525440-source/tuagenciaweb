"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const ArrowRight = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="none" {...p}>
    <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Play = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="none" {...p}>
    <rect x="3" y="5" width="14" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
    <path d="M9 8.5l3 1.7-3 1.7v-3.4z" fill="currentColor" />
  </svg>
);
const Monitor = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 28 28" fill="none" {...p}>
    <rect x="3.5" y="4.5" width="21" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
    <path d="M10 22h8M14 18.5V22" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);
const Rocket = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 28 28" fill="none" {...p}>
    <path d="M19 4c1.7 0 5 .6 5 5 0 4-3 7-5.5 8.5L13 13l3-3c1.5-1.5 2.7-3.7 3-6z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <circle cx="17.5" cy="10.5" r="1.6" fill="currentColor" />
    <path d="M11 17l-3 3M14 20l-2 2M8 14l-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M11 21c-2 1-4 1-4-2 3 0 3-2 4-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Search = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 28 28" fill="none" {...p}>
    <circle cx="12.5" cy="12.5" r="6.5" stroke="currentColor" strokeWidth="1.7" />
    <path d="M17.5 17.5l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const Phone = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 28 28" fill="none" {...p}>
    <rect x="8" y="3.5" width="12" height="21" rx="3" stroke="currentColor" strokeWidth="1.7" />
    <path d="M12 21h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);
const Trending = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 22 22" fill="none" {...p}>
    <path d="M3 16l5-5 3 3 7-8M13 6h5v5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Bars = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 22 22" fill="none" {...p}>
    <rect x="3.5" y="12" width="3" height="6.5" rx="0.7" fill="currentColor" />
    <rect x="9.5" y="8" width="3" height="10.5" rx="0.7" fill="currentColor" />
    <rect x="15.5" y="4" width="3" height="14.5" rx="0.7" fill="currentColor" />
  </svg>
);

function Card42() {
  return (
    <div className="w-[214px] rounded-2xl bg-white p-4 shadow-[0_30px_60px_-20px_rgba(10,23,51,0.18),0_12px_24px_-10px_rgba(10,23,51,0.10),0_0_0_1px_rgba(10,23,51,0.04)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-brand-soft,#eff4ff)]">
            <Trending className="h-5 w-5 text-[var(--color-brand,#2563eb)]" />
          </div>
          <div className="text-[34px] font-extrabold leading-none tracking-tight text-[var(--color-ink-900,#0a1733)]">+42</div>
        </div>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">+18%</span>
      </div>
      <div className="mt-2 text-[12.5px] text-[var(--color-ink-500,#475569)]">Solicitudes este mes</div>
      <svg viewBox="0 0 200 44" className="mt-2 h-9 w-full" aria-hidden>
        <defs>
          <linearGradient id="sp42" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#10b981" stopOpacity="0.22" />
            <stop offset="1" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 34 L22 30 L44 32 L66 24 L88 26 L110 18 L132 22 L154 14 L176 9 L200 3" fill="none" stroke="#10b981" strokeWidth="2" />
        <path d="M0 34 L22 30 L44 32 L66 24 L88 26 L110 18 L132 22 L154 14 L176 9 L200 3 L200 44 L0 44 Z" fill="url(#sp42)" />
      </svg>
    </div>
  );
}

function CardPageSpeed() {
  const R = 32;
  const C = 2 * Math.PI * R;
  const VAL = 95;
  return (
    <div className="flex w-[178px] flex-col items-center rounded-2xl bg-white p-4 text-center shadow-[0_30px_60px_-20px_rgba(10,23,51,0.18),0_12px_24px_-10px_rgba(10,23,51,0.10),0_0_0_1px_rgba(10,23,51,0.04)]">
      <svg viewBox="0 0 90 90" className="h-[84px] w-[84px]" aria-hidden>
        <circle cx="45" cy="45" r={R} fill="none" stroke="#e6f4ec" strokeWidth="8" />
        <circle cx="45" cy="45" r={R} fill="none" stroke="#10b981" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(VAL / 100) * C} ${C}`} transform="rotate(-90 45 45)" />
        <text x="45" y="52" textAnchor="middle" fontSize="24" fontWeight="800" fill="#0a1733">{VAL}</text>
      </svg>
      <div className="mt-1 text-[13px] font-bold text-[var(--color-ink-900,#0a1733)]">Google PageSpeed</div>
      <div className="mt-0.5 text-[11.5px] font-semibold text-emerald-600">Excelente</div>
    </div>
  );
}

function Card300() {
  return (
    <div className="flex w-[300px] items-center gap-3.5 rounded-2xl bg-white py-3.5 pl-4 pr-5 shadow-[0_30px_60px_-20px_rgba(10,23,51,0.18),0_12px_24px_-10px_rgba(10,23,51,0.10),0_0_0_1px_rgba(10,23,51,0.04)]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand-soft,#eff4ff)]">
        <Bars className="h-5 w-5 text-[var(--color-brand,#2563eb)]" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[24px] font-extrabold leading-none tracking-tight text-[var(--color-ink-900,#0a1733)]">+300%</div>
        <div className="mt-1 text-[11.5px] leading-snug text-[var(--color-ink-500,#475569)]">
          Más leads generados
          <br />
          con nuestras webs
        </div>
      </div>
      <svg viewBox="0 0 80 36" className="h-9 w-[70px] shrink-0" aria-hidden>
        <path d="M0 28 L12 24 L24 26 L36 18 L48 14 L60 8 L72 4 L80 2" fill="none" stroke="#10b981" strokeWidth="2" />
      </svg>
    </div>
  );
}

const features = [
  { Icon: Monitor, title: "Diseño a medida", sub: "100% personalizado" },
  { Icon: Rocket, title: "Rápido y seguro", sub: "Carga en < 2s" },
  { Icon: Search, title: "SEO optimizado", sub: "Posicionamos tu web" },
  { Icon: Phone, title: "Responsive", sub: "Perfecto en todos los dispositivos" },
] as const;

/**
 * Floating card animation, synced to the looping hero video.
 *
 * Cycle (5000ms total):
 *   0ms     hide cards
 *   1400ms  show cards (with per-card stagger 0 / 150 / 300ms)
 *   4000ms  hide cards (ease-in, slide slightly outward)
 *   5000ms  loop restart
 *
 * `direction` controls exit slide direction (right for right-side cards,
 * left for the bottom-left card).
 */
function useHeroCardCycle() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let showTimer: ReturnType<typeof setTimeout> | undefined;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;

    const runCycle = () => {
      setVisible(false);
      if (showTimer) clearTimeout(showTimer);
      if (hideTimer) clearTimeout(hideTimer);
      showTimer = setTimeout(() => setVisible(true), 1400);
      hideTimer = setTimeout(() => setVisible(false), 4000);
    };

    runCycle();
    const cycleId = setInterval(runCycle, 5000);

    return () => {
      clearInterval(cycleId);
      if (showTimer) clearTimeout(showTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, []);

  return visible;
}

type FloatingCardProps = {
  visible: boolean;
  delay: number;
  direction: "right" | "left";
  className?: string;
  children: React.ReactNode;
};

function FloatingCard({ visible, delay, direction, className, children }: FloatingCardProps) {
  const hiddenX = direction === "right" ? 28 : -28;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: hiddenX, scale: 0.95 }}
      animate={
        visible
          ? {
              opacity: 1,
              x: 0,
              scale: 1,
              transition: { type: "spring", stiffness: 120, damping: 18, delay },
            }
          : {
              opacity: 0,
              x: hiddenX,
              scale: 0.95,
              transition: { duration: 0.45, ease: "easeIn" },
            }
      }
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cardsVisible = useHeroCardCycle();

  // Some mobile browsers respect autoplay only when the muted attribute is
  // present and the play() call follows a user-gesture or DOMContentLoaded
  // tick. We re-trigger play on mount for safety.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden pt-8 md:pt-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 80% 0%, rgba(37,99,235,0.12), transparent 60%), radial-gradient(ellipse 60% 60% at 20% 100%, rgba(37,99,235,0.06), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent 75%)",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent 75%)",
        }}
      />

      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger}
        className="relative mx-auto grid max-w-[1280px] grid-cols-12 items-center gap-10 px-6 pb-20 md:px-8"
      >
        {/* LEFT */}
        <div className="col-span-12 pt-2 lg:col-span-6">
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-ink-100,#e2e8f0)] bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-700,#1e293b)] shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Diseño web · SEO · Resultados
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-7 whitespace-nowrap font-bold leading-[1.04] tracking-[-0.03em] text-[var(--color-ink-900,#0a1733)] text-[clamp(2.4rem,4.5vw,4rem)]"
          >
            Diseñamos webs que
            <br />
            <span className="text-[var(--color-brand,#2563eb)]">convierten visitas</span>
            <br />
            en clientes.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-[520px] text-[17px] leading-[1.6] text-[var(--color-ink-500,#475569)]"
          >
            Creamos páginas web modernas, rápidas y optimizadas para SEO para que tu negocio genere más contactos y ventas todos los días.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/contacto"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-[var(--color-brand,#2563eb)] px-5 py-3.5 text-[15px] font-semibold text-white shadow-[0_18px_40px_-12px_rgba(37,99,235,0.55)] transition-all hover:bg-[var(--color-brand-hover,#1d4ed8)] active:scale-[0.98]"
            >
              Solicitar presupuesto
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/#proyectos"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-ink-200,#cbd5e1)] bg-white px-5 py-3.5 text-[15px] font-semibold text-[var(--color-ink-900,#0a1733)] transition-all hover:border-[var(--color-ink-300,#94a3b8)] active:scale-[0.98]"
            >
              <Play className="h-4 w-4" />
              Ver proyectos
            </Link>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="mt-12 grid max-w-[560px] grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {features.map(({ Icon, title, sub }) => (
              <motion.div key={title} variants={fadeUp} className="flex flex-col items-start">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-brand-soft,#eff4ff)] text-[var(--color-brand,#2563eb)]">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-[14px] font-semibold text-[var(--color-ink-900,#0a1733)]">{title}</div>
                <div className="mt-0.5 text-balance text-[12.5px] leading-snug text-[var(--color-ink-400,#64748b)]">{sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="relative col-span-12 lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.25 }}
            className="hero-visual relative"
          >
            {/* Brand halo behind the video — large blue aura grounded in the page bg */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[-15%] -z-10"
              style={{
                background:
                  "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(37,99,235,0.22), rgba(37,99,235,0.06) 50%, transparent 75%)",
                filter: "blur(48px)",
              }}
            />

            {/*
              Video itself uses mix-blend-mode: multiply so the white frame of
              the source clip is multiplied against the white page background
              and disappears entirely. The radial mask provides the final soft
              feather around the silhouette. drop-shadow is moved here (not on
              a wrapper) so it follows the masked outline, not a hard rectangle.
            */}
            <video
              ref={videoRef}
              className="hero-laptop hero-video relative block h-auto w-full select-none"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
              style={{
                mixBlendMode: "multiply",
                WebkitMaskImage:
                  "radial-gradient(ellipse 78% 82% at 50% 52%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0) 100%)",
                maskImage:
                  "radial-gradient(ellipse 78% 82% at 50% 52%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0) 100%)",
                filter: "drop-shadow(0 32px 45px rgba(10,23,51,0.12))",
              }}
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>

            <FloatingCard
              visible={cardsVisible}
              delay={0}
              direction="right"
              className="hidden lg:block absolute right-[11%] top-[-10%] z-10"
            >
              <Card42 />
            </FloatingCard>

            <FloatingCard
              visible={cardsVisible}
              delay={0.15}
              direction="right"
              className="hidden lg:block absolute right-[-9%] top-[6%] z-10"
            >
              <CardPageSpeed />
            </FloatingCard>

            <FloatingCard
              visible={cardsVisible}
              delay={0.3}
              direction="left"
              className="hidden lg:block absolute bottom-[2%] left-[18%] z-10"
            >
              <Card300 />
            </FloatingCard>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
