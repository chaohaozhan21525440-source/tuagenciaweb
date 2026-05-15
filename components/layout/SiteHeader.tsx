"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#precios", label: "Precios" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#contacto", label: "Contacto" },
];

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
        scrolled
          ? "border-b border-[var(--color-ink-100)] bg-white/80 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center" aria-label="Tuagenciaweb">
          <Image src="/logo/logo-full.svg" alt="Tuagenciaweb" width={170} height={36} priority className="h-8 w-auto md:h-9" />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-medium text-[var(--color-ink-500)] transition-colors hover:text-[var(--color-ink-900)]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#contacto"
            className="ring-brand inline-flex items-center gap-1.5 rounded-[var(--radius-control)] bg-[var(--color-ink-900)] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[var(--color-ink-700)] active:scale-[0.98]"
          >
            Solicitar presupuesto
            <ArrowUpRight size={16} weight="bold" />
          </a>
        </div>

        <button
          className="md:hidden"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={28} /> : <List size={28} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-[var(--color-ink-100)] bg-white md:hidden">
          <ul className="container-page flex flex-col gap-1 py-4">
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
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-[var(--radius-control)] bg-[var(--color-ink-900)] px-4 py-3 text-sm font-semibold text-white"
              >
                Solicitar presupuesto
                <ArrowUpRight size={16} weight="bold" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
