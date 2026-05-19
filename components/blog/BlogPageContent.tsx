import type { Dict } from "@/lib/i18n";

type Theme = "blue" | "green" | "purple" | "orange" | "graphite";

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function ArticleMockup({ theme, title }: { theme: Theme; title: string }) {
  return (
    <div className={`bp-mockup theme-${theme}`} aria-hidden>
      <div className="chrome"><i /><i /><i /></div>
      <div className="stage">
        <span className="bp-mockup-title">{title}</span>
      </div>
    </div>
  );
}

export function BlogPageContent({
  dict,
  readMoreLabel,
}: {
  dict: Dict["blogPage"];
  readMoreLabel: string;
}) {
  return (
    <main className="blog-page">
      <section className="bp-hero">
        <div className="container-bp">
          <span className="pill">
            <span className="dot" /> {dict.pill}
          </span>
          <h1 className="headline">{dict.h1}</h1>
          <p className="lede">{dict.sub}</p>
        </div>
      </section>

      <section className="bp-grid-section">
        <div className="container-bp">
          <div className="bp-grid">
            {dict.articles.map((a) => (
              <article key={a.slug} className="bp-card">
                <ArticleMockup theme={a.theme as Theme} title={a.title} />
                <div className="bp-body">
                  <div className="bp-meta">
                    <span className="bp-cat">{a.category}</span>
                    <span className="bp-dot" aria-hidden>·</span>
                    <span className="bp-date">{a.date}</span>
                  </div>
                  <h2 className="bp-title">{a.title}</h2>
                  <p className="bp-excerpt">{a.excerpt}</p>
                  <a className="bp-read" href={`#${a.slug}`}>
                    {readMoreLabel}
                    <ArrowRight />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
