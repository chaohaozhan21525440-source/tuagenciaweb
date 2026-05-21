import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Services } from "@/components/home/Services";
import { Projects } from "@/components/home/Projects";
import { Testimonials } from "@/components/home/Testimonials";
import { Partners } from "@/components/home/Partners";
import { FAQ } from "@/components/home/FAQ";
import { getDict } from "@/lib/i18n";

const dict = getDict("en");

export const metadata: Metadata = {
  title: dict.meta.home.title,
  description: dict.meta.home.description,
  alternates: {
    canonical: "/en",
    languages: { es: "/es", en: "/en", "x-default": "/es" },
  },
  openGraph: {
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    url: "https://www.tuagenciaweb.es/en",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: dict.meta.home.title,
    description: dict.meta.home.description,
  },
};

export default function HomeEn() {
  return (
    <main>
      <Hero dict={dict.hero} locale="en" />
      <TrustBar dict={dict.trustBar} />
      <Services dict={dict.services} locale="en" />
      <Projects dict={dict.projects} />
      <Testimonials dict={dict.testimonials} />
      <Partners dict={dict.partners} />
      <FAQ dict={dict.faq} />
    </main>
  );
}
