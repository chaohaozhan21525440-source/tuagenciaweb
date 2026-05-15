"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const t = useTranslations("common.nav");
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "/servicios", label: t("services") },
    { href: "/portfolio", label: t("portfolio") },
    { href: "/#precios", label: t("pricing") },
    { href: "/blog", label: t("blog") },
    { href: "/contacto", label: t("contact") },
  ] as const;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-[var(--color-ink-200)] bg-white/72 backdrop-blur-md"
          : "border-b border-transparent bg-white/40 backdrop-blur-sm",
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center" aria-label="Tuagenciaweb">
          <Image
            src="/logo/logo-full.svg"
            alt="Tuagenciaweb"
            width={300}
            height={50}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href as never}
                className="link-underline text-sm font-medium text-[var(--color-ink-700)] transition-colors hover:text-[var(--color-ink-900)]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <LocaleSwitcher />
          <Link
            href="/contacto"
            className="group inline-flex h-11 items-center gap-1.5 rounded-[var(--radius-control)] bg-[var(--color-accent)] px-4 text-sm font-medium text-white shadow-[var(--shadow-lift)] transition-all duration-200 hover:bg-[var(--color-accent-hover)] active:scale-[0.98]"
          >
            {t("cta")}
            <ArrowUpRight
              size={16}
              weight="bold"
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-ink-200)] bg-white md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} weight="bold" aria-hidden /> : <List size={22} weight="bold" aria-hidden />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-30 bg-[var(--color-ink-900)]/40 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              key="drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menú principal"
              className="fixed right-0 top-0 z-40 flex h-[100dvh] w-[88vw] max-w-sm flex-col gap-2 bg-white p-6 shadow-2xl md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between pb-6">
                <Image src="/logo/logo-mark.svg" alt="Tuagenciaweb" width={32} height={32} className="h-7 w-auto" />
                <button
                  className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-ink-200)]"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar menú"
                >
                  <X size={20} weight="bold" aria-hidden />
                </button>
              </div>
              <ul className="flex flex-col gap-1">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href as never}
                      className="block rounded-[var(--radius-control)] px-3 py-3 font-display text-lg font-semibold text-[var(--color-ink-900)] hover:bg-[var(--color-accent-soft)]"
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-center gap-3 pt-6">
                <LocaleSwitcher />
                <Link
                  href="/contacto"
                  className="inline-flex h-12 flex-1 items-center justify-center gap-1.5 rounded-[var(--radius-control)] bg-[var(--color-accent)] px-4 text-sm font-medium text-white"
                  onClick={() => setOpen(false)}
                >
                  {t("cta")}
                  <ArrowUpRight size={16} weight="bold" aria-hidden />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
