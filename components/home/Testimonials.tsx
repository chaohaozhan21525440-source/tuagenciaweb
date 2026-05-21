"use client";

import { motion } from "framer-motion";
import type { Dict } from "@/lib/i18n";

const GoogleG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0 0 12 23Z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.35-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.94l3.66-2.84Z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
    />
  </svg>
);

const Star = ({ filled }: { filled: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#FBBC05" : "none"} stroke={filled ? "#FBBC05" : "#cbd5e1"} strokeWidth="1.5" strokeLinejoin="round" aria-hidden>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ArrowOut = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

export function Testimonials({ dict }: { dict: Dict["testimonials"] }) {
  return (
    <section className="tm-section" aria-labelledby="tm-heading">
      <div className="tm-container">
        <motion.div
          className="tm-head"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="tm-pill">
            <GoogleG /> {dict.pill}
          </span>
          <h2 id="tm-heading" className="tm-h2">
            {dict.h2Top}{" "}
            <span className="tm-accent">{dict.h2Accent}</span>
          </h2>
          <p className="tm-sub">{dict.sub}</p>
        </motion.div>

        <div className="tm-grid">
          {dict.items.map((it, i) => (
            <motion.article
              key={it.author}
              className="tm-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <div className="tm-quote-mark" aria-hidden>&ldquo;</div>
              <div className="tm-stars" aria-label={`${it.rating} de 5 estrellas`}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} filled={idx < it.rating} />
                ))}
              </div>
              <p className="tm-text">{it.text}</p>
              <footer className="tm-footer">
                <div className={`tm-avatar avatar-${it.avatarColor}`} aria-hidden>
                  {it.author.charAt(0)}
                </div>
                <div className="tm-meta">
                  <div className="tm-author">{it.author}</div>
                  <div className="tm-source">
                    <GoogleG /> Google
                  </div>
                </div>
              </footer>
            </motion.article>
          ))}
        </div>

        <a
          href={dict.googleHref}
          target="_blank"
          rel="noopener noreferrer"
          className="tm-google-link"
        >
          {dict.googleLink}
          <ArrowOut />
        </a>
      </div>
    </section>
  );
}
