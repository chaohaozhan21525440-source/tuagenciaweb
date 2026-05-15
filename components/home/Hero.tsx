import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  ArrowRight,
  ArrowUpRight,
  Coins,
  Lightning,
  LockKey,
} from "@phosphor-icons/react/dist/ssr";
import { SplitText } from "@/components/animations/SplitText";
import { BlurText } from "@/components/animations/BlurText";
import { Magnet } from "@/components/animations/Magnet";
import { Aurora } from "@/components/animations/Aurora";
import { BrowserMockup } from "@/components/hero/BrowserMockup";
import { PhoneMockup } from "@/components/hero/PhoneMockup";
import { FloatingMetrics } from "@/components/hero/FloatingMetrics";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative isolate overflow-hidden pb-16 pt-12 md:pb-24 md:pt-16">
      {/* Aurora background — react-bits port, palette-restricted */}
      <Aurora opacity={0.35} />
      {/* Soft grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(14,42,74,0.06) 1px, transparent 0)",
          backgroundSize: "32px 32px",
          maskImage: "linear-gradient(to bottom, black 30%, transparent 90%)",
        }}
      />

      <div className="container-page relative grid grid-cols-1 items-center gap-14 md:grid-cols-12 md:gap-10">
        {/* LEFT — text 60% */}
        <div className="md:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-ink-200)] bg-white/85 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-700)] shadow-[var(--shadow-soft)] backdrop-blur">
            <span className="relative inline-flex h-2 w-2 items-center justify-center">
              <span
                className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[var(--color-success)] opacity-75"
                aria-hidden
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-success)]" />
            </span>
            {t("eyebrow")}
          </span>

          {/* H1 — SplitText (react-bits) with accent highlight */}
          <h1
            className="mt-6 font-display font-bold tracking-tight text-[var(--color-ink-900)]"
            style={{ fontSize: "clamp(44px, 8vw, 84px)", lineHeight: 0.95 }}
          >
            <SplitText
              text={t("headlinePart1")}
              splitType="words"
              delay={18}
              duration={0.55}
              as="span"
            />{" "}
            <SplitText
              text={t("headlineHighlight")}
              splitType="words"
              delay={18}
              duration={0.55}
              startDelay={0.35}
              as="span"
              className="text-[var(--color-accent)]"
            />
            <span aria-hidden>.</span>
          </h1>

          {/* Subtitle — BlurText (react-bits) */}
          <div className="mt-6 max-w-[56ch]">
            <BlurText
              text={t("subheadline")}
              className="text-lg leading-relaxed text-[var(--color-ink-500)]"
              delay={20}
              startDelay={0.4}
              blurAmount={12}
            />
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            {/* Magnet primary CTA (react-bits) */}
            <Magnet padding={70} strength={4}>
              <Link
                href={"/#precios" as never}
                className="group inline-flex h-14 items-center gap-2 rounded-[var(--radius-control)] bg-[var(--color-accent)] px-7 text-base font-semibold text-white shadow-[var(--shadow-lift)] transition-colors duration-200 hover:bg-[var(--color-accent-hover)] active:scale-[0.98]"
              >
                {t("ctaPrimary")}
                <ArrowUpRight
                  size={18}
                  weight="bold"
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </Magnet>

            <Link
              href="/portfolio"
              className="link-underline inline-flex items-center gap-2 text-base font-semibold text-[var(--color-ink-900)]"
            >
              {t("ctaSecondary")}
              <ArrowRight size={18} weight="bold" aria-hidden />
            </Link>
          </div>

          {/* Microcopy with icons */}
          <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[var(--color-ink-400)]">
            <li className="inline-flex items-center gap-2">
              <Lightning size={14} weight="fill" aria-hidden className="text-[var(--color-accent)]" />
              {t("micro1")}
            </li>
            <li className="inline-flex items-center gap-2">
              <Coins size={14} weight="fill" aria-hidden className="text-[var(--color-accent)]" />
              {t("micro2")}
            </li>
            <li className="inline-flex items-center gap-2">
              <LockKey size={14} weight="fill" aria-hidden className="text-[var(--color-accent)]" />
              {t("micro3")}
            </li>
          </ul>
        </div>

        {/* RIGHT — mockups 40% */}
        <div className="md:col-span-5">
          <div className="relative mx-auto aspect-[5/4] w-full max-w-[520px]">
            <div className="absolute inset-0" style={{ transform: "rotate(-2deg)" }}>
              <BrowserMockup />
            </div>
            <div
              className="absolute right-0 top-1/4 w-[42%] max-w-[180px]"
              style={{ transform: "rotate(4deg) translate(8%, 8%)" }}
            >
              <PhoneMockup />
            </div>
            <FloatingMetrics />
          </div>
        </div>
      </div>
    </section>
  );
}
