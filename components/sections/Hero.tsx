import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/motion/FadeUp";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative min-h-[100dvh]">
      <div className="container-page grid grid-cols-1 items-center gap-12 py-16 md:grid-cols-12 md:gap-8 md:py-24">
        <FadeUp className="md:col-span-7">
          <p className="mb-6 inline-flex items-center gap-2 rounded-pill border border-[var(--color-border-default)] bg-[var(--color-elevated)] px-3 py-1 text-xs font-medium text-[var(--color-text-body)]">
            <span className="size-1.5 rounded-full bg-[var(--color-accent)]" /> {t("badgeProjects")}
          </p>
          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tighter md:text-7xl">{t("headline")}</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-text-body)] md:text-lg">{t("subheadline")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg"><Link href="/contacto">{t("ctaPrimary")}</Link></Button>
            <Button asChild size="lg" variant="ghost"><Link href="/portfolio">{t("ctaSecondary")}</Link></Button>
          </div>
          <p className="mt-4 text-xs text-[var(--color-text-muted)]">{t("microcopy")}</p>
        </FadeUp>

        <FadeUp delay={0.1} className="md:col-span-5">
          <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-default)] bg-[var(--color-elevated)] shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)]">
            <div className="flex items-center gap-1.5 border-b border-[var(--color-border-default)] bg-[var(--color-divider)] px-4 py-3">
              <span className="size-2.5 rounded-full bg-[#FF5F57]" />
              <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="size-2.5 rounded-full bg-[#28C840]" />
            </div>
            <Image
              src="https://picsum.photos/seed/dentistlab-hero/1280/900"
              alt="Dentistlab"
              width={1280}
              height={900}
              priority
              unoptimized
              className="h-auto w-full"
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
