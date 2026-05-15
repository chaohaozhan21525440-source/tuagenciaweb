import { useTranslations } from "next-intl";
import {
  Browsers,
  ChartLineUp,
  ShoppingCart,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";
import { FadeUp } from "@/components/motion/FadeUp";

type Item = { title: string; body: string };

const ICONS = [Browsers, ShoppingCart, ChartLineUp, Wrench];

export function ServicesGrid() {
  const t = useTranslations("home.services");
  const items = t.raw("items") as Item[];

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

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? Browsers;
            return (
              <FadeUp key={item.title} delay={i * 0.08}>
                <article className="group h-full rounded-[var(--radius-card)] border border-[var(--color-ink-200)] bg-white p-8 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
                  <div className="flex items-start gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-chip)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                      <Icon size={22} weight="bold" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-bold tracking-tight">{item.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink-500)]">{item.body}</p>
                    </div>
                  </div>
                </article>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
