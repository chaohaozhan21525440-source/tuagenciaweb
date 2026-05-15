"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="form-wrap" id="contacto-form">
      <form className="form-card" onSubmit={onSubmit}>
        {submitted ? (
          <div style={{ padding: "24px 0", textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#0B1220", marginBottom: 8 }}>¡Recibido!</div>
            <div style={{ color: "#64748B", fontSize: 14.5 }}>Te respondemos en menos de 24 horas.</div>
          </div>
        ) : (
          <>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="nombre">Nombre</label>
                <input id="nombre" name="nombre" type="text" placeholder="Tu nombre" required />
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
                <textarea id="mensaje" name="mensaje" placeholder="Cuéntanos sobre tu proyecto..." required />
              </div>
              <div className="field">
                <label htmlFor="tel">Teléfono</label>
                <input id="tel" name="tel" type="tel" placeholder="+34 600 000 000" />
              </div>
            </div>

            <div className="form-bottom">
              <label className="check">
                <input type="checkbox" required />
                <span>
                  Acepto la <a href="#privacidad">política de privacidad</a>
                </span>
              </label>
              <button type="submit" className="btn-primary">
                Enviar solicitud
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
