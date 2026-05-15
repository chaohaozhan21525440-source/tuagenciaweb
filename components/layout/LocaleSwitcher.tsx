"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const setLocale = (next: "es" | "en") => {
    if (next === locale) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.replace(pathname as any, { locale: next });
  };

  return (
    <div
      role="group"
      aria-label="Cambiar idioma"
      className="inline-flex items-center gap-1 rounded-[var(--radius-chip)] border border-[var(--color-ink-200)] bg-white p-1"
    >
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-label={`Switch to ${l.toUpperCase()}`}
          aria-current={locale === l}
          className={cn(
            "h-7 min-w-7 rounded-[8px] px-2 text-xs font-semibold transition-colors",
            locale === l
              ? "bg-[var(--color-accent)] text-white"
              : "text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)]",
          )}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
