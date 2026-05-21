import type { Dict, Locale } from "@/lib/i18n";
import { ServicesHero } from "./sr/ServicesHero";
import { ProcessTimeline } from "./sr/ProcessTimeline";
import { ComparisonTable } from "./sr/ComparisonTable";
import { MarketingGrid } from "./sr/MarketingGrid";
import { ServicesFaq } from "./sr/ServicesFaq";
import { ServicesCta } from "./sr/ServicesCta";

export function ServicesPageContent({ dict, locale }: { dict: Dict["servicesPage"]; locale: Locale }) {
  return (
    <main className="services-redesign">
      <ServicesHero dict={dict.hero} locale={locale} />
      {/* TODO Task 2: <HubCards dict={dict.hubCards} locale={locale} /> */}
      <ProcessTimeline dict={dict.process} />
      <ComparisonTable dict={dict.comparison} />
      <MarketingGrid dict={dict.marketing} />
      <ServicesFaq dict={dict.faq} />
      <ServicesCta dict={dict.cta} locale={locale} />
    </main>
  );
}
