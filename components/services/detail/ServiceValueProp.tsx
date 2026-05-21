"use client";

import { motion } from "framer-motion";
import type { Dict } from "@/lib/i18n";

type ValueProp = Dict["servicesDetail"][keyof Dict["servicesDetail"]]["valueProp"];

export function ServiceValueProp({ data }: { data: ValueProp }) {
  return (
    <section className="sd-vp">
      <div className="sd-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="sd-eyebrow">{data.eyebrow}</span>
          <h2 className="sd-h2">{data.h2}</h2>
          <p className="sd-body">{data.body}</p>
        </motion.div>
      </div>
    </section>
  );
}
