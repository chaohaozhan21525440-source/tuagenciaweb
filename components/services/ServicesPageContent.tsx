import type { Dict, Locale } from "@/lib/i18n";
import { ServicesHero } from "./sr/ServicesHero";
import { ServicesDetail } from "./sr/ServicesDetail";
import { ProcessTimeline } from "./sr/ProcessTimeline";
import { ComparisonTable } from "./sr/ComparisonTable";
import { MarketingGrid } from "./sr/MarketingGrid";

export function ServicesPageContent({ dict, locale }: { dict: Dict["servicesPage"]; locale: Locale }) {
  return (
    <main className="services-redesign">
      <ServicesHero dict={dict.hero} locale={locale} />
      <ServicesDetail dict={dict.detail} />
      <ProcessTimeline dict={dict.process} />
      <ComparisonTable dict={dict.comparison} />
      <MarketingGrid dict={dict.marketing} />
    </main>
  );
}
