"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Dict, Locale } from "@/lib/i18n";
import { path, sectionPath } from "@/lib/i18n";
import { ServicesNav } from "./ServicesNav";

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function ServicesHero({
  dict,
  locale,
}: {
  dict: Dict["servicesPage"]["hero"];
  locale: Locale;
}) {
  return (
    <section className="sr-hero">
      <div className="sr-container">
        <motion.div
          className="sr-hero-grid"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <div className="sr-hero-left">
            <span className="sr-pill"><span className="dot" /> {dict.badge}</span>
            <h1 className="sr-h1">
              {dict.h1Top}{" "}
              <span className="sr-accent">{dict.h1Accent}</span>
            </h1>
            <p className="sr-lead">{dict.sub}</p>
            <div className="sr-cta-row">
              <Link href={path("contact", locale)} className="sr-btn sr-btn-primary">
                {dict.ctaPrimary}
                <ArrowRight />
              </Link>
              <Link
                href={sectionPath("home", locale, "projects")}
                className="sr-btn sr-btn-ghost"
              >
                {dict.ctaSecondary}
              </Link>
            </div>
            <ul className="sr-trust">
              {dict.trustPills.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <ServicesNav label={dict.navLabel} items={dict.navItems} locale={locale} />
        </motion.div>
      </div>
    </section>
  );
}
