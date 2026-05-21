import type { Metadata } from "next";
import { BlogPageContent } from "@/components/blog/BlogPageContent";
import { getDict } from "@/lib/i18n";

const dict = getDict("es");

export const metadata: Metadata = {
  title: "Blog de diseño web, SEO y conversión | TuAgenciaWeb",
  description:
    "Consejos, estrategias y guías sobre diseño web, SEO técnico, e-commerce y CRO para hacer crecer tu negocio.",
  alternates: {
    canonical: "/es/blog",
    languages: { es: "/es/blog", en: "/en/blog", "x-default": "/es/blog" },
  },
  openGraph: {
    title: "Blog de diseño web, SEO y conversión | TuAgenciaWeb",
    description:
      "Consejos, estrategias y guías sobre diseño web, SEO técnico, e-commerce y CRO.",
    url: "https://www.tuagenciaweb.es/es/blog",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog de diseño web, SEO y conversión | TuAgenciaWeb",
    description:
      "Consejos, estrategias y guías sobre diseño web, SEO técnico, e-commerce y CRO.",
  },
};

export default function BlogEs() {
  return (
    <BlogPageContent
      dict={dict.blogPage}
      readMoreLabel={dict.blogPage.readMore}
      locale="es"
    />
  );
}
