import { useTranslations } from "next-intl";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FadeUp } from "@/components/motion/FadeUp";

export function FAQ() {
  const t = useTranslations("home.faq");
  const items = t.raw("items") as Array<{ q: string; a: string }>;

  return (
    <section className="bg-[var(--color-elevated)] py-24">
      <div className="container-page grid grid-cols-1 gap-12 md:grid-cols-12">
        <FadeUp className="md:col-span-5">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{t("title")}</h2>
          <p className="mt-4 text-base text-[var(--color-text-body)]">{t("subtitle")}</p>
        </FadeUp>

        <FadeUp className="md:col-span-7">
          <Accordion type="single" collapsible className="w-full">
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
