import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactChannels } from "@/components/sections/ContactChannels";
import { FadeUp } from "@/components/motion/FadeUp";

function ContactHero() {
  const t = useTranslations("contact.hero");
  return (
    <section className="container-page pt-16 md:pt-24">
      <FadeUp className="max-w-3xl">
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tighter md:text-6xl">{t("title")}</h1>
        <p className="mt-5 text-base text-[var(--color-text-body)] md:text-lg">{t("subtitle")}</p>
      </FadeUp>
    </section>
  );
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <ContactHero />
      <section className="py-12 md:py-20">
        <div className="container-page grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-7"><ContactForm /></div>
          <div className="md:col-span-5"><ContactChannels /></div>
        </div>
      </section>
    </main>
  );
}
