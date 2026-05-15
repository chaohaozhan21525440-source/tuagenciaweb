import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { FadeUp } from "@/components/motion/FadeUp";

export function FinalCTA() {
  const t = useTranslations("home.finalCta");
  return (
    <section className="relative overflow-hidden bg-[var(--color-dark)] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      <div className="container-page relative py-24 md:py-32">
        <FadeUp className="max-w-3xl">
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tighter md:text-6xl">{t("title")}</h2>
          <p className="mt-5 text-base text-white/75 md:text-lg">{t("body")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg"><Link href="/contacto">{t("ctaPrimary")}</Link></Button>
            <Button asChild size="lg" variant="ghost" className="border-white/20 bg-transparent text-white hover:bg-white/10">
              <a href="https://wa.me/34000000000" target="_blank" rel="noopener noreferrer">
                <WhatsappLogo size={20} weight="fill" />
                {t("ctaSecondary")}
              </a>
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
