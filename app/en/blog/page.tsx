import type { Metadata } from "next";
import { BlogPageContent } from "@/components/blog/BlogPageContent";
import { getDict } from "@/lib/i18n";

const dict = getDict("en");

export const metadata: Metadata = {
  title: "Web design, SEO and conversion blog | TuAgenciaWeb",
  description:
    "Tips, strategies and guides on web design, technical SEO, e-commerce and CRO to help your business grow.",
  alternates: {
    canonical: "/en/blog",
    languages: { es: "/es/blog", en: "/en/blog", "x-default": "/es/blog" },
  },
  openGraph: {
    title: "Web design, SEO and conversion blog | TuAgenciaWeb",
    description:
      "Tips, strategies and guides on web design, technical SEO, e-commerce and CRO.",
    url: "https://www.tuagenciaweb.es/en/blog",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web design, SEO and conversion blog | TuAgenciaWeb",
    description:
      "Tips, strategies and guides on web design, technical SEO, e-commerce and CRO.",
  },
};

export default function BlogEn() {
  return (
    <BlogPageContent
      dict={dict.blogPage}
      readMoreLabel={dict.blogPage.readMore}
      locale="en"
    />
  );
}
