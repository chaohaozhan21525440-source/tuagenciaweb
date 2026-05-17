"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ────────────────────────────────────────────────────────────────────────────
   Hero — implemented literally from the Claude Design "Hero.html" bundle.
   - Page bg matches the video bg exactly (#eff1f9) → no rectangle seam.
   - Floating cards visibility is driven by the looping video's currentTime
     (show/hide thresholds per card) so they enter as the laptop opens and
     dismiss as it closes — even across loop wraps.
   ──────────────────────────────────────────────────────────────────────────── */

const CARDS = [
  { id: "solicitudes", showAt: 0.75, hideAt: 4.55 },
  { id: "pagespeed", showAt: 1.05, hideAt: 4.55 },
  { id: "leads", showAt: 1.35, hideAt: 4.55 },
] as const;

type CardId = (typeof CARDS)[number]["id"];

function CardSolicitudes() {
  return (
    <>
      <div className="cs-row">
        <div>
          <div className="cs-big">+42</div>
          <div className="cs-sub">Solicitudes este mes</div>
        </div>
        <span className="cs-badge">+18%</span>
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

function CardPagespeed() {
  return (
    <>
      <div className="ps-gauge">
        <svg viewBox="0 0 100 100">
          <circle className="track" cx="50" cy="50" r="42" fill="none" strokeWidth="8" />
          <circle className="meter" cx="50" cy="50" r="42" fill="none" strokeWidth="8" strokeLinecap="round" strokeDasharray="263.9" strokeDashoffset="13.2" />
        </svg>
        <div className="ps-num">95</div>
      </div>
      <div className="ps-title">Google PageSpeed</div>
      <div className="ps-sub">Excelente</div>
    </>
  );
}

function CardLeads() {
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
          <div className="cl-big">+300%</div>
          <div className="cl-sub">
            Más leads generados
            <br />
            con nuestras webs
          </div>
        </div>
      </div>
      <svg className="cl-chart" viewBox="0 0 280 26" preserveAspectRatio="none" fill="none">
        <path d="M2 22 L40 19 L80 21 L120 14 L160 16 L200 9 L240 11 L278 3" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );
}

export function Hero() {
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
    const id = setInterval(tick, 80); // the loop wrap can fall between timeupdates

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
              DISEÑO WEB <span className="dot" /> SEO <span className="dot" /> RESULTADOS
            </span>
            <h1 className="hero-h1">
              Diseñamos webs que <span className="em">convierten visitas en clientes.</span>
            </h1>
            <p className="lede">
              Creamos páginas web modernas, rápidas y optimizadas para SEO para que tu negocio genere más contactos y ventas todos los días.
            </p>
            <div className="cta-row">
              <Link className="hero-btn hero-btn-primary" href="/contacto">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Solicitar presupuesto
              </Link>
              <Link className="hero-btn hero-btn-ghost" href="/#proyectos">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" /><path d="M10 10l5 3-5 3v-6z" fill="currentColor" /></svg>
                Ver proyectos
              </Link>
            </div>

            <div className="features">
              <div className="feat">
                <div className="feat-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="4" y="6" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" /><path d="M12 26h8M16 22v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                </div>
                <div className="feat-title">Diseño a medida</div>
                <div className="feat-sub">100% personalizado</div>
              </div>
              <div className="feat">
                <div className="feat-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 4c4 4 6 8 6 12a6 6 0 11-12 0c0-4 2-8 6-12z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><circle cx="16" cy="14" r="2.2" fill="currentColor" /><path d="M11 22l-3 4M21 22l3 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                </div>
                <div className="feat-title">Rápido y seguro</div>
                <div className="feat-sub">Carga en &lt; 2s</div>
              </div>
              <div className="feat">
                <div className="feat-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.8" /><path d="M20 20l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                </div>
                <div className="feat-title">SEO optimizado</div>
                <div className="feat-sub">Posicionamos tu web</div>
              </div>
              <div className="feat">
                <div className="feat-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="10" y="4" width="12" height="24" rx="2" stroke="currentColor" strokeWidth="1.8" /><circle cx="16" cy="24" r="1" fill="currentColor" /></svg>
                </div>
                <div className="feat-title">Responsive</div>
                <div className="feat-sub">Perfecto en todos los dispositivos</div>
              </div>
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
              <CardSolicitudes />
            </div>
            <div className={`float-card card-pagespeed${visible.pagespeed ? " visible" : ""}`}>
              <CardPagespeed />
            </div>
            <div className={`float-card card-leads${visible.leads ? " visible" : ""}`}>
              <CardLeads />
            </div>

            <div className="floor-shadow" />
          </div>
        </section>
      </div>
    </section>
  );
}
