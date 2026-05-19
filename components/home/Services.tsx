import Link from "next/link";
import type { Dict, Locale } from "@/lib/i18n";
import { path } from "@/lib/i18n";

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

const ICONS = [BrushIcon, BagIcon, SearchIcon, ShieldIcon];

export function Services({ dict, locale }: { dict: Dict["services"]; locale: Locale }) {
  return (
    <section id="servicios" className="relative">
      <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-14 md:py-28">
        <div className="mx-auto max-w-[760px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,.18)]" />
            {dict.pill}
          </span>
          <h2 className="mt-5 text-balance text-[clamp(28px,3.4vw,42px)] font-bold leading-[1.1] tracking-[-0.025em] text-[#0B1220]">
            {dict.h2}
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[16px] leading-[1.6] text-[#475569]">
            {dict.sub}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
          {dict.items.map((s, i) => {
            const Icon = ICONS[i] ?? BrushIcon;
            return (
              <article
                key={i}
                className="group relative rounded-[20px] border border-[#EEF1F6] bg-white p-8 shadow-[0_10px_30px_-15px_rgba(15,23,42,.10)] transition hover:-translate-y-0.5 hover:shadow-[0_30px_60px_-25px_rgba(15,23,42,.20)]"
              >
                {s.badge && (
                  <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-[#EFF4FF] px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-[var(--color-brand)] ring-1 ring-inset ring-[#DCE6FB]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,.18)]" />
                    {s.badge}
                  </span>
                )}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFF4FF] text-[var(--color-brand)]">
                  <Icon className="h-[22px] w-[22px]" />
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
            );
          })}
        </div>

        <div className="mt-14 flex flex-col items-center gap-5 rounded-[24px] border border-[#EEF1F6] bg-gradient-to-br from-[#F6F9FF] to-white px-6 py-10 text-center md:mt-16 md:flex-row md:justify-between md:gap-8 md:px-12 md:text-left">
          <p className="max-w-[640px] text-[16px] leading-[1.6] text-[#475569]">
            <strong className="font-semibold text-[#0B1220]">{dict.cta.leadBold}</strong>{" "}
            {dict.cta.lead}
          </p>
          <Link
            href={path("contact", locale)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-6 py-3 text-[14.5px] font-semibold text-white shadow-[0_18px_40px_-12px_rgba(37,99,235,0.55)] transition-colors hover:bg-[var(--color-brand-hover)]"
          >
            {dict.cta.button}
          </Link>
        </div>
      </div>
    </section>
  );
}
