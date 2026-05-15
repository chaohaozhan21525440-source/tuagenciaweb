import { useTranslations } from "next-intl";
import { Check, X } from "@phosphor-icons/react/dist/ssr";
import { FadeUp } from "@/components/motion/FadeUp";

type Row = { label: string; others: string; us: string };

export function Comparativa() {
  const t = useTranslations("home.comparativa");
  const rows = t.raw("rows") as Row[];

  return (
    <section className="bg-[var(--color-ink-50)] py-20 md:py-24">
      <div className="container-page">
        <FadeUp className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-[var(--color-ink-500)]">{t("subtitle")}</p>
        </FadeUp>

        <FadeUp className="mt-12">
          <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-ink-200)] bg-white shadow-[var(--shadow-soft)]">
            <table className="w-full border-collapse text-left text-[15px]">
              <thead>
                <tr className="border-b border-[var(--color-ink-200)] bg-white">
                  <th scope="col" className="w-2/5 p-5 font-display text-sm font-semibold text-[var(--color-ink-500)]">
                    &nbsp;
                  </th>
                  <th scope="col" className="p-5 font-display text-sm font-semibold text-[var(--color-ink-500)]">
                    {t("colOthers")}
                  </th>
                  <th
                    scope="col"
                    className="border-t-2 border-[var(--color-accent)] bg-[var(--color-accent-soft)] p-5 font-display text-sm font-semibold text-[var(--color-accent-ink)]"
                  >
                    {t("colUs")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-white" : "bg-[var(--color-ink-50)]"}
                  >
                    <th
                      scope="row"
                      className="border-t border-[var(--color-ink-200)] p-5 font-medium text-[var(--color-ink-900)]"
                    >
                      {row.label}
                    </th>
                    <td className="border-t border-[var(--color-ink-200)] p-5">
                      <span className="inline-flex items-center gap-2 text-[var(--color-ink-500)]">
                        <X size={16} weight="bold" aria-hidden className="text-[var(--color-danger)]" />
                        {row.others}
                      </span>
                    </td>
                    <td className="border-t border-[var(--color-accent)]/15 bg-[var(--color-accent-soft)] p-5 font-semibold text-[var(--color-accent-ink)]">
                      <span className="inline-flex items-center gap-2">
                        <Check size={16} weight="bold" aria-hidden className="text-[var(--color-success)]" />
                        {row.us}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-sm text-[var(--color-ink-500)]">{t("footnote")}</p>
        </FadeUp>
      </div>
    </section>
  );
}
