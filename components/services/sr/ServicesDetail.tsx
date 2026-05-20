"use client";

import { motion } from "framer-motion";
import type { Dict } from "@/lib/i18n";

const Check = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="5 12 10 17 19 7" />
  </svg>
);

export function ServicesDetail({ dict }: { dict: Dict["servicesPage"]["detail"] }) {
  return (
    <section className="sr-detail-wrap">
      <div className="sr-container">
        {dict.items.map((item, idx) => (
          <motion.article
            key={item.id}
            id={item.id}
            className="sr-detail"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1], delay: idx * 0.05 }}
          >
            <span className="sr-detail-ghost" aria-hidden>{item.num}</span>
            <div className="sr-detail-body">
              <span className="sr-detail-eyebrow">{item.eyebrow}</span>
              <h2 className="sr-detail-title">{item.title}</h2>
              <p className="sr-detail-lead">{item.lead}</p>
              <ul className="sr-detail-bullets">
                {item.bullets.map((b) => (
                  <li key={b}><span className="sr-detail-check"><Check /></span>{b}</li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
