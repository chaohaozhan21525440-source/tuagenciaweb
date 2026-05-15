"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <main className="container-page flex min-h-[70vh] flex-col items-start justify-center py-24">
      <p className="font-display text-[clamp(6rem,15vw,12rem)] font-bold leading-none tracking-tighter text-[var(--color-accent)]">{t("title")}</p>
      <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight md:text-4xl">{t("subtitle")}</h1>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild><Link href="/">{t("ctaHome")}</Link></Button>
        <Button asChild variant="ghost"><Link href="/portfolio">{t("ctaPortfolio")}</Link></Button>
      </div>
    </main>
  );
}
