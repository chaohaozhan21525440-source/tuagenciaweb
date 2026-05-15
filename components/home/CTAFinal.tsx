import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowUpRight, PhoneCall } from "@phosphor-icons/react/dist/ssr";
import { Aurora } from "@/components/animations/Aurora";

export function CTAFinal() {
  const t = useTranslations("home.ctaFinal");

  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-accent-deep)] text-white">
      <Aurora opacity={0.45} />
      <div className="container-page relative py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            {t("eyebrow")}
          </p>
          <h2
            className="mt-4 font-display font-bold leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(36px, 6vw, 64px)" }}
          >
            {t("title")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/72">{t("subtitle")}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contacto"
              className="group inline-flex h-14 items-center gap-2 rounded-[var(--radius-control)] bg-[var(--color-accent)] px-7 text-base font-semibold text-white shadow-[var(--shadow-lift)] transition-colors duration-200 hover:bg-white hover:text-[var(--color-accent-deep)] active:scale-[0.98]"
            >
              {t("ctaPrimary")}
              <ArrowUpRight
                size={18}
                weight="bold"
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <a
              href="https://wa.me/34000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-2 rounded-[var(--radius-control)] border border-white/20 px-7 text-base font-semibold text-white transition-colors duration-200 hover:bg-white/10"
            >
              <PhoneCall size={18} weight="bold" aria-hidden />
              {t("ctaSecondary")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
