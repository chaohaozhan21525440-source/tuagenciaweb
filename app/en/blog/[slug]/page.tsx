import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { getDict } from "@/lib/i18n";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  dateToIso,
} from "@/lib/seo/schemas";

const dict = getDict("en");

export function generateStaticParams() {
  return dict.blogPage.articles.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = dict.blogPage.articles.find((a) => a.slug === slug);
  if (!article) return {};
  const url = `https://www.tuagenciaweb.es/en/blog/${slug}`;
  const publishedTime = dateToIso(article.date, "en") || undefined;
  return {
    title: `${article.title} | Tuagenciaweb`,
    description: article.excerpt,
    alternates: {
      canonical: `/en/blog/${slug}`,
      languages: { es: `/es/blog/${slug}`, en: `/en/blog/${slug}` },
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      locale: "en_US",
      type: "article",
      publishedTime,
      authors: ["Tuagenciaweb"],
      images: article.cover ? [article.cover] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: article.cover ? [article.cover] : undefined,
    },
  };
}

export default async function BlogPostEn({ params }: Props) {
  const { slug } = await params;
  const article = dict.blogPage.articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const datePublished = dateToIso(article.date, "en") || `${new Date().getFullYear()}-01-01`;

  const articleJson = buildArticleSchema({
    headline: article.title,
    description: article.excerpt,
    url: `/en/blog/${slug}`,
    datePublished,
    image: article.cover,
  });
  const breadcrumbJson = buildBreadcrumbSchema([
    { name: "Home", url: "/en" },
    { name: "Blog", url: "/en/blog" },
    { name: article.title, url: `/en/blog/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleJson }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJson }}
      />
      <BlogPostContent
        article={article}
        locale="en"
        backLabel={dict.blogPage.backToBlog}
        ctaTitle={dict.blogPage.postCta.title}
        ctaSub={dict.blogPage.postCta.sub}
        ctaButton={dict.blogPage.postCta.button}
      />
    </>
  );
}
