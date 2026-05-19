import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/services/ServicesPageContent";
import { getDict } from "@/lib/i18n";

const dict = getDict("en");

export const metadata: Metadata = {
  title: "Web design, SEO and digital marketing services | TuAgenciaWeb",
  description:
    "Bespoke web design, online stores, technical SEO, digital marketing and maintenance. End-to-end digital strategy built for growth.",
  alternates: {
    canonical: "/en/services",
    languages: { es: "/es/servicios", en: "/en/services", "x-default": "/es/servicios" },
  },
  openGraph: {
    title: "Web design, SEO and digital marketing services | TuAgenciaWeb",
    description:
      "Web design, SEO and digital marketing focused on conversion and measurable results.",
    locale: "en_GB",
    type: "website",
  },
};

export default function ServicesEn() {
  return (
    <ServicesPageContent
      dict={dict.servicesPage}
      servicesDict={dict.services}
      locale="en"
    />
  );
}
