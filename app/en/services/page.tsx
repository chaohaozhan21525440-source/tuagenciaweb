import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/services/ServicesPageContent";
import { getDict } from "@/lib/i18n";
import { buildFaqPageSchema } from "@/lib/seo/faq-schema";

const dict = getDict("en");

export const metadata: Metadata = {
  title: dict.servicesPage.meta.title,
  description: dict.servicesPage.meta.description,
  alternates: {
    canonical: "/en/services",
    languages: { es: "/es/servicios", en: "/en/services", "x-default": "/es/servicios" },
  },
  openGraph: {
    title: dict.servicesPage.meta.title,
    description: dict.servicesPage.meta.description,
    locale: "en_US",
    type: "website",
  },
};

export default function ServicesEn() {
  const faqJson = buildFaqPageSchema(dict.servicesPage.faq.items);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJson }}
      />
      <ServicesPageContent dict={dict.servicesPage} locale="en" />
    </>
  );
}
