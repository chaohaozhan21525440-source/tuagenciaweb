import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/services/ServicesPageContent";
import { getDict } from "@/lib/i18n";
import { buildFaqPageSchema } from "@/lib/seo/faq-schema";

const dict = getDict("es");

export const metadata: Metadata = {
  title: dict.servicesPage.meta.title,
  description: dict.servicesPage.meta.description,
  alternates: {
    canonical: "/es/servicios",
    languages: { es: "/es/servicios", en: "/en/services", "x-default": "/es/servicios" },
  },
  openGraph: {
    title: dict.servicesPage.meta.title,
    description: dict.servicesPage.meta.description,
    locale: "es_ES",
    type: "website",
  },
};

export default function ServiciosEs() {
  const faqJson = buildFaqPageSchema(dict.servicesPage.faq.items);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJson }}
      />
      <ServicesPageContent dict={dict.servicesPage} locale="es" />
    </>
  );
}
