import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { getDict } from "@/lib/i18n";

const dict = getDict("en");

export function generateStaticParams() {
  return dict.blogPage.articles.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = dict.blogPage.articles.find((a) => a.slug === slug);
  if (!article) return {};
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
      locale: "en_US",
      type: "article",
      images: article.cover ? [article.cover] : undefined,
    },
  };
}

export default async function BlogPostEn({ params }: Props) {
  const { slug } = await params;
  const article = dict.blogPage.articles.find((a) => a.slug === slug);
  if (!article) notFound();
  return (
    <BlogPostContent
      article={article}
      locale="en"
      backLabel={dict.blogPage.backToBlog}
      ctaTitle={dict.blogPage.postCta.title}
      ctaSub={dict.blogPage.postCta.sub}
      ctaButton={dict.blogPage.postCta.button}
    />
  );
}
