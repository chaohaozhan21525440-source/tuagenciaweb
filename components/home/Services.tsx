const BrushIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
    <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" />
  </svg>
);
const BagIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
const SearchIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const ShieldIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const Check = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

type Service = {
  Icon: (p: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  title: string;
  body: string;
  bullets: string[];
};

const SERVICES: Service[] = [
  {
    Icon: BrushIcon,
    title: "Diseño web a medida",
    body: "Webs únicas, modernas y orientadas a conversión.",
    bullets: ["Diseño 100% personalizado", "Mobile-first", "Animaciones cuidadas"],
  },
  {
    Icon: BagIcon,
    title: "Tienda online",
    body: "Plataformas de e-commerce listas para vender desde el día 1.",
    bullets: ["Shopify / WooCommerce", "Pasarelas de pago", "Gestión de stock"],
  },
  {
    Icon: SearchIcon,
    title: "SEO técnico y de contenidos",
    body: "Posicionamos tu negocio en Google donde están tus clientes.",
    bullets: ["Schema + sitemap", "Velocidad y Core Web Vitals", "Contenidos optimizados"],
  },
  {
    Icon: ShieldIcon,
    title: "Mantenimiento opcional",
    body: "Si quieres, nos quedamos cerca después del lanzamiento. Sin obligación.",
    bullets: ["Actualizaciones", "Backups", "Soporte directo"],
  },
];

export function Services() {
  return (
    <section id="servicios" className="relative">
      <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-14 md:py-28">
        <div className="mx-auto max-w-[760px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,.18)]" />
            SERVICIOS
          </span>
          <h2 className="mt-5 text-balance text-[clamp(28px,3.4vw,42px)] font-bold leading-[1.1] tracking-[-0.025em] text-[#0B1220]">
            Todo lo que tu web necesita, en un solo pack.
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[16px] leading-[1.6] text-[#475569]">
            Diseño, desarrollo, SEO y mantenimiento opcional. Cubrimos cada etapa para que tú solo te preocupes de tu negocio.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="group rounded-[20px] border border-[#EEF1F6] bg-white p-8 shadow-[0_10px_30px_-15px_rgba(15,23,42,.10)] transition hover:-translate-y-0.5 hover:shadow-[0_30px_60px_-25px_rgba(15,23,42,.20)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFF4FF] text-[var(--color-brand)]">
                <s.Icon className="h-[22px] w-[22px]" />
              </div>
              <h3 className="mt-5 text-[18px] font-bold tracking-[-0.01em] text-[#0B1220]">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-[#64748B]">{s.body}</p>
              <ul className="mt-5 space-y-2.5">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-[14px] text-[#0F172A]">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#D1FADF] text-emerald-600">
                      <Check className="h-3 w-3" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
