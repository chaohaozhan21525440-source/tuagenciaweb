import { useTranslations } from "next-intl";
import { WhatsappLogo, EnvelopeSimple, Phone } from "@phosphor-icons/react/dist/ssr";

export function ContactChannels() {
  const t = useTranslations("contact.channels");
  return (
    <aside className="rounded-[var(--radius-card)] border border-[var(--color-border-default)] bg-[var(--color-elevated)] p-8">
      <h2 className="font-display text-xl font-semibold">{t("title")}</h2>
      <ul className="mt-6 space-y-5 text-sm">
        <li className="flex items-center gap-3">
          <WhatsappLogo size={20} weight="fill" className="text-[var(--color-accent)]" />
          <a href="https://wa.me/34000000000" target="_blank" rel="noopener noreferrer">{t("whatsapp")}: +34 000 000 000</a>
        </li>
        <li className="flex items-center gap-3">
          <EnvelopeSimple size={20} className="text-[var(--color-accent)]" />
          <a href="mailto:hola@tuagenciaweb.es">hola@tuagenciaweb.es</a>
        </li>
        <li className="flex items-center gap-3">
          <Phone size={20} className="text-[var(--color-accent)]" />
          <a href="tel:+34000000000">+34 000 000 000</a>
        </li>
      </ul>
      <hr className="my-6 border-[var(--color-border-default)]" />
      <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">{t("schedule")}</p>
      <p className="text-sm font-medium">{t("scheduleValue")}</p>
      <p className="mt-4 text-xs uppercase tracking-wider text-[var(--color-text-muted)]">{t("location")}</p>
    </aside>
  );
}
