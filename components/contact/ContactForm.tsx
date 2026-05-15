"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";
type ErrorKind = "validation" | "ratelimit" | "send" | null;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorKind, setErrorKind] = useState<ErrorKind>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorKind(null);
    try {
      const fd = new FormData(e.currentTarget);
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
            <div style={{ fontSize: 18, fontWeight: 700, color: "#0B1220", marginBottom: 8 }}>¡Recibido!</div>
            <div style={{ color: "#64748B", fontSize: 14.5 }}>Te respondemos en menos de 24 horas.</div>
          </div>
        ) : (
          <>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="nombre">Nombre</label>
                <input id="nombre" name="nombre" type="text" placeholder="Tu nombre" required minLength={2} maxLength={80} />
              </div>
              <div className="field select-wrap">
                <label htmlFor="tipo">Tipo de proyecto</label>
                <select id="tipo" name="tipo" defaultValue="" required>
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  <option>Web corporativa</option>
                  <option>Tienda online</option>
                  <option>Landing page</option>
                  <option>SEO / Marketing</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="tu@email.com" required />
              </div>
              <div className="field msg">
                <label htmlFor="mensaje">Mensaje</label>
                <textarea id="mensaje" name="mensaje" placeholder="Cuéntanos sobre tu proyecto..." required minLength={10} maxLength={2000} />
              </div>
              <div className="field">
                <label htmlFor="tel">Teléfono</label>
                <input id="tel" name="tel" type="tel" placeholder="+34 600 000 000" />
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
                {errorKind === "ratelimit"
                  ? "Has enviado un mensaje hace muy poco. Inténtalo en un minuto o escríbenos por WhatsApp."
                  : "No se ha podido enviar. Inténtalo en un minuto o escríbenos por WhatsApp."}
              </div>
            )}

            <div className="form-bottom">
              <label className="check">
                <input type="checkbox" name="gdpr" required />
                <span>
                  Acepto la <a href="#privacidad">política de privacidad</a>
                </span>
              </label>
              <button type="submit" className="btn-primary" disabled={status === "submitting"}>
                {status === "submitting" ? "Enviando..." : "Enviar solicitud"}
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
          <div className="label">Respuesta media:</div>
          <div className="val">&lt; 24h</div>
        </div>
      </div>
    </div>
  );
}
