"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Dict, Locale } from "@/lib/i18n";
import { path } from "@/lib/i18n";

type CtaData = Dict["servicesDetail"][keyof Dict["servicesDetail"]]["cta"];

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.5 3.5A11 11 0 0 0 3 17l-1 5 5-1a11 11 0 0 0 16.4-9.4 11 11 0 0 0-2.9-8.1Zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-3 .6.6-3-.2-.3A9 9 0 1 1 12 20.5Zm5-6.7c-.3-.2-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1l-.9 1c-.1.2-.3.2-.5.1a7 7 0 0 1-3.6-3.2c-.1-.2 0-.4.1-.5l.4-.5.2-.3v-.4l-.9-2c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.8.4 3 3 0 0 0-1 2.2c0 1.3 1 2.5 1.1 2.7.1.2 1.9 2.9 4.6 4.1a16 16 0 0 0 1.5.6c.6.2 1.2.2 1.7.1.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
  </svg>
);

const WA_HREF =
  "https://wa.me/34613654273?text=Hola%2C%20me%20interesa%20un%20presupuesto%20para%20mi%20web.";

export function ServiceCta({
  data,
  locale,
}: {
  data: CtaData;
  locale: Locale;
}) {
  return (
    <section className="sd-cta-section">
      <div className="sd-container">
        <motion.div
          className="sd-cta-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="sd-cta-eyebrow">{data.eyebrow}</span>
          <h2 className="sd-cta-h2">{data.h2}</h2>
          <p className="sd-cta-sub">{data.sub}</p>
          <div className="sd-cta-actions">
            <Link href={path("contact", locale)} className="sd-cta-btn primary">
              {data.primary}
            </Link>
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="sd-cta-btn ghost"
            >
              <WhatsAppIcon />
              {data.secondary}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
