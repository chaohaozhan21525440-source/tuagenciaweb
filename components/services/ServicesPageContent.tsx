import Link from "next/link";
import { Services } from "@/components/home/Services";
import type { Dict, Locale } from "@/lib/i18n";
import { path } from "@/lib/i18n";

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const Check = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="5 12 10 17 19 7" />
  </svg>
);

export function ServicesPageContent({
  dict,
  servicesDict,
  locale,
}: {
  dict: Dict["servicesPage"];
  servicesDict: Dict["services"];
  locale: Locale;
}) {
  return (
    <main className="services-page">
      <section className="sp-hero">
        <div className="container-sp">
          <span className="pill">
            <span className="dot" /> {dict.pill}
          </span>
          <h1 className="headline">{dict.h1}</h1>
          <p className="lede">{dict.sub}</p>
        </div>
      </section>

      <Services dict={servicesDict} locale={locale} />

      <section className="sp-details">
        <div className="container-sp">
          <div className="head">
            <span className="pill">
              <span className="dot" /> {dict.detailsPill}
            </span>
            <h2>{dict.detailsH2}</h2>
            <p>{dict.detailsSub}</p>
          </div>

          <div className="dt-list">
            {dict.details.map((d, i) => (
              <article
                key={d.number}
                className={`dt-row accent-${d.accent}${i % 2 === 1 ? " reverse" : ""}`}
              >
                <div className="dt-copy">
                  <div className="dt-eyebrow">
                    <span className="dt-number">{d.number}</span>
                    <span className="dt-tag">{d.eyebrow}</span>
                  </div>
                  <h3 className="dt-title">{d.title}</h3>
                  <p className="dt-lead">{d.lead}</p>
                  <ul className="dt-bullets">
                    {d.bullets.map((b) => (
                      <li key={b}>
                        <span className="dt-check"><Check /></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="dt-visual" aria-hidden>
                  <div className="dt-card">
                    <span className="dt-card-number">{d.number}</span>
                    <span className="dt-card-label">{d.eyebrow}</span>
                    <div className="dt-card-title">{d.title}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-marketing">
        <div className="container-sp">
          <div className="head">
            <span className="pill">
              <span className="dot" /> {dict.marketing.pill}
            </span>
            <h2>{dict.marketing.h2}</h2>
            <p>{dict.marketing.sub}</p>
          </div>
          <div className="mk-grid">
            {dict.marketing.items.map((it) => (
              <article key={it.title} className="mk-card">
                <h3>{it.title}</h3>
                <p>{it.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-cta">
        <div className="container-sp">
          <div className="cta-card">
            <span className="cta-eyebrow">{dict.cta.eyebrow}</span>
            <h2>{dict.cta.h2}</h2>
            <p>{dict.cta.sub}</p>
            <Link href={path("contact", locale)} className="cta-btn">
              {dict.cta.button}
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
