import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="sf-container">
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
            <a href="/#servicios">Diseño Web</a>
            <a href="/#servicios">SEO</a>
            <a href="/#servicios">Mantenimiento</a>
            <a href="/#servicios">Tiendas Online</a>
          </div>
          <div className="foot-col">
            <h5>Recursos</h5>
            <a href="/#faq">Preguntas frecuentes</a>
            <a href="/#precios">Precios</a>
            <a href="/#proyectos">Proyectos</a>
          </div>
          <div className="foot-col">
            <h5>Empresa</h5>
            <a href="/sobre-nosotros">Sobre nosotros</a>
            <a href="/#proyectos">Proyectos</a>
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
  );
}
