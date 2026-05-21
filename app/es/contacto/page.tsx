import type { Metadata } from "next";
import { ContactContent } from "@/components/contact/ContactContent";
import { getDict } from "@/lib/i18n";

const dict = getDict("es");

export const metadata: Metadata = {
  title: dict.meta.contact.title,
  description: dict.meta.contact.description,
  alternates: {
    canonical: "/es/contacto",
    languages: { es: "/es/contacto", en: "/en/contact", "x-default": "/es/contacto" },
  },
  openGraph: {
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
    url: "https://www.tuagenciaweb.es/es/contacto",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
  },
};

export default function ContactEs() {
  return <ContactContent dict={dict.contact} locale="es" />;
}
