import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";
import { getDict } from "@/lib/i18n";

const dict = getDict("en");

export const metadata: Metadata = {
  title: dict.meta.about.title,
  description: dict.meta.about.description,
  alternates: {
    canonical: "/en/about",
    languages: { es: "/es/sobre-nosotros", en: "/en/about", "x-default": "/es/sobre-nosotros" },
  },
  openGraph: {
    title: dict.meta.about.title,
    description: dict.meta.about.description,
    locale: "en_US",
    type: "website",
  },
};

export default function AboutEn() {
  return <AboutContent dict={dict.about} />;
}
