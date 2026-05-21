import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { getDict } from "@/lib/i18n";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  dateToIso,
} from "@/lib/seo/schemas";

const dict = getDict("es");

export function generateStaticParams() {
  return dict.blogPage.articles.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = dict.blogPage.articles.find((a) => a.slug === slug);
  if (!article) return {};
  const url = `https://www.tuagenciaweb.es/es/blog/${slug}`;
  const publishedTime = dateToIso(article.date, "es") || undefined;
  return {
    title: `${article.title} | Tuagenciaweb`,
    description: article.excerpt,
    alternates: {
      canonical: `/es/blog/${slug}`,
      languages: { es: `/es/blog/${slug}`, en: `/en/blog/${slug}` },
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      locale: "es_ES",
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

export default async function BlogPostEs({ params }: Props) {
  const { slug } = await params;
  const article = dict.blogPage.articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const datePublished = dateToIso(article.date, "es") || `${new Date().getFullYear()}-01-01`;

  const articleJson = buildArticleSchema({
    headline: article.title,
    description: article.excerpt,
    url: `/es/blog/${slug}`,
    datePublished,
    image: article.cover,
  });
  const breadcrumbJson = buildBreadcrumbSchema([
    { name: "Inicio", url: "/es" },
    { name: "Blog", url: "/es/blog" },
    { name: article.title, url: `/es/blog/${slug}` },
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
        locale="es"
        backLabel={dict.blogPage.backToBlog}
        ctaTitle={dict.blogPage.postCta.title}
        ctaSub={dict.blogPage.postCta.sub}
        ctaButton={dict.blogPage.postCta.button}
      />
    </>
  );
}
