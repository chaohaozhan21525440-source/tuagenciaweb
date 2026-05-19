"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { PROJECTS, type MockupTheme, type Project } from "@/lib/portfolio";
import type { Dict } from "@/lib/i18n";

const AUTOPLAY_MS = 3800;
const TRANSITION_MS = 700;
const CLONE_COUNT = 3;

const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
);
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

const MOCKUP_COPY: Record<MockupTheme, { eyebrow: string; wordmark: string; tagline: string; chromeLight?: boolean }> = {
  red:      { eyebrow: "Trattoria · Bistrot · Pizzeria", wordmark: "Big Mamma", tagline: "Una experiencia italiana, ruidosa y honesta." },
  green:    { eyebrow: "Dumpling House", wordmark: "Lady Dumpling", tagline: "Dim sum y bao en la barra." },
  gold:     { eyebrow: "Hotel & Restaurant", wordmark: "NOBU", tagline: "Barcelona" },
  graphite: { eyebrow: "Bjarke Ingels Group", wordmark: "BIG.", tagline: "Architecture · Engineering · Product Design", chromeLight: true },
  blue:     { eyebrow: "Sonrisas que se cuidan", wordmark: "Dental Clinic", tagline: "Tu clínica dental cerca de ti.", chromeLight: true },
};

function ConceptualMockup({ theme }: { theme: MockupTheme }) {
  const copy = MOCKUP_COPY[theme];
  return (
    <div className={`mockup themed theme-${theme}`} aria-hidden>
      <div className={`chrome${copy.chromeLight ? " light" : ""}`}>
        <i /><i /><i />
      </div>
      <div className="stage">
        <div className="eyebrow">{copy.eyebrow}</div>
        <p className="wordmark">{copy.wordmark}</p>
        <div className="tagline">{copy.tagline}</div>
      </div>
    </div>
  );
}

function ProjectCard({ p, dict }: { p: Project; dict: Dict["projects"] }) {
  const sector = dict.sectors[p.sector];

  return (
    <div className="card">
      {p.image ? (
        <div className="mockup">
          <Image
            src={p.image}
            alt={p.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      ) : p.theme ? (
        <ConceptualMockup theme={p.theme} />
      ) : (
        <div className="mockup" />
      )}

      {p.conceptual && (
        <span className="conceptual-pill">
          <span className="dot" />
          {dict.conceptualTag}
        </span>
      )}

      <div className="card-body">
        <h3>{p.name}</h3>
        <div className="meta">{sector} · {p.year}</div>

        {p.inspiredBy && (
          <div className="inspired">
            {dict.inspiredBy}:{" "}
            <a href={p.inspiredBy.url} target="_blank" rel="noopener noreferrer">
              {p.inspiredBy.brand}
            </a>
          </div>
        )}

        {p.url ? (
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="view">
            {dict.viewProject}
            <ExternalIcon />
          </a>
        ) : (
          <span className="view is-disabled" aria-disabled>
            {dict.viewProject}
            <ExternalIcon />
          </span>
        )}
      </div>
    </div>
  );
}

export function Projects({ dict }: { dict: Dict["projects"] }) {
  const items = PROJECTS;
  const N = items.length;
  const list = [...items, ...items.slice(0, CLONE_COUNT)];

  const [idx, setIdx] = useState(0);
  const [noAnim, setNoAnim] = useState(false);
  const pausedRef = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      setIdx((i) => i + 1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (idx < N) return;
    const t = window.setTimeout(() => {
      setNoAnim(true);
      setIdx(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setNoAnim(false));
      });
    }, TRANSITION_MS);
    return () => window.clearTimeout(t);
  }, [idx, N]);

  const goNext = useCallback(() => setIdx((i) => i + 1), []);
  const goPrev = useCallback(() => {
    setIdx((i) => (i <= 0 ? N - 1 : i - 1));
  }, [N]);
  const goTo = useCallback((j: number) => setIdx(j), []);

  const activeDot = ((idx % N) + N) % N;

  return (
    <section id="proyectos" className="proyectos-section">
      <div className="container-p">
        <div className="section-head">
          <span className="badge">
            <span className="dot" /> {dict.pill}
          </span>
          <h2 className="section-title">{dict.h2}</h2>
          <p className="section-sub">{dict.sub}</p>
        </div>

        <div
          className="carousel"
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
          onFocus={() => { pausedRef.current = true; }}
          onBlur={() => { pausedRef.current = false; }}
        >
          <button
            type="button"
            className="arrow prev"
            aria-label={dict.prev}
            onClick={goPrev}
          >
            <ArrowLeft />
          </button>

          <div className="viewport">
            <div
              ref={trackRef}
              className={`track${noAnim ? " no-anim" : ""}`}
              style={{ ["--idx" as never]: String(idx) } as React.CSSProperties}
            >
              {list.map((p, i) => (
                <div key={`${p.slug}-${i}`} className="slot" data-pos={i - idx}>
                  <ProjectCard p={p} dict={dict} />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="arrow next"
            aria-label={dict.next}
            onClick={goNext}
          >
            <ArrowRight />
          </button>

          <div className="dots" role="tablist" aria-label={dict.goToSlide}>
            {items.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                role="tab"
                aria-selected={i === activeDot}
                aria-label={`${dict.goToSlide} ${i + 1}`}
                className={i === activeDot ? "active" : ""}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>

        <p className="legal">{dict.legal}</p>
      </div>
    </section>
  );
}
