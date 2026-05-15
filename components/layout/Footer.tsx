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

export function Footer() {
  const tFooter = useTranslations("common.footer");
  const tNav = useTranslations("common.nav");
  const tChannels = useTranslations("contact.channels");

  return (
    <footer className="mt-32 bg-[var(--color-dark)] text-white">
      <div className="container-page grid grid-cols-1 gap-12 py-16 md:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Image src="/logo/logo-full.png" alt="Tuagenciaweb" width={200} height={50} className="h-10 w-auto brightness-0 invert" />
          <p className="max-w-xs text-sm text-white/70">{tFooter("tagline")}</p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">{tFooter("sections.navigate")}</h3>
          <ul className="space-y-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href as never} className="text-sm text-white/85 hover:text-white">{tNav(item.key)}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">{tFooter("sections.contact")}</h3>
          <ul className="space-y-2 text-sm text-white/85">
            <li><a href="https://wa.me/34000000000" target="_blank" rel="noopener noreferrer">{tChannels("whatsapp")}: +34 000 000 000</a></li>
            <li><a href="mailto:hola@tuagenciaweb.es">hola@tuagenciaweb.es</a></li>
            <li><a href="tel:+34000000000">+34 000 000 000</a></li>
            <li className="text-white/60">{tChannels("scheduleValue")}</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">{tFooter("sections.legal")}</h3>
          <ul className="space-y-2">
            {LEGAL.map((item) => (
              <li key={item.href}>
                <Link href={item.href as never} className="text-sm text-white/85 hover:text-white">{tFooter(`links.${item.key}` as never)}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-6 text-xs text-white/50">{tFooter("legalLine")}</div>
      </div>
    </footer>
  );
}
