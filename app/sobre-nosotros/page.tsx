import Image from "next/image";
import { SiteHeader } from "@/components/layout/SiteHeader";

export const metadata = {
  title: "Sobre nosotros · Tuagenciaweb",
  description: "Somos un equipo apasionado por el diseño, el desarrollo y el marketing digital. Diseñamos webs que impulsan negocios y generan resultados.",
};

export default function SobreNosotros() {
  return (
    <>
      <SiteHeader />
      <div className="about-page">
        <div className="container-a">
          <section className="a-hero">
            <div>
              <span className="pill">
                <span className="dot" />
                SOBRE NOSOTROS
              </span>
              <h1 className="headline">
                Diseñamos webs que <span className="accent">impulsan negocios</span> y generan resultados.
              </h1>
              <p className="lead">
                Somos un equipo de profesionales apasionados por el diseño, el desarrollo y el marketing digital. Ayudamos a empresas como la tuya a destacar en internet.
              </p>

              <div className="stats">
                <div className="stat">
                  <div className="icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h4>+5 años</h4>
                  <p>de experiencia</p>
                </div>
                <div className="stat">
                  <div className="icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
                      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22 22 0 0 1-4 2Z" />
                      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                    </svg>
                  </div>
                  <h4>+120 proyectos</h4>
                  <p>entregados</p>
                </div>
                <div className="stat">
                  <div className="icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                    </svg>
                  </div>
                  <h4>100% compromiso</h4>
                  <p>con nuestros clientes</p>
                </div>
                <div className="stat">
                  <div className="icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8Z" />
                    </svg>
                  </div>
                  <h4>Resultados</h4>
                  <p>que generan impacto</p>
                </div>
              </div>
            </div>

            <div className="hero-media">
              <div className="photo">
                <Image
                  src="/team/group.jpg"
                  alt="Equipo de Tuagenciaweb"
                  width={1200}
                  height={930}
                  className="block h-full w-full object-cover"
                  priority
                />
                <div className="watermark">
                  <Image src="/logo/logo-tw.png" alt="" aria-hidden width={220} height={220} />
                </div>
              </div>
              <div className="testimonial">
                <div className="quote-mark">&ldquo;</div>
                <p>Creemos en el poder de un buen diseño y una estrategia digital sólida para transformar negocios.</p>
                <div className="src">— TuAgenciaWeb</div>
              </div>
            </div>
          </section>

          <section className="vm-card">
            <div>
              <span className="pill blue">
                <span className="dot" />
                NUESTROS VALORES
              </span>
              <ul className="values-list">
                <li>
                  <div className="v-ico">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h4>Transparencia</h4>
                    <p>Comunicación clara y honesta en cada proyecto.</p>
                  </div>
                </li>
                <li>
                  <div className="v-ico">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <div>
                    <h4>Calidad</h4>
                    <p>Cuidamos cada detalle para ofrecer resultados excepcionales.</p>
                  </div>
                </li>
                <li>
                  <div className="v-ico">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18h6" />
                      <path d="M10 22h4" />
                      <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2v.3h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2Z" />
                    </svg>
                  </div>
                  <div>
                    <h4>Innovación</h4>
                    <p>Utilizamos las mejores tecnologías para mantenernos a la vanguardia.</p>
                  </div>
                </li>
                <li>
                  <div className="v-ico">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <h4>Cercanía</h4>
                    <p>Nos involucramos en tu proyecto como si fuera nuestro.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mission">
              <div className="copy">
                <span className="pill blue">
                  <span className="dot" />
                  NUESTRA MISIÓN
                </span>
                <h2>
                  Ayudamos a empresas a <span className="accent">crecer</span> en el entorno digital con webs modernas, rápidas y optimizadas para <span className="accent">convertir</span>.
                </h2>
                <p>
                  Nuestro objetivo es simple: crear sitios web que no solo se vean bien, sino que también posicionen, conecten y conviertan visitas en clientes reales.
                </p>
              </div>

              <div className="illus">
                <div className="win win-1">
                  <div className="bar">
                    <i /><i /><i />
                  </div>
                  <div className="body">
                    <Image className="tw-logo" src="/logo/logo-tw.png" alt="" aria-hidden width={120} height={36} />
                    <div className="line" />
                    <div className="line s" />
                    <div className="cta" />
                  </div>
                </div>
                <div className="win win-2">
                  <div className="bar">
                    <i /><i /><i />
                  </div>
                  <div className="body">
                    <div className="cta" />
                    <div className="line long" />
                    <div className="line mid" />
                    <div className="line long" />
                    <div className="line mid" />
                  </div>
                </div>
                <div className="chart-card">
                  <div className="head">
                    <div className="ico">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 17l6-6 4 4 8-8" />
                        <path d="M14 7h7v7" />
                      </svg>
                    </div>
                    <span className="label">Conversiones</span>
                    <span className="pct">+24%</span>
                  </div>
                  <svg className="spark" viewBox="0 0 200 60" width="100%" height="50">
                    <defs>
                      <linearGradient id="gg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#10B981" stopOpacity=".25" />
                        <stop offset="1" stopColor="#10B981" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0 45 C 25 40, 40 50, 65 35 S 110 10, 135 18 S 180 5, 200 8 L 200 60 L 0 60 Z" fill="url(#gg)" />
                    <path d="M0 45 C 25 40, 40 50, 65 35 S 110 10, 135 18 S 180 5, 200 8" fill="none" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          <div className="footroom" />
        </div>
      </div>
    </>
  );
}
