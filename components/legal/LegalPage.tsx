import { useTranslations } from "next-intl";
import { FadeUp } from "@/components/motion/FadeUp";

export function LegalPage({ title, lastUpdated, children }: { title: string; lastUpdated: string; children: React.ReactNode }) {
  const t = useTranslations("legal");
  return (
    <main className="container-page max-w-3xl py-16 md:py-24">
      <FadeUp>
        <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tighter md:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">{t("lastUpdated")}: {lastUpdated}</p>
      </FadeUp>
      <article className="prose prose-slate mt-10 max-w-none">{children}</article>
    </main>
  );
}
