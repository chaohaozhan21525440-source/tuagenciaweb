import { useTranslations } from "next-intl";
import { Lightning, MagnifyingGlass, DeviceMobile, Headset, Handshake, Code } from "@phosphor-icons/react/dist/ssr";
import { FadeUp } from "@/components/motion/FadeUp";

const ICONS = [Lightning, MagnifyingGlass, DeviceMobile, Headset, Handshake, Code];

export function Differentiators() {
  const t = useTranslations("home.differentiators");
  const items = t.raw("items") as Array<{ title: string; body: string }>;

  return (
    <section className="bg-[var(--color-elevated)] py-24">
      <div className="container-page">
        <FadeUp className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{t("title")}</h2>
        </FadeUp>

        <div className="mt-12 grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? Lightning;
            return (
              <FadeUp key={item.title} delay={i * 0.05}>
                <div className="flex gap-5 border-t border-[var(--color-border-default)] py-7 first:border-t-0 md:[&:nth-child(2)]:border-t-0">
                  <Icon size={28} weight="duotone" className="shrink-0 text-[var(--color-accent)]" />
                  <div>
                    <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-[var(--color-text-body)]">{item.body}</p>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
