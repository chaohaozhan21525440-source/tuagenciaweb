"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { path, sectionPath } from "@/lib/i18n";
import type { Dict } from "@/lib/i18n";

/* ────────────────────────────────────────────────────────────────────────────
   Hero — implemented literally from the Claude Design "Hero.html" bundle.
   ──────────────────────────────────────────────────────────────────────────── */

const CARDS = [
  { id: "solicitudes", showAt: 0.75, hideAt: 4.55 },
  { id: "pagespeed", showAt: 1.05, hideAt: 4.55 },
  { id: "leads", showAt: 1.35, hideAt: 4.55 },
] as const;

type CardId = (typeof CARDS)[number]["id"];

function CardSolicitudes({ d }: { d: Dict["hero"]["cards"]["solicitudes"] }) {
  return (
    <>
      <div className="cs-row">
        <div>
          <div className="cs-big">{d.big}</div>
          <div className="cs-sub">{d.sub}</div>
        </div>
        <span className="cs-badge">{d.badge}</span>
      </div>
      <svg className="cs-chart" viewBox="0 0 200 30" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id="csGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16a34a" stopOpacity=".35" />
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M2 24 L30 20 L55 22 L85 14 L115 16 L145 8 L175 10 L198 3 L198 30 L2 30 Z" fill="url(#csGrad)" />
        <path d="M2 24 L30 20 L55 22 L85 14 L115 16 L145 8 L175 10 L198 3" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );
}

function CardPagespeed({ d }: { d: Dict["hero"]["cards"]["pagespeed"] }) {
  return (
    <>
      <div className="ps-gauge">
        <svg viewBox="0 0 100 100">
          <circle className="track" cx="50" cy="50" r="42" fill="none" strokeWidth="8" />
          <circle className="meter" cx="50" cy="50" r="42" fill="none" strokeWidth="8" strokeLinecap="round" strokeDasharray="263.9" strokeDashoffset="13.2" />
        </svg>
        <div className="ps-num">{d.num}</div>
      </div>
      <div className="ps-title">{d.title}</div>
      <div className="ps-sub">{d.sub}</div>
    </>
  );
}

function CardLeads({ d }: { d: Dict["hero"]["cards"]["leads"] }) {
  return (
    <>
      <div className="cl-row">
        <div className="cl-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="12" width="3.5" height="8" rx="1" fill="currentColor" />
            <rect x="10.25" y="7" width="3.5" height="13" rx="1" fill="currentColor" />
            <rect x="16.5" y="4" width="3.5" height="16" rx="1" fill="currentColor" />
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div className="cl-big">{d.big}</div>
          <div className="cl-sub">
            {d.sub}
            <br />
            {d.sub2}
          </div>
        </div>
      </div>
      <svg className="cl-chart" viewBox="0 0 280 26" preserveAspectRatio="none" fill="none">
        <path d="M2 22 L40 19 L80 21 L120 14 L160 16 L200 9 L240 11 L278 3" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );
}

export function Hero({ dict, locale }: { dict: Dict["hero"]; locale: Locale }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [visible, setVisible] = useState<Record<CardId, boolean>>({
    solicitudes: false,
    pagespeed: false,
    leads: false,
  });

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});

    const tick = () => {
      const t = v.currentTime;
      const next: Record<CardId, boolean> = { solicitudes: false, pagespeed: false, leads: false };
      for (const c of CARDS) next[c.id] = t >= c.showAt && t < c.hideAt;
      setVisible((prev) =>
        prev.solicitudes === next.solicitudes && prev.pagespeed === next.pagespeed && prev.leads === next.leads
          ? prev
          : next,
      );
    };

    v.addEventListener("timeupdate", tick);
    v.addEventListener("seeked", tick);
    v.addEventListener("loadeddata", tick);
    const id = setInterval(tick, 80);

    return () => {
      v.removeEventListener("timeupdate", tick);
      v.removeEventListener("seeked", tick);
      v.removeEventListener("loadeddata", tick);
      clearInterval(id);
    };
  }, []);

  return (
    <section className="hero-page">
      <div className="hero-container">
        <section className="hero-grid">
          {/* LEFT */}
          <div className="copy">
            <span className="hero-pill">
              {dict.pill[0]} <span className="dot" /> {dict.pill[1]} <span className="dot" /> {dict.pill[2]}
            </span>
            <h1 className="hero-h1">
              {dict.h1Pre}<span className="em">{dict.h1Em}</span>
            </h1>
            <p className="lede">{dict.lede}</p>
            <div className="cta-row hero-cta-row-3d">
              <div className="hero-cta-3d parent">
                <div className="card">
                  <div className="logo" aria-hidden>
                    <span className="circle circle1" />
                    <span className="circle circle2" />
                    <span className="circle circle3" />
                    <span className="circle circle4" />
                    <span className="circle circle5">
                      <svg className="svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                  <div className="glass" />
                  <Link href={path("contact", locale)} className="content">
                    <span className="title">{dict.ctaCardTitle}</span>
                    <span className="text">{dict.ctaCardSub}</span>
                  </Link>
                  <div className="bottom">
                    <div className="social-buttons-container">
                      <a className="social-button" href="https://wa.me/34613654273" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                        <svg className="svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11 11 0 0 0 3 17l-1 5 5-1a11 11 0 0 0 16.4-9.4 11 11 0 0 0-2.9-8.1Zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-3 .6.6-3-.2-.3A9 9 0 1 1 12 20.5Zm5-6.7c-.3-.2-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1l-.9 1c-.1.2-.3.2-.5.1a7 7 0 0 1-3.6-3.2c-.1-.2 0-.4.1-.5l.4-.5.2-.3v-.4l-.9-2c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.8.4 3 3 0 0 0-1 2.2c0 1.3 1 2.5 1.1 2.7.1.2 1.9 2.9 4.6 4.1a16 16 0 0 0 1.5.6c.6.2 1.2.2 1.7.1.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" /></svg>
                      </a>
                      <a className="social-button" href="mailto:info@tuagenciaweb.es" aria-label="Email">
                        <svg className="svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v.5l8 5 8-5V6H4zm0 2.5V18h16V8.5l-8 5-8-5z" /></svg>
                      </a>
                      <a className="social-button" href="tel:+34613654273" aria-label="Teléfono">
                        <svg className="svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 0 0-1.02.24l-2.2 2.2a15.05 15.05 0 0 1-6.59-6.59l2.2-2.2a1 1 0 0 0 .24-1.02A11.36 11.36 0 0 1 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1z" /></svg>
                      </a>
                    </div>
                    <Link href={path("contact", locale)} className="view-more">
                      <span className="view-more-button">{dict.ctaPrimary}</span>
                      <svg className="svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              <Link className="hero-btn hero-btn-ghost" href={sectionPath("home", locale, "projects")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" /><path d="M10 10l5 3-5 3v-6z" fill="currentColor" /></svg>
                {dict.ctaSecondary}
              </Link>
            </div>

            <div className="features">
              {dict.features.map((f, i) => (
                <div key={i} className="feat">
                  <div className="feat-icon">
                    {i === 0 && <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="4" y="6" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" /><path d="M12 26h8M16 22v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>}
                    {i === 1 && <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 4c4 4 6 8 6 12a6 6 0 11-12 0c0-4 2-8 6-12z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><circle cx="16" cy="14" r="2.2" fill="currentColor" /><path d="M11 22l-3 4M21 22l3 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>}
                    {i === 2 && <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.8" /><path d="M20 20l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>}
                    {i === 3 && <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="10" y="4" width="12" height="24" rx="2" stroke="currentColor" strokeWidth="1.8" /><circle cx="16" cy="24" r="1" fill="currentColor" /></svg>}
                  </div>
                  <div className="feat-title">{f.title}</div>
                  <div className="feat-sub">{f.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="visual">
            <div className="glow-a" />

            <div className="video-stage">
              <video
                ref={videoRef}
                className="hero-video"
                src="/hero-animation.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden
                disablePictureInPicture
                disableRemotePlayback
                controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
              />
            </div>

            <div className={`float-card card-solicitudes${visible.solicitudes ? " visible" : ""}`}>
              <CardSolicitudes d={dict.cards.solicitudes} />
            </div>
            <div className={`float-card card-pagespeed${visible.pagespeed ? " visible" : ""}`}>
              <CardPagespeed d={dict.cards.pagespeed} />
            </div>
            <div className={`float-card card-leads${visible.leads ? " visible" : ""}`}>
              <CardLeads d={dict.cards.leads} />
            </div>

            <div className="floor-shadow" />
          </div>
        </section>
      </div>
    </section>
  );
}
