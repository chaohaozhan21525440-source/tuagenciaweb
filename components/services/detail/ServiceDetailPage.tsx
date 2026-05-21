import type { Dict, Locale } from "@/lib/i18n";
import { ServiceHero } from "./ServiceHero";

type Service = Dict["servicesDetail"][keyof Dict["servicesDetail"]];

export function ServiceDetailPage({
  service,
  locale,
  hubLabel,
}: {
  service: Service;
  locale: Locale;
  hubLabel: string;
}) {
  return (
    <main className="services-redesign service-detail">
      <ServiceHero service={service} locale={locale} hubLabel={hubLabel} />
      {/* TODO Task 4: <ServiceValueProp /> */}
      {/* TODO Task 4: <ServiceIncluded /> */}
      {/* TODO Task 5: <ServiceProcess /> */}
      {/* TODO Task 5: <ServiceUseCases /> */}
      {/* TODO Task 6: <ServiceExamples /> */}
      {/* TODO Task 6: <ServiceCta /> */}
    </main>
  );
}
