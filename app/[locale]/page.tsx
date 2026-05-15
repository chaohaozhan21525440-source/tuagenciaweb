import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { PortfolioFeatured } from "@/components/sections/PortfolioFeatured";
import { Differentiators } from "@/components/sections/Differentiators";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <Hero />
      <TrustBar />
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
