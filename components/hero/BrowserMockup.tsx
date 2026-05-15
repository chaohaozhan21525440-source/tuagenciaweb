/*
 * BrowserMockup
 * Pure SVG/div composition of a laptop-chrome browser showing a fictional
 * dental clinic landing. No external images. Used in the hero.
 */
import { Tooth } from "@phosphor-icons/react/dist/ssr";

export function BrowserMockup() {
  return (
    <div className="rounded-[var(--radius-shell)] bg-white shadow-[var(--shadow-lift)] ring-1 ring-[var(--color-ink-200)]">
      {/* Chrome */}
      <div className="flex h-9 items-center gap-3 rounded-t-[var(--radius-shell)] border-b border-[var(--color-ink-100)] bg-[var(--color-ink-50)] px-4">
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex h-6 flex-1 items-center justify-center rounded-md bg-white px-3 text-[11px] font-medium text-[var(--color-ink-400)] ring-1 ring-[var(--color-ink-200)]">
          tuagenciaweb.es/cliente-ejemplo
        </div>
        <div className="h-2 w-2 rounded-full bg-[var(--color-ink-200)]" />
      </div>

      {/* Fake landing — dental clinic */}
      <div className="overflow-hidden rounded-b-[var(--radius-shell)] bg-white">
        <div className="flex items-center justify-between border-b border-[var(--color-ink-100)] px-5 py-3">
          <div className="flex items-center gap-2 text-[var(--color-accent-deep)]">
            <Tooth size={18} weight="fill" aria-hidden />
            <span className="font-display text-sm font-bold">Clínica Sofía Martín</span>
          </div>
          <div className="hidden gap-4 text-[10px] font-medium text-[var(--color-ink-500)] sm:flex">
            <span>Tratamientos</span>
            <span>Equipo</span>
            <span>Contacto</span>
          </div>
          <span className="h-6 rounded-md bg-[var(--color-accent)] px-2 text-[10px] font-semibold leading-6 text-white">
            Pedir cita
          </span>
        </div>

        <div className="grid grid-cols-5 gap-4 p-5">
          <div className="col-span-3 flex flex-col gap-2">
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[var(--color-accent-soft)] px-2 py-0.5 text-[9px] font-semibold text-[var(--color-accent-ink)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
              CITA EN 24H
            </span>
            <h3 className="font-display text-base font-bold leading-[1.1] text-[var(--color-ink-900)]">
              Sonríe sin miedo,
              <br />
              cuidamos cada detalle.
            </h3>
            <p className="text-[10px] leading-snug text-[var(--color-ink-500)]">
              Más de 1.200 pacientes confían en nuestro equipo. Primera visita gratuita.
            </p>
            <div className="mt-2 flex gap-2">
              <span className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-[10px] font-semibold text-white">
                Reservar cita
              </span>
              <span className="rounded-md border border-[var(--color-ink-200)] px-3 py-1.5 text-[10px] font-semibold text-[var(--color-ink-700)]">
                WhatsApp
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="text-[10px] text-[var(--color-warning)]">★</span>
              ))}
              <span className="text-[9px] font-medium text-[var(--color-ink-500)]">4,9 · 312 reseñas</span>
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <div className="aspect-[4/5] rounded-md bg-gradient-to-br from-[var(--color-accent-soft)] to-[#cfe0ff] ring-1 ring-[var(--color-ink-100)]">
              <div className="flex h-full items-end p-2">
                <div className="rounded bg-white/85 px-2 py-1 text-[8px] font-semibold text-[var(--color-accent-deep)] ring-1 ring-[var(--color-ink-100)]">
                  Dra. Sofía Martín
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <div className="aspect-square rounded bg-[var(--color-ink-100)]" />
              <div className="aspect-square rounded bg-[var(--color-ink-100)]" />
              <div className="aspect-square rounded bg-[var(--color-ink-100)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowserMockup;
