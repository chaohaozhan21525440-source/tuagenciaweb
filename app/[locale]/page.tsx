import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { LogosTrust } from "@/components/home/LogosTrust";
import { ValueProps } from "@/components/home/ValueProps";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { PortfolioShowcase } from "@/components/home/PortfolioShowcase";
import { Pricing } from "@/components/home/Pricing";
import { Comparativa } from "@/components/home/Comparativa";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { CTAFinal } from "@/components/home/CTAFinal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.hero" });
  return buildMetadata({
    locale: locale as "es" | "en",
    path: "/",
    title: `Tuagenciaweb · ${t("headlinePart1")} ${t("headlineHighlight")}`,
    description: t("subheadline"),
  });
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <Hero />
      <LogosTrust />
      <ValueProps />
      <ServicesGrid />
      <ProcessTimeline />
      <PortfolioShowcase />
      <Pricing />
      <Comparativa />
      <Testimonials />
      <FAQ />
      <CTAFinal />
    </main>
  );
}
