import { useTranslations } from "next-intl";
import { Coins, Lightning, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { FadeUp } from "@/components/motion/FadeUp";

type Item = { title: string; body: string };

const ICONS = [Lightning, Coins, Sparkle];

export function ValueProps() {
  const t = useTranslations("home.valueProps");
  const items = t.raw("items") as Item[];

  return (
    <section className="py-20 md:py-24">
      <div className="container-page grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((item, i) => {
          const Icon = ICONS[i] ?? Lightning;
          return (
            <FadeUp key={item.title} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-[var(--color-ink-200)] bg-white p-8 shadow-[var(--shadow-ring)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-chip)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                  <Icon size={22} weight="bold" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink-500)]">{item.body}</p>
              </article>
            </FadeUp>
          );
        })}
      </div>
    </section>
  );
}
