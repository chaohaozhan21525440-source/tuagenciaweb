import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { buildMetadata } from "@/lib/seo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PacksDetailed } from "@/components/sections/PacksDetailed";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { ExtrasTable } from "@/components/sections/ExtrasTable";
import { CTAFinal } from "@/components/home/CTAFinal";
import { FadeUp } from "@/components/motion/FadeUp";

function ServicesHero() {
  const t = useTranslations("services.hero");
  return (
    <section className="container-page pt-16 md:pt-24">
      <FadeUp className="max-w-3xl">
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tighter md:text-6xl">{t("title")}</h1>
        <p className="mt-5 text-base text-[var(--color-text-body)] md:text-lg">{t("subtitle")}</p>
      </FadeUp>
    </section>
  );
}

function ServicesFAQ() {
  const t = useTranslations("services.faq");
  const items = t.raw("items") as Array<{ q: string; a: string }>;
  return (
    <section className="bg-[var(--color-elevated)] py-16 md:py-24">
      <div className="container-page max-w-3xl">
        <FadeUp>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{t("title")}</h2>
        </FadeUp>
        <FadeUp className="mt-8">
          <Accordion type="single" collapsible>
            {items.map((it, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold">{it.q}</AccordionTrigger>
                <AccordionContent className="text-[var(--color-text-body)]">{it.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeUp>
      </div>
    </section>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.hero" });
  return buildMetadata({
    locale: locale as "es" | "en",
    path: "/servicios",
    title: `${t("title")} · Tuagenciaweb`,
    description: t("subtitle"),
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <ServicesHero />
      <PacksDetailed />
      <ComparisonTable />
      <ExtrasTable />
      <ServicesFAQ />
      <CTAFinal />
    </main>
  );
}
