"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactElement } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { servicePath, type ServiceId } from "@/lib/services";

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const PencilIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 21c2 0 4-1 5-3l9-9-3-3-9 9c-2 1-3 3-3 6Z" />
    <path d="M14 6l4 4" />
    <path d="M17 3l4 4-3 3-4-4Z" />
  </svg>
);
const BagIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 7h14l-1.2 12.2A2 2 0 0 1 15.8 21H8.2a2 2 0 0 1-2-1.8L5 7Z" />
    <path d="M9 7V5a3 3 0 0 1 6 0v2" />
  </svg>
);
const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const ICONS: Record<ServiceId, () => ReactElement> = {
  design: PencilIcon,
  shop: BagIcon,
  seo: SearchIcon,
};

export function HubCards({
  dict,
  locale,
}: {
  dict: Dict["servicesPage"]["hubCards"];
  locale: Locale;
}) {
  return (
    <section className="hub-cards-section">
      <div className="sr-container">
        <motion.div
          className="hub-cards-head"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="sr-pill"><span className="dot" /> {dict.eyebrow}</span>
          <h2 className="sr-section-title">{dict.h2}</h2>
          <p className="sr-section-sub">{dict.sub}</p>
        </motion.div>

        <div className="hub-cards-grid">
          {dict.items.map((item, i) => {
            const id = item.id as ServiceId;
            const Icon = ICONS[id];
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <Link href={servicePath(id, locale)} className="hub-card">
                  <span className="hub-card-icon"><Icon /></span>
                  <span className="hub-card-eyebrow">{item.eyebrow}</span>
                  <h3 className="hub-card-title">{item.title}</h3>
                  <p className="hub-card-blurb">{item.blurb}</p>
                  <span className="hub-card-arrow">
                    <ArrowRight />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
