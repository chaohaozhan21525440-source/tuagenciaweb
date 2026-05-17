import type { Dict } from "@/lib/i18n";

export function FAQ({ dict }: { dict: Dict["faq"] }) {
  return (
    <section id="faq" className="relative bg-[#FBFCFE]">
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

        <div className="mx-auto mt-12 max-w-[820px] space-y-3.5">
          {dict.items.map(({ q, a }) => (
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
