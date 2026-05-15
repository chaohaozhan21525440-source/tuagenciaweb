import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const NAV = [
  { href: "/servicios", key: "services" },
  { href: "/portfolio", key: "portfolio" },
  { href: "/sobre-nosotros", key: "about" },
  { href: "/blog", key: "blog" },
  { href: "/contacto", key: "contact" },
] as const;

const LEGAL = [
  { href: "/legal/aviso-legal", key: "legalNotice" },
  { href: "/legal/privacidad", key: "privacy" },
  { href: "/legal/cookies", key: "cookies" },
] as const;

export function SiteFooter() {
  const tFooter = useTranslations("common.footer");
  const tNav = useTranslations("common.nav");
  const tChannels = useTranslations("contact.channels");

  return (
    <footer className="mt-24 border-t border-[var(--color-ink-200)] bg-[var(--color-ink-50)] text-[var(--color-ink-700)]">
      <div className="container-page grid grid-cols-1 gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Image
            src="/logo/logo-full.svg"
            alt="Tuagenciaweb"
            width={300}
            height={50}
            className="h-8 w-auto"
          />
          <p className="mt-4 max-w-xs text-sm text-[var(--color-ink-500)]">{tFooter("tagline")}</p>
        </div>

        <div className="md:col-span-2">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-400)]">
            {tFooter("sections.product")}
          </h3>
          <ul className="space-y-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href as never}
                  className="text-sm text-[var(--color-ink-700)] hover:text-[var(--color-ink-900)]"
                >
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-400)]">
            {tFooter("sections.contact")}
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://wa.me/34000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-ink-900)]"
              >
                {tChannels("whatsapp")}
              </a>
            </li>
            <li>
              <a href="mailto:hola@tuagenciaweb.es" className="hover:text-[var(--color-ink-900)]">
                hola@tuagenciaweb.es
              </a>
            </li>
            <li className="text-[var(--color-ink-500)]">{tChannels("scheduleValue")}</li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-400)]">
            {tFooter("sections.legal")}
          </h3>
          <ul className="space-y-2">
            {LEGAL.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href as never}
                  className="text-sm text-[var(--color-ink-700)] hover:text-[var(--color-ink-900)]"
                >
                  {tFooter(`links.${item.key}` as never)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--color-ink-200)]">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-[var(--color-ink-400)] md:flex-row">
          <span>{tFooter("legalLine")}</span>
          <span className="font-medium uppercase tracking-[0.2em]">{tFooter("microclaim")}</span>
        </div>
      </div>
    </footer>
  );
}
