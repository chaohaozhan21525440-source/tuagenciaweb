"use client";

import { motion } from "framer-motion";
import type { Dict } from "@/lib/i18n";

const Check = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="5 12 10 17 19 7" />
  </svg>
);

const Cross = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export function ComparisonTable({ dict }: { dict: Dict["servicesPage"]["comparison"] }) {
  return (
    <section className="sr-compare">
      <div className="sr-container">
        <motion.div
          className="sr-compare-head"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <h2 className="sr-section-title">
            {dict.h2Top}{" "}<span className="sr-accent">{dict.h2Accent}</span>
          </h2>
          <p className="sr-section-sub">{dict.sub}</p>
        </motion.div>

        <motion.div
          className="sr-compare-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <div className="sr-compare-col sr-compare-others">
            <span className="sr-compare-eyebrow muted">{dict.others.eyebrow}</span>
            <ul>
              {dict.others.items.map((it, i) => (
                <motion.li
                  key={it}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <span className="sr-compare-icon cross"><Cross /></span>
                  {it}
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="sr-compare-divider" aria-hidden />
          <div className="sr-compare-col sr-compare-us">
            <span className="sr-compare-eyebrow brand">{dict.us.eyebrow}</span>
            <ul>
              {dict.us.items.map((it, i) => (
                <motion.li
                  key={it}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <span className="sr-compare-icon check"><Check /></span>
                  {it}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
