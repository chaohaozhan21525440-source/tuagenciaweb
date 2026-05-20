"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import type { Dict, Locale } from "@/lib/i18n";
import { path, sectionPath } from "@/lib/i18n";
import { LangSwitcher } from "./LangSwitcher";

const List = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const X = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export function SiteHeader({
  locale,
  dict,
  langDict,
}: {
  locale: Locale;
  dict: Dict["nav"];
  langDict: Dict["langSwitcher"];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { href: path("home", locale), label: dict.home },
    { href: path("services", locale), label: dict.services },
    { href: sectionPath("home", locale, "projects"), label: dict.projects },
    { href: path("blog", locale), label: dict.blog },
    { href: path("about", locale), label: dict.about },
    { href: path("contact", locale), label: dict.contact },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "border-b border-[var(--color-ink-100)] bg-white/80 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-[1280px] items-center px-6 pt-7 pb-3 md:px-8">
        <Link href={path("home", locale)} className="flex items-center" aria-label="Tuagenciaweb">
          <Image
            src="/logo/logo-design.svg"
            alt="tuagenciaweb"
            width={907}
            height={535}
            priority
            className="block h-12 w-auto"
          />
        </Link>

        <nav className="mx-auto hidden items-center gap-8 text-[15px] font-medium text-[var(--color-ink-700)] lg:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-[var(--color-ink-900)]">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 lg:ml-0 lg:flex">
          <LangSwitcher locale={locale} dict={langDict} />
          <Link
            href={path("contact", locale)}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-brand)] px-5 py-2.5 text-[14.5px] font-semibold text-white shadow-[0_18px_40px_-12px_rgba(37,99,235,0.55)] transition-colors hover:bg-[var(--color-brand-hover)]"
          >
            {dict.quote}
          </Link>
        </div>

        <button
          className="ml-auto -mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-[var(--color-ink-900)] lg:hidden"
          aria-label={dict.menuLabel}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-7 w-7" /> : <List className="h-7 w-7" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--color-ink-100)] bg-white lg:hidden">
          <ul className="mx-auto max-w-[1280px] px-6 py-4 md:px-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-lg font-medium text-[var(--color-ink-900)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="flex items-center justify-between pt-3">
              <LangSwitcher locale={locale} dict={langDict} />
              <Link
                href={path("contact", locale)}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-4 py-3 text-sm font-semibold text-white"
              >
                {dict.quote}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
