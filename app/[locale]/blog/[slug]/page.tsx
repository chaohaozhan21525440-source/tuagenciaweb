import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { getPost, listPosts, readingTime, type Locale } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogPostLd } from "@/lib/jsonld";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = await getPost(locale as Locale, slug);
  if (!post) return {};
  return buildMetadata({
    locale: locale as "es" | "en",
    path: `/blog/${slug}`,
    title: `${post.title} · Tuagenciaweb`,
    description: post.description,
    image: post.cover ?? undefined,
  });
}

export async function generateStaticParams() {
  const all = await Promise.all((["es", "en"] as Locale[]).map(async (l) => (await listPosts(l)).map((p) => ({ locale: l, slug: p.slug }))));
  return all.flat();
}

export default async function PostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await getPost(locale as Locale, slug);
  if (!post) notFound();
  const t = await getTranslations("blog");

  const mins = readingTime(post.content);

  return (
    <main className="container-page max-w-3xl py-16 md:py-24">
      <JsonLd data={blogPostLd({ title: post.title, description: post.description, date: post.date, slug, cover: post.cover, locale: locale as "es" | "en" })} />
      <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">{post.tags.join(" · ")}</p>
      <h1 className="mt-3 font-display text-4xl font-bold leading-[1.1] tracking-tighter md:text-5xl">{post.title}</h1>
      <p className="mt-4 text-sm text-[var(--color-text-muted)]">
        {new Date(post.date).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}
        {" · "}
        {t("readingTime", { minutes: mins })}
      </p>

      {post.cover && (
        <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-default)]">
          <Image src={post.cover} alt={post.title} width={1200} height={750} unoptimized className="h-auto w-full" />
        </div>
      )}

      <article className="prose prose-slate mt-10 max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-[var(--color-accent)]">
        <MDXRemote source={post.content} />
      </article>

      <div className="mt-16 rounded-[var(--radius-card)] border border-[var(--color-border-default)] bg-[var(--color-elevated)] p-8 md:p-10">
        <h2 className="font-display text-2xl font-bold">{t("ctaTitle")}</h2>
        <p className="mt-2 text-[var(--color-text-body)]">{t("ctaBody")}</p>
        <Button asChild className="mt-6"><Link href="/contacto">{t("ctaButton")}</Link></Button>
      </div>
    </main>
  );
}
