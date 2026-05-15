import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FadeUp } from "@/components/motion/FadeUp";

const TECH = ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Resend", "Framer Motion"];

function AboutHero() {
  const t = useTranslations("about.hero");
  return (
    <section className="container-page grid grid-cols-1 items-center gap-10 pt-16 md:grid-cols-12 md:pt-24">
      <FadeUp className="md:col-span-7">
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tighter md:text-6xl">{t("title")}</h1>
        <p className="mt-5 text-base text-[var(--color-text-body)] md:text-lg">{t("subtitle")}</p>
      </FadeUp>
      <FadeUp delay={0.1} className="md:col-span-5">
        <div className="aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-divider)]">
          <Image src="https://picsum.photos/seed/tuagencia-team/800/1000" alt="Equipo" width={800} height={1000} className="h-full w-full object-cover" unoptimized />
        </div>
      </FadeUp>
    </section>
  );
}

function StoryBlock() {
  const t = useTranslations("about.story");
  return (
    <section className="py-16 md:py-24">
      <div className="container-page max-w-3xl">
        <FadeUp>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{t("title")}</h2>
          <p className="mt-6 text-base leading-relaxed text-[var(--color-text-body)] md:text-lg">{t("body")}</p>
        </FadeUp>
      </div>
    </section>
  );
}

function CommitmentsBlock() {
  const t = useTranslations("about.commitments");
  const items = t.raw("items") as Array<{ title: string; body: string }>;
  return (
    <section className="bg-[var(--color-elevated)] py-16 md:py-24">
      <div className="container-page">
        <FadeUp className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{t("title")}</h2>
        </FadeUp>
        <div className="mt-12 grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {items.map((it, i) => (
            <FadeUp key={it.title} delay={i * 0.05}>
              <div className="border-t border-[var(--color-border-default)] py-7 first:border-t-0 md:[&:nth-child(2)]:border-t-0">
                <h3 className="font-display text-lg font-semibold">{it.title}</h3>
                <p className="mt-1 text-sm text-[var(--color-text-body)]">{it.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechBlock() {
  const t = useTranslations("about.tech");
  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <FadeUp>
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{t("title")}</h2>
        </FadeUp>
        <FadeUp className="mt-8">
          <ul className="flex flex-wrap gap-x-10 gap-y-4 text-base font-medium text-[var(--color-text-body)]">
            {TECH.map((n) => <li key={n}>{n}</li>)}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <AboutHero />
      <StoryBlock />
      <ProcessSteps />
      <CommitmentsBlock />
      <TechBlock />
      <FinalCTA />
    </main>
  );
}
