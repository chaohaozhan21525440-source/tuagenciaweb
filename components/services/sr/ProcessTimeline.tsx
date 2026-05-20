"use client";

import { motion } from "framer-motion";
import type { Dict } from "@/lib/i18n";

export function ProcessTimeline({ dict }: { dict: Dict["servicesPage"]["process"] }) {
  return (
    <section className="sr-process">
      <div className="sr-container">
        <motion.div
          className="sr-process-head"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="sr-pill"><span className="dot" /> {dict.eyebrow}</span>
          <h2 className="sr-section-title">{dict.h2}</h2>
          <p className="sr-section-sub">{dict.sub}</p>
        </motion.div>

        <div className="sr-timeline" role="list">
          <div className="sr-timeline-line" aria-hidden />
          {dict.steps.map((s, i) => (
            <motion.div
              key={s.num}
              className="sr-step"
              role="listitem"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1], delay: i * 0.08 }}
            >
              <div className="sr-step-dot" aria-hidden />
              <div className="sr-step-num">{s.num}</div>
              <div className="sr-step-title">{s.title}</div>
              <div className="sr-step-desc">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
