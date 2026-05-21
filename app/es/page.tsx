import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Services } from "@/components/home/Services";
import { Projects } from "@/components/home/Projects";
import { Testimonials } from "@/components/home/Testimonials";
import { Partners } from "@/components/home/Partners";
import { FAQ } from "@/components/home/FAQ";
import { getDict } from "@/lib/i18n";

const dict = getDict("es");

export const metadata: Metadata = {
  title: dict.meta.home.title,
  description: dict.meta.home.description,
  alternates: {
    canonical: "/es",
    languages: { es: "/es", en: "/en", "x-default": "/es" },
  },
  openGraph: {
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    url: "https://www.tuagenciaweb.es/es",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: dict.meta.home.title,
    description: dict.meta.home.description,
  },
};

export default function HomeEs() {
  return (
    <main>
      <Hero dict={dict.hero} locale="es" />
      <TrustBar dict={dict.trustBar} />
      <Services dict={dict.services} locale="es" />
      <Projects dict={dict.projects} />
      <Testimonials dict={dict.testimonials} />
      <Partners dict={dict.partners} />
      <FAQ dict={dict.faq} />
    </main>
  );
}
