"use client";

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function ServicesNav({
  label,
  items,
}: {
  label: string;
  items: { num: string; title: string; anchor: string }[];
}) {
  return (
    <aside className="sr-nav" aria-label={label}>
      <div className="sr-nav-label">{label}</div>
      <ul>
        {items.map((it) => (
          <li key={it.anchor}>
            <a href={`#${it.anchor}`}>
              <span className="sr-nav-num">{it.num}</span>
              <span className="sr-nav-title">{it.title}</span>
              <span className="sr-nav-arrow"><ArrowRight /></span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
