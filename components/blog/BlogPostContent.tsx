import Image from "next/image";
import Link from "next/link";
import type { Dict, Locale } from "@/lib/i18n";
import { path } from "@/lib/i18n";

type Article = Dict["blogPage"]["articles"][number];

const ArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export function BlogPostContent({
  article,
  locale,
  backLabel,
  ctaTitle,
  ctaSub,
  ctaButton,
}: {
  article: Article;
  locale: Locale;
  backLabel: string;
  ctaTitle: string;
  ctaSub: string;
  ctaButton: string;
}) {
  return (
    <main className="blog-post">
      <div className="container-bp">
        <Link href={path("blog", locale)} className="bp-back">
          <ArrowLeft />
          {backLabel}
        </Link>

        <header className="bp-post-head">
          <div className="bp-meta">
            <span className="bp-cat">{article.category}</span>
            <span className="bp-dot" aria-hidden>·</span>
            <span className="bp-date">{article.date}</span>
          </div>
          <h1 className="bp-post-title">{article.title}</h1>
          <p className="bp-post-excerpt">{article.excerpt}</p>
        </header>

        {article.cover && (
          <div className="bp-cover">
            <Image
              src={article.cover}
              alt={article.title}
              width={1200}
              height={630}
              className="bp-cover-img"
              priority
            />
          </div>
        )}

        <article className="bp-body-content">
          {article.content.map((block, i) => {
            switch (block.type) {
              case "p":
                return <p key={i}>{block.text}</p>;
              case "h2":
                return <h2 key={i}>{block.text}</h2>;
              case "h3":
                return <h3 key={i}>{block.text}</h3>;
              case "ul":
                return (
                  <ul key={i}>
                    {block.items.map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ul>
                );
              case "ol":
                return (
                  <ol key={i}>
                    {block.items.map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ol>
                );
              case "quote":
                return (
                  <blockquote key={i}>
                    <p>{block.text}</p>
                    {block.cite && <cite>{block.cite}</cite>}
                  </blockquote>
                );
            }
          })}
        </article>

        <aside className="bp-post-cta">
          <h2>{ctaTitle}</h2>
          <p>{ctaSub}</p>
          <Link href={path("contact", locale)} className="bp-post-cta-btn">
            {ctaButton}
          </Link>
        </aside>
      </div>
    </main>
  );
}
