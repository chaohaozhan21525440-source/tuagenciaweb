import Image from "next/image";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contacto · Tuagenciaweb",
  description: "Hablemos sobre tu próximo proyecto web. Cuéntanos qué necesitas y te respondemos en menos de 24 horas con una propuesta personalizada.",
};

export default function Contacto() {
  return (
    <>
      <SiteHeader />
      <div className="contact-page">
        <div className="container-c">
          <section className="c-hero">
            <div>
              <span className="pill">
                <span className="dot" />
                CONTACTO
              </span>
              <h1 className="headline">
                Hablemos sobre tu <span className="accent">próximo proyecto web.</span>
              </h1>
              <p className="lead">
                Cuéntanos qué necesitas y te prepararemos una propuesta personalizada para ayudarte a conseguir más clientes con una web moderna y optimizada.
              </p>

              <div className="features">
                <div className="feat">
                  <div className="icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <h4>Respuesta en</h4>
                  <p>menos de 24h</p>
                </div>
                <div className="feat">
                  <div className="icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="8" y1="13" x2="16" y2="13" />
                      <line x1="8" y1="17" x2="13" y2="17" />
                    </svg>
                  </div>
                  <h4>Presupuesto</h4>
                  <p>sin compromiso</p>
                </div>
                <div className="feat">
                  <div className="icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <h4>Asesoramiento</h4>
                  <p>personalizado</p>
                </div>
                <div className="feat">
                  <div className="icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 14v-4a9 9 0 0 1 18 0v4" />
                      <path d="M21 19a2 2 0 0 1-2 2h-1v-6h3v4Z" />
                      <path d="M3 19a2 2 0 0 0 2 2h1v-6H3v4Z" />
                    </svg>
                  </div>
                  <h4>Soporte</h4>
                  <p>cercano</p>
                </div>
              </div>
            </div>

            <ContactForm />
          </section>

          <section className="info-bar">
            <a href="mailto:chao@tuagenciaweb.es" className="info" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="txt">
                <div className="lab">Email</div>
                <div className="val">chao@tuagenciaweb.es</div>
              </div>
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a href="tel:+34600000000" className="info" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="txt">
                <div className="lab">Teléfono</div>
                <div className="val">+34 600 000 000</div>
              </div>
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a href="https://wa.me/34600000000" target="_blank" rel="noopener noreferrer" className="info" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </div>
              <div className="txt">
                <div className="lab">WhatsApp</div>
                <div className="val">Escríbenos</div>
              </div>
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <div className="info">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="txt">
                <div className="lab">Ubicación</div>
                <div className="val">España</div>
              </div>
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </section>

          <section className="faq">
            <h2>Preguntas frecuentes</h2>
            <div className="faq-grid">
              {[
                "¿Cuánto tarda una web?",
                "¿Incluye SEO?",
                "¿Trabajáis con autónomos?",
                "¿Ofrecéis mantenimiento?",
              ].map((q) => (
                <div key={q} className="faq-item">
                  <span>{q}</span>
                  <svg className="plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
              ))}
            </div>
          </section>

          <section className="cta-banner">
            <div className="rocket">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
                <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22 22 0 0 1-4 2Z" />
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
              </svg>
            </div>
            <div className="copy">
              <h3>¿Listo para impulsar tu negocio?</h3>
              <p>Cuéntanos tu proyecto y te ayudaremos a llevar tu negocio al siguiente nivel.</p>
            </div>
            <a href="#contacto-form" className="btn-primary">
              Solicitar presupuesto
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </section>
        </div>

        <footer className="c-footer">
          <div className="container-c">
            <div className="foot-grid">
              <div className="foot-brand">
                <div className="logo">
                  <Image className="icon" src="/logo/logo-tw.png" alt="TuAgenciaWeb" width={64} height={64} />
                  <Image className="wordmark" src="/logo/logo-wordmark.png" alt="tuagenciaweb" width={260} height={56} />
                </div>
                <p>Diseñamos webs que convierten visitas en clientes. Páginas rápidas, modernas y optimizadas para SEO.</p>
              </div>
              <div className="foot-col">
                <h5>Servicios</h5>
                <a href="#servicios">Diseño Web</a>
                <a href="#servicios">SEO</a>
                <a href="#servicios">Mantenimiento</a>
                <a href="#servicios">Tiendas Online</a>
              </div>
              <div className="foot-col">
                <h5>Recursos</h5>
                <a href="#blog">Blog</a>
                <a href="#guias">Guías</a>
                <a href="#faq">Preguntas frecuentes</a>
              </div>
              <div className="foot-col">
                <h5>Empresa</h5>
                <a href="/sobre-nosotros">Sobre nosotros</a>
                <a href="#proyectos">Proyectos</a>
                <a href="/contacto">Contacto</a>
              </div>
              <div className="foot-col">
                <h5>Síguenos</h5>
                <div className="social">
                  <a href="#" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14M18.5 18.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
                  </a>
                  <a href="#" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                  </a>
                  <a href="#" aria-label="Twitter">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.8a8.49 8.49 0 0 1-2.36.64 4.13 4.13 0 0 0 1.81-2.27 8.21 8.21 0 0 1-2.61 1 4.1 4.1 0 0 0-7 3.74A11.64 11.64 0 0 1 3.39 4.62a4.16 4.16 0 0 0 1.27 5.49 4.1 4.1 0 0 1-1.86-.52v.05a4.1 4.1 0 0 0 3.29 4 4.1 4.1 0 0 1-1.85.07 4.11 4.11 0 0 0 3.83 2.84A8.22 8.22 0 0 1 2 18.28a11.57 11.57 0 0 0 6.29 1.85c7.55 0 11.67-6.25 11.67-11.67v-.53A8.31 8.31 0 0 0 22 5.8z" /></svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="foot-bottom">
              <span>© 2026 TuAgenciaWeb. Todos los derechos reservados.</span>
              <div className="links">
                <a href="#aviso">Aviso legal</a>
                <a href="#privacidad">Política de privacidad</a>
                <a href="#cookies">Política de cookies</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
