"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Dict } from "@/lib/i18n";

const Plus = ({ open }: { open: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    aria-hidden
    style={{
      transform: `rotate(${open ? 45 : 0}deg)`,
      transition: "transform 0.32s cubic-bezier(0.2, 0.7, 0.2, 1)",
    }}
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export function ServicesFaq({ dict }: { dict: Dict["servicesPage"]["faq"] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="sr-faq">
      <div className="sr-container">
        <motion.div
          className="sr-faq-head"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="sr-pill"><span className="dot" /> {dict.eyebrow}</span>
          <h2 className="sr-section-title">{dict.h2}</h2>
          <p className="sr-section-sub">{dict.sub}</p>
        </motion.div>

        <ul className="sr-faq-list" role="list">
          {dict.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className={isOpen ? "open" : ""}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <Plus open={isOpen} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.2, 0.7, 0.2, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="sr-faq-answer">{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
