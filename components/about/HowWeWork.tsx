import Image from "next/image";
import { useTranslations } from "next-intl";
import { Clock, Check } from "@phosphor-icons/react/dist/ssr";
import { FadeUp } from "@/components/motion/FadeUp";

export function HowWeWork() {
  const t = useTranslations("about.howWeWork");
  const bullets = t.raw("bullets") as string[];

  return (
    <section className="py-20 md:py-28">
      <div className="container-page grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16">
        <FadeUp className="md:col-span-7">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{t("title")}</h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-text-body)] md:text-lg">{t("body")}</p>
          <ul className="mt-8 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex gap-3 text-sm text-[var(--color-text-body)]">
                <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-[var(--color-accent)]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </FadeUp>

        <FadeUp delay={0.1} className="relative md:col-span-5">
          <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-default)] shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25)]">
            <Image
              src="/team/office.jpg"
              alt=""
              width={1200}
              height={800}
              className="h-auto w-full"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-elevated)] px-4 py-3 shadow-[0_15px_40px_-15px_rgba(15,23,42,0.20)]">
            <Clock size={22} weight="duotone" className="text-[var(--color-accent)]" />
            <div>
              <p className="font-display text-lg font-bold leading-none">{t("badgeMetric")}</p>
              <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">{t("badgeLabel")}</p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
