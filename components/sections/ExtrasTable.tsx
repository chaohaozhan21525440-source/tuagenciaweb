import { useLocale, useTranslations } from "next-intl";
import { EXTRAS } from "@/lib/packs";
import { FadeUp } from "@/components/motion/FadeUp";

export function ExtrasTable() {
  const locale = useLocale() as "es" | "en";
  const t = useTranslations("services.extras");

  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <FadeUp className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{t("title")}</h2>
          <p className="mt-4 text-base text-[var(--color-text-body)]">{t("subtitle")}</p>
        </FadeUp>

        <FadeUp className="mt-10">
          <ul className="divide-y divide-[var(--color-divider)] border-y border-[var(--color-border-default)]">
            {EXTRAS.map((e) => (
              <li key={e.name.es} className="flex flex-col justify-between gap-2 py-5 md:flex-row md:items-center">
                <span className="text-base font-medium">{e.name[locale]}</span>
                <span className="font-display text-lg font-semibold text-[var(--color-accent)]">{e.price}</span>
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}
