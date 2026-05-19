import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Services } from "@/components/home/Services";
import { Brands } from "@/components/home/Brands";
import { Projects } from "@/components/home/Projects";
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
    locale: "en_US",
    type: "website",
  },
};

export default function HomeEn() {
  return (
    <main>
      <Hero dict={dict.hero} locale="en" />
      <TrustBar dict={dict.trustBar} />
      <Services dict={dict.services} locale="en" />
      <Brands dict={dict.brands} />
      <Projects dict={dict.projects} />
      <Partners dict={dict.partners} />
      <FAQ dict={dict.faq} />
    </main>
  );
}
