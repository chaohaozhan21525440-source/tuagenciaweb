import { useTranslations } from "next-intl";

const PLACEHOLDER_LOGOS = ["Clínica Sofía", "Vilaró Abogados", "Reformlab", "Forma", "Chinaway", "Nordia"];

export function LogosTrust() {
  const t = useTranslations("home.logosTrust");
  return (
    <section className="border-y border-[var(--color-ink-200)] bg-white py-6">
      <div className="container-page flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <p className="text-[13px] font-medium text-[var(--color-ink-500)]">{t("title")}</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {PLACEHOLDER_LOGOS.map((name) => (
            <li
              key={name}
              className="inline-flex items-center gap-2 text-[var(--color-ink-400)] grayscale opacity-80"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-ink-100)] text-[10px] font-bold uppercase text-[var(--color-ink-500)]">
                {name[0]}
              </span>
              <span className="text-sm font-medium tracking-tight">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
