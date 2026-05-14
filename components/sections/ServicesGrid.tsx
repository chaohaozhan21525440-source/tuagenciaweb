"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "@phosphor-icons/react";
import { PACKS } from "@/lib/packs";
import { FadeUp } from "@/components/motion/FadeUp";
import { cn } from "@/lib/cn";

export function ServicesGrid() {
  const locale = useLocale() as "es" | "en";
  const t = useTranslations("home.services");

  return (
    <section className="py-24">
      <div className="container-page">
        <FadeUp className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{t("title")}</h2>
          <p className="mt-4 text-base text-[var(--color-text-body)] md:text-lg">{t("subtitle")}</p>
        </FadeUp>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PACKS.map((pack, i) => (
            <FadeUp key={pack.id} delay={i * 0.08}>
              <article
                className={cn(
                  "flex h-full flex-col rounded-[var(--radius-card)] border bg-[var(--color-elevated)] p-8",
                  pack.highlight ? "border-[var(--color-accent)] shadow-[0_20px_60px_-30px_rgba(44,91,255,0.45)]" : "border-[var(--color-border-default)]",
                )}
              >
                {pack.highlight && <Badge className="mb-4 w-fit bg-[var(--color-accent-soft)] text-[var(--color-accent)]">{t("mostChosen")}</Badge>}
                <pack.Icon size={32} weight="duotone" className="text-[var(--color-accent)]" />
                <h3 className="mt-4 font-display text-2xl font-bold">{pack.name[locale]}</h3>
                <p className="mt-2 text-sm text-[var(--color-text-body)]">{pack.tagline[locale]}</p>
                <p className="mt-6 font-display text-4xl font-bold tracking-tight">{pack.price}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{pack.priceNote[locale]}</p>
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {pack.features[locale].map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-[var(--color-text-body)]">
                      <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-[var(--color-accent)]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs font-medium text-[var(--color-text-strong)]">{pack.delivery[locale]}</p>
                <Button asChild className="mt-6 w-full" variant={pack.highlight ? "default" : "ghost"}>
                  <Link href="/contacto">{pack.cta[locale]}</Link>
                </Button>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
