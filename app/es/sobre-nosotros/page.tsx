import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";
import { getDict } from "@/lib/i18n";

const dict = getDict("es");

export const metadata: Metadata = {
  title: dict.meta.about.title,
  description: dict.meta.about.description,
  alternates: {
    canonical: "/es/sobre-nosotros",
    languages: { es: "/es/sobre-nosotros", en: "/en/about", "x-default": "/es/sobre-nosotros" },
  },
  openGraph: {
    title: dict.meta.about.title,
    description: dict.meta.about.description,
    url: "https://www.tuagenciaweb.es/es/sobre-nosotros",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: dict.meta.about.title,
    description: dict.meta.about.description,
  },
};

export default function AboutEs() {
  return <AboutContent dict={dict.about} />;
}
