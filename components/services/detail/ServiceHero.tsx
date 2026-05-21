"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Dict, Locale } from "@/lib/i18n";
import { path } from "@/lib/i18n";

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const Slash = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <path d="M14 6 6 18" />
  </svg>
);

type Service = Dict["servicesDetail"][keyof Dict["servicesDetail"]];

export function ServiceHero({
  service,
  locale,
  hubLabel,
}: {
  service: Service;
  locale: Locale;
  hubLabel: string;
}) {
  const hasImage = Boolean(service.hero.heroImage);

  if (hasImage) {
    return (
      <section className="sd-hero sd-hero-image">
        <div className="sd-container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <nav className="sd-breadcrumb" aria-label="Breadcrumb">
              <Link href={path("services", locale)}>{hubLabel}</Link>
              <Slash />
              <span aria-current="page">{service.hero.h1Top}</span>
            </nav>

            <h1 className="sr-only">
              {service.hero.h1Top} {service.hero.h1Accent}
            </h1>

            <figure className="sd-hero-figure">
              <Image
                src={service.hero.heroImage}
                alt={`${service.hero.h1Top} — ${service.hero.h1Accent}`}
                width={1080}
                height={1080}
                className="sd-hero-img"
                priority
              />
            </figure>

            <div className="sd-cta-row sd-cta-row-centered">
              <Link href={path("contact", locale)} className="sr-btn sr-btn-primary">
                {service.hero.ctaPrimary}
                <ArrowRight />
              </Link>
              <Link href={path("services", locale)} className="sr-btn sr-btn-ghost">
                {service.hero.ctaSecondary}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="sd-hero">
      <div className="sd-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <nav className="sd-breadcrumb" aria-label="Breadcrumb">
            <Link href={path("services", locale)}>{hubLabel}</Link>
            <Slash />
            <span aria-current="page">{service.hero.h1Top}</span>
          </nav>

          <span className="sr-pill"><span className="dot" /> {service.hero.eyebrow}</span>

          <h1 className="sd-h1">
            {service.hero.h1Top}{" "}
            <span className="sr-accent">{service.hero.h1Accent}</span>
          </h1>

          <p className="sd-lead">{service.hero.sub}</p>

          <div className="sd-cta-row">
            <Link href={path("contact", locale)} className="sr-btn sr-btn-primary">
              {service.hero.ctaPrimary}
              <ArrowRight />
            </Link>
            <Link href={path("services", locale)} className="sr-btn sr-btn-ghost">
              {service.hero.ctaSecondary}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
