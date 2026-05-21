"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { servicePath, type ServiceId } from "@/lib/services";

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function ServicesNav({
  label,
  items,
  locale,
}: {
  label: string;
  items: ReadonlyArray<{ num: string; id: string; title: string }>;
  locale: Locale;
}) {
  return (
    <aside className="sr-nav" aria-label={label}>
      <div className="sr-nav-label">{label}</div>
      <ul>
        {items.map((it) => {
          const id = it.id as ServiceId;
          return (
            <li key={id}>
              <Link href={servicePath(id, locale)}>
                <span className="sr-nav-num">{it.num}</span>
                <span className="sr-nav-title">{it.title}</span>
                <span className="sr-nav-arrow"><ArrowRight /></span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
