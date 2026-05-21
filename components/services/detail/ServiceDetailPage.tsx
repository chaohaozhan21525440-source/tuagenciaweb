import type { Dict, Locale } from "@/lib/i18n";
import { ServiceHero } from "./ServiceHero";
import { ServiceValueProp } from "./ServiceValueProp";
import { ServiceIncluded } from "./ServiceIncluded";
import { ServiceProcess } from "./ServiceProcess";
import { ServiceUseCases } from "./ServiceUseCases";

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
      <ServiceValueProp data={service.valueProp} />
      <ServiceIncluded data={service.included} />
      <ServiceProcess data={service.process} />
      <ServiceUseCases data={service.useCases} />
      {/* TODO Task 6: <ServiceExamples /> */}
      {/* TODO Task 6: <ServiceCta /> */}
    </main>
  );
}
