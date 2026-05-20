"use client";

import { motion } from "framer-motion";
import type { Dict } from "@/lib/i18n";
import { ICONS } from "./marketing-icons";

export function MarketingGrid({ dict }: { dict: Dict["servicesPage"]["marketing"] }) {
  return (
    <section className="sr-mk">
      <div className="sr-container">
        <motion.div
          className="sr-mk-head"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="sr-pill"><span className="dot" /> {dict.eyebrow}</span>
          <h2 className="sr-section-title">{dict.h2}</h2>
          <p className="sr-section-sub">{dict.sub}</p>
        </motion.div>

        <div className="sr-mk-grid">
          {dict.items.map((it, i) => (
            <motion.article
              key={it.title}
              className="sr-mk-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <span className="sr-mk-icon">{ICONS[it.icon] ?? ICONS.target}</span>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
