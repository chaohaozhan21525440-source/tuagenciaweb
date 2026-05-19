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
      "Insights on web design, SEO, e-commerce and CRO.",
    locale: "en_GB",
    type: "website",
  },
};

export default function BlogEn() {
  return <BlogPageContent dict={dict.blogPage} readMoreLabel={dict.blogPage.readMore} />;
}
