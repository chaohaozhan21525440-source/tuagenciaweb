import { useLocale, useTranslations } from "next-intl";
import { CheckCircle, XCircle } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@/i18n/routing";
import { PACKS } from "@/lib/packs";
import { FadeUp } from "@/components/motion/FadeUp";
import { cn } from "@/lib/cn";

export function Pricing() {
  const locale = useLocale() as "es" | "en";
  const t = useTranslations("home.pricing");

  return (
    <section id="precios" className="scroll-mt-24 py-20 md:py-24">
      <div className="container-page">
        <FadeUp className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            {t("title")}
          </h2>
        </FadeUp>

        {/* CRITICAL callout pill */}
        <FadeUp className="mt-8 flex justify-center">
          <p className="inline-flex max-w-[44ch] items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-accent-soft)] px-5 py-2.5 text-center text-[15px] font-semibold leading-snug text-[var(--color-accent-ink)]">
            {t("callout")}
          </p>
        </FadeUp>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PACKS.map((pack, i) => (
            <FadeUp key={pack.id} delay={i * 0.08}>
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-[var(--radius-card)] border bg-white p-8 transition-transform duration-300",
                  pack.highlight
                    ? "border-[var(--color-accent)] shadow-[var(--shadow-lift)] lg:scale-[1.03] ring-1 ring-[var(--color-accent)]"
                    : "border-[var(--color-ink-200)] shadow-[var(--shadow-ring)]",
                )}
              >
                {pack.highlight && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                    {t("mostChosen")}
                  </span>
                )}

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-400)]">
                  {pack.tagline[locale]}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">{pack.name[locale]}</h3>

                <div className="mt-6 flex items-end gap-1">
                  <span className="font-display text-5xl font-bold tracking-tight text-[var(--color-ink-900)]">
                    {pack.price.replace(" €", "").trim()}
                  </span>
                  <span className="mb-2 font-display text-2xl font-bold text-[var(--color-ink-900)]">€</span>
                </div>
                <p className="text-[13px] text-[var(--color-ink-500)]">{t("priceNote")}</p>

                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {pack.features[locale].slice(0, 8).map((f) => (
                    <li key={f} className="flex gap-2.5 text-[14px] leading-snug text-[var(--color-ink-700)]">
                      <CheckCircle
                        size={18}
                        weight="fill"
                        aria-hidden
                        className="mt-0.5 shrink-0 text-[var(--color-accent)]"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                  {/* Show one explicit "no" to demonstrate the XCircle */}
                  {!pack.highlight && (
                    <li className="flex gap-2.5 text-[14px] leading-snug text-[var(--color-ink-300)] line-through">
                      <XCircle size={18} weight="fill" aria-hidden className="mt-0.5 shrink-0 text-[var(--color-ink-300)]" />
                      <span>{t("excludedExample")}</span>
                    </li>
                  )}
                </ul>

                <Link
                  href={`/contacto?pack=${pack.id}` as never}
                  className={cn(
                    "mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-control)] px-5 text-sm font-semibold transition-colors duration-200 active:scale-[0.98]",
                    pack.highlight
                      ? "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]"
                      : "border border-[var(--color-ink-200)] bg-white text-[var(--color-ink-900)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
                  )}
                >
                  {t("startWith", { pack: pack.name[locale] })}
                </Link>
              </article>
            </FadeUp>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-[var(--color-ink-500)]">
          {t("microcopy")}
        </p>
      </div>
    </section>
  );
}
