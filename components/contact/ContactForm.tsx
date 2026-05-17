"use client";

import { useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";

type Status = "idle" | "submitting" | "success" | "error";
type ErrorKind = "validation" | "ratelimit" | "send" | null;

export function ContactForm({
  dict,
  locale,
}: {
  dict: Dict["contact"]["form"];
  locale: Locale;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorKind, setErrorKind] = useState<ErrorKind>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorKind(null);
    try {
      const fd = new FormData(e.currentTarget);
      fd.set("locale", locale);
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({}))) as
        | { ok: true; honeypot?: boolean }
        | { ok: false; error: "validation" | "ratelimit" | "send"; retryAfterSeconds?: number };
      if (data && "ok" in data && data.ok) {
        setStatus("success");
        return;
      }
      setErrorKind((data as { error?: ErrorKind })?.error ?? "send");
      setStatus("error");
    } catch {
      setErrorKind("send");
      setStatus("error");
    }
  }

  return (
    <div className="form-wrap" id="contacto-form">
      <form className="form-card" onSubmit={onSubmit} noValidate>
        {status === "success" ? (
          <div style={{ padding: "24px 0", textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#0B1220", marginBottom: 8 }}>{dict.success}</div>
            <div style={{ color: "#64748B", fontSize: 14.5 }}>{dict.successSub}</div>
          </div>
        ) : (
          <>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="nombre">{dict.name}</label>
                <input id="nombre" name="nombre" type="text" placeholder={dict.namePlaceholder} required minLength={2} maxLength={80} />
              </div>
              <div className="field select-wrap">
                <label htmlFor="tipo">{dict.type}</label>
                <select id="tipo" name="tipo" defaultValue="" required>
                  <option value="" disabled>
                    {dict.typePlaceholder}
                  </option>
                  <option value="corporate">{dict.typeOptions.corporate}</option>
                  <option value="shop">{dict.typeOptions.shop}</option>
                  <option value="landing">{dict.typeOptions.landing}</option>
                  <option value="seo">{dict.typeOptions.seo}</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="email">{dict.email}</label>
                <input id="email" name="email" type="email" placeholder={dict.emailPlaceholder} required />
              </div>
              <div className="field msg">
                <label htmlFor="mensaje">{dict.message}</label>
                <textarea id="mensaje" name="mensaje" placeholder={dict.messagePlaceholder} required minLength={10} maxLength={2000} />
              </div>
              <div className="field">
                <label htmlFor="tel">{dict.phone}</label>
                <input id="tel" name="tel" type="tel" placeholder={dict.phonePlaceholder} />
              </div>
            </div>

            {/* Honeypot - hidden from humans */}
            <div style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }} aria-hidden>
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            {status === "error" && (
              <div
                role="alert"
                style={{
                  marginTop: 16,
                  padding: "12px 14px",
                  background: "#FEF2F2",
                  border: "1px solid #FECACA",
                  borderRadius: 12,
                  color: "#991B1B",
                  fontSize: 13.5,
                  lineHeight: 1.5,
                }}
              >
                {errorKind === "ratelimit" ? dict.errorRate : dict.errorSend}
              </div>
            )}

            <div className="form-bottom">
              <label className="check">
                <input type="checkbox" name="gdpr" required />
                <span>
                  {dict.gdprPre}<a href="#privacidad">{dict.gdprLink}</a>
                </span>
              </label>
              <button type="submit" className="btn-primary" disabled={status === "submitting"}>
                {status === "submitting" ? dict.submitting : dict.submit}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </>
        )}
      </form>

      <div className="resp-card">
        <div className="icoo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <div>
          <div className="label">{dict.respLabel}</div>
          <div className="val">{dict.respValue}</div>
        </div>
      </div>
    </div>
  );
}
