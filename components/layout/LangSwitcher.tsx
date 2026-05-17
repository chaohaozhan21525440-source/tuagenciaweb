"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { alternatePath, type Locale, type Dict } from "@/lib/i18n";

export function LangSwitcher({
  locale,
  dict,
  className,
}: {
  locale: Locale;
  dict: Dict["langSwitcher"];
  className?: string;
}) {
  const pathname = usePathname() ?? "/";
  const target: Locale = locale === "es" ? "en" : "es";
  const href = alternatePath(pathname, target);
  const targetLabel = target === "es" ? dict.shortEs : dict.shortEn;
  const currentLabel = locale === "es" ? dict.shortEs : dict.shortEn;

  return (
    <Link
      href={href}
      hrefLang={target}
      aria-label={`${dict.label}: ${target.toUpperCase()}`}
      className={
        className ??
        "inline-flex items-center gap-1.5 rounded-full border border-[var(--color-ink-100,#E5E7EB)] bg-white px-3 py-1.5 text-[12.5px] font-semibold text-[var(--color-ink-700,#475569)] transition hover:border-[var(--color-brand,#1F6BFF)] hover:text-[var(--color-brand,#1F6BFF)]"
      }
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <span aria-hidden>{currentLabel}</span>
      <span aria-hidden className="text-[var(--color-ink-300,#94A3B8)]">/</span>
      <span aria-hidden>{targetLabel}</span>
    </Link>
  );
}
