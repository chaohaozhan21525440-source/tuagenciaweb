"use client";

import type { Dict } from "@/lib/i18n";

type Partner = { name: string; cls: string };

const PARTNERS: Partner[] = [
  { name: "WordPress",          cls: "pa-wordpress" },
  { name: "Shopify",            cls: "pa-shopify" },
  { name: "WooCommerce",        cls: "pa-woo" },
  { name: "Webflow",            cls: "pa-webflow" },
  { name: "Framer",             cls: "pa-framer" },
  { name: "Stripe",             cls: "pa-stripe" },
  { name: "Vercel",             cls: "pa-vercel" },
  { name: "Cloudflare",         cls: "pa-cloudflare" },
  { name: "Google Analytics",   cls: "pa-ga" },
  { name: "Search Console",     cls: "pa-gsc" },
  { name: "Meta",               cls: "pa-meta" },
  { name: "TikTok",             cls: "pa-tiktok" },
  { name: "HubSpot",            cls: "pa-hubspot" },
  { name: "Notion",             cls: "pa-notion" },
  { name: "Figma",              cls: "pa-figma" },
  { name: "Mailchimp",          cls: "pa-mailchimp" },
];

const ArrowDown = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);

export function Partners({ dict }: { dict: Dict["partners"] }) {
  const loop = [...PARTNERS, ...PARTNERS];
  return (
    <section id="partners" className="partners-section">
      <div className="container-pa">
        <header className="head">
          <h2>{dict.title}</h2>
          <a className="arrow-btn" href="#faq" aria-label={dict.scrollLabel}>
            <ArrowDown />
          </a>
          {dict.tagline && <p className="tagline">{dict.tagline}</p>}
        </header>

        <div className="marquee">
          <ul className="track" aria-label={dict.title}>
            {loop.map((p, i) => (
              <li
                key={`${p.cls}-${i}`}
                className={`logo ${p.cls}`}
                aria-hidden={i >= PARTNERS.length}
              >
                {p.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
