import { useTranslations } from "next-intl";
import { FadeUp } from "@/components/motion/FadeUp";

export function TrustBar() {
  const t = useTranslations("home.trust");
  const sectors = t.raw("sectors") as string[];

  return (
    <section className="border-y border-[var(--color-border-default)] bg-[var(--color-elevated)]">
      <FadeUp>
        <div className="container-page flex flex-col items-center gap-6 py-10 md:flex-row md:justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">{t("title")}</p>
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-3">
            {sectors.map((s) => (
              <li key={s} className="text-base font-medium text-[var(--color-text-body)]">{s}</li>
            ))}
          </ul>
        </div>
      </FadeUp>
    </section>
  );
}
