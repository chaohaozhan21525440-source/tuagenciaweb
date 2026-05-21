"use client";

import { motion } from "framer-motion";
import type { Dict } from "@/lib/i18n";

type Included = Dict["servicesDetail"][keyof Dict["servicesDetail"]]["included"];

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="5 12 10 17 19 7" />
  </svg>
);

export function ServiceIncluded({ data }: { data: Included }) {
  return (
    <section className="sd-included">
      <div className="sd-container">
        <motion.div
          className="sd-section-head"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="sd-eyebrow">{data.eyebrow}</span>
          <h2 className="sd-h2">{data.h2}</h2>
          <p className="sd-body">{data.sub}</p>
        </motion.div>

        <div className="sd-included-grid">
          {data.items.map((item, i) => (
            <motion.article
              key={item.title}
              className="sd-included-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <span className="sd-included-check"><Check /></span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
