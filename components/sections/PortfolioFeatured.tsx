import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { getFeatured } from "@/lib/portfolio";
import { FadeUp } from "@/components/motion/FadeUp";

export function PortfolioFeatured() {
  const t = useTranslations("home.portfolio");
  const items = getFeatured();

  return (
    <section className="py-24">
      <div className="container-page">
        <FadeUp className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{t("title")}</h2>
          <p className="mt-4 text-base text-[var(--color-text-body)] md:text-lg">{t("subtitle")}</p>
        </FadeUp>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {items.map((p, i) => (
            <FadeUp key={p.slug} delay={i * 0.08}>
              <a
                href={p.url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-default)] bg-[var(--color-elevated)] transition-all hover:-translate-y-1 hover:shadow-[0_25px_60px_-30px_rgba(15,23,42,0.25)]"
              >
                <div className="aspect-[16/10] overflow-hidden bg-[var(--color-divider)]">
                  <Image src={p.image} alt={p.name} width={1280} height={800} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" unoptimized />
                </div>
                <div className="flex items-center justify-between p-6">
                  <div>
                    <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                    <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">{p.sector} · {p.year}</p>
                  </div>
                  <ArrowUpRight size={24} className="text-[var(--color-accent)] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </a>
            </FadeUp>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild variant="ghost"><Link href="/portfolio">{t("cta")} →</Link></Button>
        </div>
      </div>
    </section>
  );
}
