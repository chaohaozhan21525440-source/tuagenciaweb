import { useTranslations } from "next-intl";
import { FadeUp } from "@/components/motion/FadeUp";

export function ProcessSteps() {
  const t = useTranslations("home.process");
  const steps = t.raw("steps") as Array<{ title: string; body: string }>;

  return (
    <section className="py-24">
      <div className="container-page">
        <FadeUp className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{t("title")}</h2>
          <p className="mt-4 text-base text-[var(--color-text-body)] md:text-lg">{t("subtitle")}</p>
        </FadeUp>

        <ol className="relative mt-12 grid grid-cols-1 gap-y-10 md:grid-cols-4 md:gap-x-8">
          {steps.map((s, i) => (
            <FadeUp key={s.title} delay={i * 0.08}>
              <li className="relative">
                <div className="font-display text-6xl font-bold leading-none">
                  <span className="bg-clip-text text-transparent" style={{ WebkitTextStroke: "1.5px var(--color-accent)" }}>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-text-body)]">{s.body}</p>
              </li>
            </FadeUp>
          ))}
        </ol>
      </div>
    </section>
  );
}
