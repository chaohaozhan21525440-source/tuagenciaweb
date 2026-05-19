import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/services/ServicesPageContent";
import { getDict } from "@/lib/i18n";

const dict = getDict("es");

export const metadata: Metadata = {
  title: "Servicios de diseño web, SEO y marketing digital | TuAgenciaWeb",
  description:
    "Diseño web a medida, tiendas online, SEO técnico, marketing digital y mantenimiento. Estrategia digital end-to-end para que tu negocio crezca.",
  alternates: {
    canonical: "/es/servicios",
    languages: { es: "/es/servicios", en: "/en/services", "x-default": "/es/servicios" },
  },
  openGraph: {
    title: "Servicios de diseño web, SEO y marketing digital | TuAgenciaWeb",
    description:
      "Diseño web, SEO y marketing digital con foco en conversión y resultados medibles.",
    locale: "es_ES",
    type: "website",
  },
};

export default function ServiciosEs() {
  return (
    <ServicesPageContent
      dict={dict.servicesPage}
      servicesDict={dict.services}
      locale="es"
    />
  );
}
