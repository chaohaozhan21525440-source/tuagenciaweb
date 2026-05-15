"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#precios", label: "Precios" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/contacto", label: "Contacto" },
];

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

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "border-b border-[var(--color-ink-100)] bg-white/80 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-[1280px] items-center px-6 pt-7 pb-3 md:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Tuagenciaweb">
          <Image src="/logo/logo-mark.png" alt="" aria-hidden width={64} height={64} priority className="block h-9 w-auto" />
          <Image src="/logo/logo-wordmark.png" alt="tuagenciaweb" width={300} height={60} priority className="block h-[22px] w-auto" />
        </Link>

        <nav className="mx-auto hidden items-center gap-9 text-[14.5px] font-medium text-[var(--color-ink-700)] lg:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-[var(--color-ink-900)]">
              {item.label}
            </a>
          ))}
        </nav>

        <Link
          href="/contacto"
          className="ml-auto hidden lg:ml-0 lg:inline-flex items-center gap-2 rounded-xl bg-[var(--color-brand)] px-5 py-2.5 text-[14.5px] font-semibold text-white shadow-[0_18px_40px_-12px_rgba(37,99,235,0.55)] transition-colors hover:bg-[var(--color-brand-hover)]"
        >
          Solicitar presupuesto
        </Link>

        <button className="ml-auto lg:hidden" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
          {open ? <X className="h-7 w-7" /> : <List className="h-7 w-7" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--color-ink-100)] bg-white lg:hidden">
          <ul className="mx-auto max-w-[1280px] px-6 py-4 md:px-8">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-lg font-medium text-[var(--color-ink-900)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <Link
                href="/contacto"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-4 py-3 text-sm font-semibold text-white"
              >
                Solicitar presupuesto
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
