import type { Dict, Locale } from "@/lib/i18n";
import { ServicesHero } from "./sr/ServicesHero";
import { ServicesDetail } from "./sr/ServicesDetail";

export function ServicesPageContent({ dict, locale }: { dict: Dict["servicesPage"]; locale: Locale }) {
  return (
    <main className="services-redesign">
      <ServicesHero dict={dict.hero} locale={locale} />
      <ServicesDetail dict={dict.detail} />
    </main>
  );
}
