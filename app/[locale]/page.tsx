import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { HeroTrustBand } from "@/components/sections/HeroTrustBand";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { PortfolioFeatured } from "@/components/sections/PortfolioFeatured";
import { Differentiators } from "@/components/sections/Differentiators";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.hero" });
  return buildMetadata({
    locale: locale as "es" | "en",
    path: "/",
    title: `Tuagenciaweb · ${t("headline")}`,
    description: t("subheadline"),
  });
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <Hero />
      <HeroTrustBand />
      <ServicesGrid />
      <ProcessSteps />
      <PortfolioFeatured />
      <Differentiators />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
