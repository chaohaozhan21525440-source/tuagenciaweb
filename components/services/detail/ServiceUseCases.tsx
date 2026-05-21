"use client";

import { motion } from "framer-motion";
import type { Dict } from "@/lib/i18n";

type UseCases = Dict["servicesDetail"][keyof Dict["servicesDetail"]]["useCases"];

export function ServiceUseCases({ data }: { data: UseCases }) {
  return (
    <section className="sd-usecases">
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

        <div className="sd-usecases-grid">
          {data.items.map((item, i) => (
            <motion.article
              key={item.title}
              className="sd-usecase-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 2) * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <div className="sd-usecase-quote">&ldquo;</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
