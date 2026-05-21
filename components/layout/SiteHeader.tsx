"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { Dict, Locale } from "@/lib/i18n";
import { path, sectionPath } from "@/lib/i18n";
import { servicePath, type ServiceId } from "@/lib/services";
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

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    style={{
      transform: open ? "rotate(180deg)" : "none",
      transition: "transform 0.25s ease",
    }}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const ArrowRight = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

type ServiceItem = { num: string; id: string; title: string };

function ServicesNavDropdown({
  label,
  href,
  items,
  locale,
  viewAllLabel,
}: {
  label: string;
  href: string;
  items: ServiceItem[];
  locale: Locale;
  viewAllLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const cancel = () => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
  };

  const scheduleOpen = () => {
    cancel();
    openTimer.current = window.setTimeout(() => setOpen(true), 90);
  };

  const scheduleClose = () => {
    cancel();
    closeTimer.current = window.setTimeout(() => setOpen(false), 180);
  };

  useEffect(() => () => cancel(), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={scheduleOpen}
      onMouseLeave={scheduleClose}
      onFocus={scheduleOpen}
      onBlur={(e) => {
        if (!wrapperRef.current?.contains(e.relatedTarget as Node)) {
          scheduleClose();
        }
      }}
    >
      <a
        href={href}
        className="inline-flex items-center gap-1 hover:text-[var(--color-ink-900)]"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label}
        <Chevron open={open} />
      </a>

      <div
        className={cn(
          "absolute left-1/2 top-full z-40 mt-3 w-[340px] -translate-x-1/2 rounded-2xl border border-[var(--color-ink-100)] bg-white p-2",
          "shadow-[0_24px_48px_-20px_rgba(15,23,42,0.18),0_8px_18px_-8px_rgba(15,23,42,0.08)]",
          "transition-all duration-200 ease-out",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
        role="menu"
        aria-hidden={!open}
      >
        {items.map((it) => (
          <a
            key={it.id}
            href={servicePath(it.id as ServiceId, locale)}
            role="menuitem"
            className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-[var(--color-brand-soft)]"
            onClick={() => setOpen(false)}
          >
            <span
              className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-[var(--color-brand-soft)] text-[12px] font-bold tracking-wider text-[var(--color-brand)] transition-colors group-hover:bg-white"
            >
              {it.num}
            </span>
            <span className="flex-1 text-[14.5px] font-semibold text-[var(--color-ink-900)]">
              {it.title}
            </span>
            <span className="text-[var(--color-ink-300)] transition-all group-hover:translate-x-1 group-hover:text-[var(--color-brand)]">
              <ArrowRight />
            </span>
          </a>
        ))}

        <div className="mx-2 mt-1 border-t border-[var(--color-ink-100)]" />
        <a
          href={href}
          role="menuitem"
          className="block rounded-xl px-3 py-3 text-center text-[13.5px] font-semibold text-[var(--color-brand)] transition-colors hover:bg-[var(--color-brand-soft)]"
          onClick={() => setOpen(false)}
        >
          {viewAllLabel} →
        </a>
      </div>
    </div>
  );
}

export function SiteHeader({
  locale,
  dict,
  langDict,
  servicesNavItems,
  viewAllLabel,
}: {
  locale: Locale;
  dict: Dict["nav"];
  langDict: Dict["langSwitcher"];
  servicesNavItems: ServiceItem[];
  viewAllLabel: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const servicesHref = path("services", locale);

  const nav: Array<{ key: string; href: string; label: string }> = [
    { key: "home", href: path("home", locale), label: dict.home },
    { key: "services", href: servicesHref, label: dict.services },
    { key: "projects", href: sectionPath("home", locale, "projects"), label: dict.projects },
    { key: "blog", href: path("blog", locale), label: dict.blog },
    { key: "about", href: path("about", locale), label: dict.about },
    { key: "contact", href: path("contact", locale), label: dict.contact },
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
          {nav.map((item) =>
            item.key === "services" ? (
              <ServicesNavDropdown
                key={item.key}
                label={item.label}
                href={item.href}
                items={servicesNavItems}
                locale={locale}
                viewAllLabel={viewAllLabel}
              />
            ) : (
              <a
                key={item.key}
                href={item.href}
                className="hover:text-[var(--color-ink-900)]"
              >
                {item.label}
              </a>
            ),
          )}
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
              <li key={item.key}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-lg font-medium text-[var(--color-ink-900)]"
                >
                  {item.label}
                </a>
                {item.key === "services" && (
                  <ul className="-mt-1 mb-2 ml-3 border-l border-[var(--color-ink-100)] pl-4">
                    {servicesNavItems.map((s) => (
                      <li key={s.id}>
                        <a
                          href={servicePath(s.id as ServiceId, locale)}
                          onClick={() => setOpen(false)}
                          className="block py-2 text-[15px] font-medium text-[var(--color-ink-500)]"
                        >
                          <span className="mr-2 text-[12px] font-bold tracking-wider text-[var(--color-brand)]">
                            {s.num}
                          </span>
                          {s.title}
                        </a>
                      </li>
                    ))}
                    <li>
                      <a
                        href={servicesHref}
                        onClick={() => setOpen(false)}
                        className="block py-2 text-[14px] font-semibold text-[var(--color-brand)]"
                      >
                        {viewAllLabel} →
                      </a>
                    </li>
                  </ul>
                )}
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
