"use client";

import { motion } from "framer-motion";
import type { Dict } from "@/lib/i18n";

type Process = Dict["servicesDetail"][keyof Dict["servicesDetail"]]["process"];

export function ServiceProcess({ data }: { data: Process }) {
  return (
    <section className="sd-process">
      <div className="sd-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="sd-eyebrow">{data.eyebrow}</span>
          <h2 className="sd-h2">{data.h2}</h2>
        </motion.div>

        <ol className="sd-process-list">
          {data.steps.map((step, i) => (
            <motion.li
              key={step.num}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <span className="sd-process-num">{step.num}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
