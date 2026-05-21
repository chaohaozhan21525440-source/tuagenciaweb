"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Dict } from "@/lib/i18n";
import { PROJECTS } from "@/lib/portfolio";

type Examples = Dict["servicesDetail"][keyof Dict["servicesDetail"]]["examples"];

const ArrowOut = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

export function ServiceExamples({
  data,
  viewProjectLabel,
}: {
  data: Examples;
  viewProjectLabel: string;
}) {
  const projects = data.projectSlugs
    .map((slug) => PROJECTS.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (projects.length === 0) return null;

  return (
    <section className="sd-examples">
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

        <div className="sd-examples-grid">
          {projects.map((p, i) => (
            <motion.article
              key={p.slug}
              className="sd-example-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <div className="sd-example-thumb">
                {p.image && (
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={1200}
                    height={750}
                    className="sd-example-img"
                  />
                )}
              </div>
              <div className="sd-example-body">
                <h3>{p.name}</h3>
                <span className="sd-example-meta">{p.sector.toUpperCase()} · {p.year}</span>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sd-example-link"
                  >
                    {viewProjectLabel}
                    <ArrowOut />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
