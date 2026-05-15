type QA = { q: string; a: string };

const ITEMS: QA[] = [
  {
    q: "¿Por qué no cobráis cuota mensual como otras agencias?",
    a: "Porque consideramos abusivo cobrar 80–150 €/mes durante años por una web que ya está construida y que apenas requiere mantenimiento real. Nuestro pack incluye un precio cerrado, único, y tú decides después si quieres mantenimiento puntual o no. La web, el dominio y el código son tuyos desde el día 1.",
  },
  {
    q: "¿Cuánto se tarda en entregar la web?",
    a: "Entre 2 y 3 semanas según el pack. El Esencial puede estar listo en 7 días laborables; la Profesional en torno a 14 días; la Tienda online unos 21 días. Te damos un calendario claro al iniciar.",
  },
  {
    q: "¿Quién es dueño del dominio y del código?",
    a: "Tú. Te entregamos credenciales de dominio, hosting y el repositorio con todo el código fuente. Sin dependencia con nosotros: si un día quieres mover la web, puedes hacerlo sin pedir permiso.",
  },
  {
    q: "¿Y si necesito cambios después de la entrega?",
    a: "Cada pack incluye rondas de revisiones durante el proyecto. Después de la entrega, puedes solicitar pequeñas modificaciones puntuales sin necesidad de contratar una cuota mensual. Si prefieres delegarlo, ofrecemos mantenimiento opcional.",
  },
  {
    q: "¿Hacéis SEO de verdad?",
    a: "Sí: schema markup, sitemap, optimización de Core Web Vitals, etiquetas Open Graph, contenidos optimizados y arquitectura técnica preparada para Google. No vendemos humo: te explicamos qué hacemos y por qué.",
  },
  {
    q: "¿Puedo pagar a plazos?",
    a: "Sí. Lo habitual es 50% al empezar el proyecto y 50% antes del lanzamiento. Si necesitas un fraccionamiento distinto, lo hablamos.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative bg-[#FBFCFE]">
      <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-14 md:py-28">
        <div className="mx-auto max-w-[760px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,.18)]" />
            PREGUNTAS FRECUENTES
          </span>
          <h2 className="mt-5 text-balance text-[clamp(28px,3.4vw,42px)] font-bold leading-[1.1] tracking-[-0.025em] text-[#0B1220]">
            Lo que más nos preguntan.
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[16px] leading-[1.6] text-[#475569]">
            Si tu duda no está aquí, escríbenos y te respondemos en menos de 24 horas.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-[820px] space-y-3.5">
          {ITEMS.map(({ q, a }) => (
            <details
              key={q}
              className="group rounded-2xl border border-[#EEF1F6] bg-white px-[22px] py-5 transition-shadow open:shadow-[0_18px_40px_-20px_rgba(15,23,42,.15)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-[#0B1220] [&::-webkit-details-marker]:hidden">
                <span>{q}</span>
                <span
                  aria-hidden
                  className="relative flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#F1F5F9] text-[#475569] transition-colors group-open:bg-[var(--color-brand)] group-open:text-white"
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5">
                    <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line
                      x1="8"
                      y1="3"
                      x2="8"
                      y2="13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="transition-opacity group-open:opacity-0"
                    />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-[14.5px] leading-[1.65] text-[#475569]">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
