import type { Dict, Locale } from "@/lib/i18n";
import { ServicesHero } from "./sr/ServicesHero";

export function ServicesPageContent({
  dict,
  locale,
}: {
  dict: Dict["servicesPage"];
  locale: Locale;
}) {
  return (
    <main className="services-redesign">
      <ServicesHero dict={dict.hero} locale={locale} />
    </main>
  );
}
