"use client";

import { useLocale, useTranslations } from "next-intl";
import { Check, X } from "@phosphor-icons/react";
import { PACKS } from "@/lib/packs";
import { FadeUp } from "@/components/motion/FadeUp";

const ROWS: Array<{ key: string; labels: { es: string; en: string }; values: Record<string, boolean | string> }> = [
  { key: "pages", labels: { es: "Páginas incluidas", en: "Pages included" }, values: { essential: "1", professional: "6", shop: "10+" } },
  { key: "blog", labels: { es: "Blog", en: "Blog" }, values: { essential: false, professional: true, shop: true } },
  { key: "i18n", labels: { es: "Multi-idioma", en: "Multi-language" }, values: { essential: false, professional: true, shop: true } },
  { key: "seo", labels: { es: "SEO técnico", en: "Technical SEO" }, values: { essential: false, professional: true, shop: true } },
  { key: "shop", labels: { es: "Tienda online", en: "Online shop" }, values: { essential: false, professional: false, shop: true } },
  { key: "support", labels: { es: "Soporte incluido", en: "Support included" }, values: { essential: "—", professional: "3 meses", shop: "6 meses" } },
  { key: "delivery", labels: { es: "Entrega", en: "Delivery" }, values: { essential: "7 días", professional: "14 días", shop: "21 días" } },
];

export function ComparisonTable() {
  const locale = useLocale() as "es" | "en";
  const t = useTranslations("services");

  return (
    <section className="bg-[var(--color-elevated)] py-16 md:py-24">
      <div className="container-page">
        <FadeUp>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{t("compareTitle")}</h2>
        </FadeUp>

        <FadeUp className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--color-border-default)]">
                <th className="py-4 text-sm font-semibold text-[var(--color-text-muted)]"></th>
                {PACKS.map((p) => (
                  <th key={p.id} className="px-4 py-4 text-sm font-semibold">{p.name[locale]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.key} className="border-b border-[var(--color-divider)]">
                  <td className="py-4 text-sm text-[var(--color-text-body)]">{r.labels[locale]}</td>
                  {PACKS.map((p) => {
                    const v = r.values[p.id];
                    return (
                      <td key={p.id} className="px-4 py-4 text-sm">
                        {v === true ? <Check size={20} weight="bold" className="text-[var(--color-accent)]" /> : v === false ? <X size={20} className="text-[var(--color-text-muted)]" /> : <span>{v}</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </FadeUp>
      </div>
    </section>
  );
}
