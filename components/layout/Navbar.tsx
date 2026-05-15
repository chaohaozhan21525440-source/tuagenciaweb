"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { List, X } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

export function Navbar() {
  const t = useTranslations("common.nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/servicios", label: t("services") },
    { href: "/portfolio", label: t("portfolio") },
    { href: "/sobre-nosotros", label: t("about") },
    { href: "/blog", label: t("blog") },
    { href: "/contacto", label: t("contact") },
  ] as const;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-[var(--color-border-default)] bg-[var(--color-canvas)]/85 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center" aria-label="Tuagenciaweb">
          <Image src="/logo/logo-full.png" alt="Tuagenciaweb" width={200} height={50} priority className="h-10 w-auto" />
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href as never} className="text-sm font-medium text-[var(--color-text-body)] transition-colors hover:text-[var(--color-text-strong)]">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <LocaleSwitcher />
          <Button asChild>
            <Link href="/contacto">{t("cta")}</Link>
          </Button>
        </div>

        <button className="md:hidden" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
          {open ? <X size={28} weight="regular" /> : <List size={28} weight="regular" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-[var(--color-border-default)] bg-[var(--color-canvas)] md:hidden">
          <ul className="container-page flex flex-col gap-2 py-6">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href as never} className="block py-2 text-lg font-medium" onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-2 pt-4">
              <LocaleSwitcher />
              <Button asChild className="flex-1">
                <Link href="/contacto" onClick={() => setOpen(false)}>{t("cta")}</Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
