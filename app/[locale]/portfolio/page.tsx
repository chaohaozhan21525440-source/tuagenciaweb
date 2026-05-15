import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FadeUp } from "@/components/motion/FadeUp";

function PortfolioHero() {
  const t = useTranslations("portfolio.hero");
  return (
    <section className="container-page pt-16 md:pt-24">
      <FadeUp className="max-w-3xl">
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tighter md:text-6xl">{t("title")}</h1>
        <p className="mt-5 text-base text-[var(--color-text-body)] md:text-lg">{t("subtitle")}</p>
      </FadeUp>
    </section>
  );
}

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <PortfolioHero />
      <PortfolioGrid />
      <FinalCTA />
    </main>
  );
}
