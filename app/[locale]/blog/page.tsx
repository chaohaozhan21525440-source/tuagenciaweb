import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { listPosts, type Locale, type PostMeta } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { FadeUp } from "@/components/motion/FadeUp";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog.hero" });
  return buildMetadata({
    locale: locale as "es" | "en",
    path: "/blog",
    title: `${t("title")} · Tuagenciaweb`,
    description: t("subtitle"),
  });
}

function PostCard({ post, featured = false, locale }: { post: PostMeta; featured?: boolean; locale: Locale }) {
  return (
    <Link
      href={{ pathname: "/blog/[slug]", params: { slug: post.slug } } as never}
      className={`group block overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-default)] bg-[var(--color-elevated)] transition-all hover:-translate-y-1 ${featured ? "md:flex md:items-stretch" : ""}`}
    >
      <div className={`overflow-hidden bg-[var(--color-divider)] ${featured ? "md:w-1/2" : "aspect-[16/10]"}`}>
        <Image
          src={post.cover ?? `https://picsum.photos/seed/${post.slug}/1200/750`}
          alt={post.title}
          width={1200}
          height={750}
          unoptimized
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className={`flex flex-col gap-3 p-6 ${featured ? "md:w-1/2 md:justify-center md:p-10" : ""}`}>
        <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">{new Date(post.date).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}</p>
        <h2 className={`font-display font-semibold ${featured ? "text-3xl md:text-4xl" : "text-xl"}`}>{post.title}</h2>
        <p className="text-sm text-[var(--color-text-body)]">{post.description}</p>
      </div>
    </Link>
  );
}

export default async function BlogIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tHero = await getTranslations("blog.hero");
  const posts = await listPosts(locale as Locale);
  const [featured, ...rest] = posts;

  return (
    <main>
      <section className="container-page pt-16 md:pt-24">
        <FadeUp className="max-w-3xl">
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tighter md:text-6xl">{tHero("title")}</h1>
          <p className="mt-5 text-base text-[var(--color-text-body)] md:text-lg">{tHero("subtitle")}</p>
        </FadeUp>
      </section>

      <section className="py-12 md:py-20">
        <div className="container-page space-y-10">
          {featured && (
            <FadeUp>
              <PostCard post={featured} featured locale={locale as Locale} />
            </FadeUp>
          )}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              {rest.map((p, i) => (
                <FadeUp key={p.slug} delay={i * 0.05}>
                  <PostCard post={p} locale={locale as Locale} />
                </FadeUp>
              ))}
            </div>
          )}
          {posts.length === 0 && <p className="text-[var(--color-text-muted)]">—</p>}
        </div>
      </section>
    </main>
  );
}
