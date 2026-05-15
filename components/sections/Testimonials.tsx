import { useTranslations } from "next-intl";
import { Quotes } from "@phosphor-icons/react/dist/ssr";
import { FadeUp } from "@/components/motion/FadeUp";

function Initials({ name }: { name: string }) {
  const initials = name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
  return (
    <div className="flex size-12 items-center justify-center rounded-full bg-[var(--color-accent-soft)] font-display text-base font-bold text-[var(--color-accent)]">
      {initials}
    </div>
  );
}

export function Testimonials() {
  const t = useTranslations("home.testimonials");
  const items = t.raw("items") as Array<{ quote: string; author: string; role: string }>;
  const [main, ...rest] = items;

  return (
    <section className="py-24">
      <div className="container-page">
        <FadeUp className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{t("title")}</h2>
        </FadeUp>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <FadeUp className="md:col-span-2">
            <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-[var(--color-border-default)] bg-[var(--color-elevated)] p-8 md:p-10">
              <Quotes size={36} weight="fill" className="text-[var(--color-accent-soft)]" />
              <blockquote className="mt-6 flex-1 font-display text-2xl font-medium leading-snug tracking-tight md:text-3xl">&ldquo;{main.quote}&rdquo;</blockquote>
              <footer className="mt-8 flex items-center gap-4">
                <Initials name={main.author} />
                <div>
                  <p className="font-semibold">{main.author}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">{main.role}</p>
                </div>
              </footer>
            </article>
          </FadeUp>

          <div className="flex flex-col gap-6">
            {rest.map((it, i) => (
              <FadeUp key={it.author} delay={(i + 1) * 0.08}>
                <article className="rounded-[var(--radius-card)] border border-[var(--color-border-default)] bg-[var(--color-elevated)] p-6">
                  <blockquote className="text-base leading-relaxed text-[var(--color-text-body)]">&ldquo;{it.quote}&rdquo;</blockquote>
                  <footer className="mt-4 flex items-center gap-3">
                    <Initials name={it.author} />
                    <div>
                      <p className="text-sm font-semibold">{it.author}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">{it.role}</p>
                    </div>
                  </footer>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
