/*
 * PhoneMockup
 * Pure div composition of a phone showing the same dental clinic mock
 * stacked vertically. Decorative, aria-hidden.
 */
import { Tooth } from "@phosphor-icons/react/dist/ssr";

export function PhoneMockup() {
  return (
    <div className="relative rounded-[36px] bg-[var(--color-ink-900)] p-2 shadow-[0_30px_60px_-20px_rgba(14,42,74,0.45)]">
      <div className="overflow-hidden rounded-[28px] bg-white">
        {/* status bar */}
        <div className="relative flex items-center justify-between px-5 pb-1 pt-2 text-[9px] font-semibold text-[var(--color-ink-900)]">
          <span>11:24</span>
          <span className="absolute left-1/2 top-1.5 h-3 w-12 -translate-x-1/2 rounded-full bg-[var(--color-ink-900)]" />
          <span className="flex items-center gap-1">
            <span>●●●</span>
            <span>◰</span>
            <span>92%</span>
          </span>
        </div>
        {/* nav */}
        <div className="flex items-center justify-between border-b border-[var(--color-ink-100)] px-3 py-2">
          <div className="flex items-center gap-1.5 text-[var(--color-accent-deep)]">
            <Tooth size={14} weight="fill" aria-hidden />
            <span className="font-display text-[10px] font-bold">Clínica Sofía Martín</span>
          </div>
          <span className="grid gap-[2px]">
            <span className="block h-[2px] w-3.5 bg-[var(--color-ink-700)]" />
            <span className="block h-[2px] w-3.5 bg-[var(--color-ink-700)]" />
            <span className="block h-[2px] w-3.5 bg-[var(--color-ink-700)]" />
          </span>
        </div>
        {/* hero block */}
        <div className="p-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-accent-soft)] px-2 py-0.5 text-[8px] font-semibold text-[var(--color-accent-ink)]">
            <span className="h-1 w-1 rounded-full bg-[var(--color-success)]" /> CITA HOY
          </span>
          <h4 className="mt-2 font-display text-sm font-bold leading-tight">Sonríe sin miedo.</h4>
          <p className="mt-1 text-[9px] leading-snug text-[var(--color-ink-500)]">
            Primera visita gratuita. Equipo experto en estética.
          </p>
          <div className="mt-2 grid grid-cols-1 gap-1.5">
            <span className="rounded bg-[var(--color-accent)] px-2 py-1.5 text-center text-[9px] font-semibold text-white">
              Reservar cita
            </span>
            <span className="rounded border border-[var(--color-ink-200)] px-2 py-1.5 text-center text-[9px] font-semibold text-[var(--color-ink-700)]">
              Llamar
            </span>
          </div>
          <div className="mt-3 aspect-[4/3] rounded-md bg-gradient-to-br from-[var(--color-accent-soft)] to-[#cfe0ff] ring-1 ring-[var(--color-ink-100)]" />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[8px] font-semibold text-[var(--color-ink-500)]">★ 4,9 · 312 reseñas</span>
            <span className="text-[8px] text-[var(--color-accent)]">Ver más →</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhoneMockup;
