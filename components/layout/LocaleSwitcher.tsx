"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const next = locale === "es" ? "en" : "es";

  return (
    <Button
      variant="ghost"
      size="sm"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClick={() => router.replace(pathname as any, { locale: next })}
      aria-label={`Switch to ${next.toUpperCase()}`}
    >
      {next.toUpperCase()}
    </Button>
  );
}
