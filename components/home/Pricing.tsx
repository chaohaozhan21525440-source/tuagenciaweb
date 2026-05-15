import Link from "next/link";
import { PACKS, type PackId } from "@/lib/packs";

const Check = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SECTOR_TAG: Record<PackId, string> = {
  essential: "Landing",
  professional: "Web completa",
  shop: "E-commerce",
};

const CONTACT_SLUG: Record<PackId, string> = {
  essential: "esencial",
  professional: "profesional",
  shop: "tienda",
};

function priceParts(price: string) {
  const m = price.match(/^([\d.,]+)\s*(€?)/);
  if (!m) return { amount: price, currency: "" };
  return { amount: m[1].replace(/\./g, "."), currency: m[2] || "€" };
}

export function Pricing() {
  return (
    <section id="precios" className="relative">
      <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-14 md:py-28">
        <div className="mx-auto max-w-[760px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,.18)]" />
            PRECIOS
          </span>
          <h2 className="mt-5 text-balance text-[clamp(28px,3.4vw,42px)] font-bold leading-[1.1] tracking-[-0.025em] text-[#0B1220]">
            Pack único. La web es 100% tuya.
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[16px] leading-[1.6] text-[#475569]">
            Sin cuotas mensuales. Sin sorpresas. Eliges el pack que mejor encaja con tu negocio y te lo entregamos llave en mano.
          </p>
          <div className="mt-7 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-soft,#EFF4FF)] px-[22px] py-3 text-[14px] font-semibold text-[var(--color-brand-deep,#0a1733)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[var(--color-brand)]">
                <path d="M12 2l3 7h7l-5.5 4.2 2 7.3L12 16.8 5.5 20.5l2-7.3L2 9h7z" />
              </svg>
              Pack único, sin cuotas mensuales abusivas.
            </span>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-7 lg:grid-cols-3 lg:items-stretch">
          {PACKS.map((pack) => {
            const isHighlight = pack.highlight;
            const { amount, currency } = priceParts(pack.price);
            return (
              <article
                key={pack.id}
                className={[
                  "relative flex flex-col rounded-[24px] border bg-white p-9 transition",
                  isHighlight
                    ? "border-transparent shadow-[0_30px_70px_-25px_rgba(37,99,235,.35)] ring-2 ring-[var(--color-brand)] lg:scale-[1.04]"
                    : "border-[#EEF1F6] shadow-[0_10px_30px_-15px_rgba(15,23,42,.10)]",
                ].join(" ")}
              >
                {isHighlight && (
                  <span className="absolute right-5 top-5 rounded-full bg-[var(--color-brand)] px-2.5 py-1 text-[11px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,.55)]">
                    Más elegido
                  </span>
                )}
                <span className="inline-flex w-fit items-center rounded-full bg-[#F1F5F9] px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[#475569]">
                  {SECTOR_TAG[pack.id]}
                </span>
                <h3 className="mt-4 text-[24px] font-bold tracking-[-0.02em] text-[#0B1220]">{pack.name.es}</h3>
                <p className="mt-1.5 text-[14px] leading-[1.55] text-[#64748B]">{pack.tagline.es}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold leading-none tracking-[-0.02em] text-[var(--color-ink-900)]">
                    {amount}
                    <span className="text-2xl">{currency}</span>
                  </span>
                </div>
                <div className="mt-2 text-[13px] text-[#64748B]">pago único · sin cuota mensual</div>

                <ul className="mt-7 space-y-3">
                  {pack.features.es.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[14px] leading-[1.5] text-[#0F172A]">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#D1FADF] text-emerald-600">
                        <Check className="h-3 w-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 text-[13px] text-[#64748B]">{pack.delivery.es}</div>

                <Link
                  href={`/contacto?pack=${CONTACT_SLUG[pack.id]}`}
                  className={[
                    "mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[14.5px] font-semibold transition",
                    isHighlight
                      ? "bg-[var(--color-brand)] text-white shadow-[0_18px_40px_-12px_rgba(37,99,235,.55)] hover:bg-[var(--color-brand-hover)]"
                      : "border border-[#E5E7EB] bg-white text-[#0B1220] hover:border-[#94A3B8]",
                  ].join(" ")}
                >
                  Empezar con {pack.name.es}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </article>
            );
          })}
        </div>

        <p className="mt-10 text-center text-[14px] text-[#64748B]">
          Sin permanencia. Sin renovaciones automáticas. El código fuente y el dominio son tuyos.
        </p>
      </div>
    </section>
  );
}
