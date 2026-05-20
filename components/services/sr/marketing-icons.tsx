import type { ReactElement, SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const ICONS: Record<string, ReactElement> = {
  pin: (
    <svg {...base}>
      <path d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  gauge: (
    <svg {...base}>
      <path d="M4 14a8 8 0 1 1 16 0" />
      <path d="m12 14 4-4" />
    </svg>
  ),
  link: (
    <svg {...base}>
      <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1.5 1.5" />
      <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1.5-1.5" />
    </svg>
  ),
  google: (
    <svg {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M21 12h-9V8" />
    </svg>
  ),
  meta: (
    <svg {...base}>
      <path d="M3 12c0-4 2-7 5-7 4 0 6 7 8 7 2 0 3-2 3-3" />
      <path d="M3 12c0 4 2 7 5 7 4 0 6-7 8-7" />
    </svg>
  ),
  chart: (
    <svg {...base}>
      <path d="M4 20V8" />
      <path d="M10 20v-7" />
      <path d="M16 20v-4" />
      <path d="M22 20H2" />
    </svg>
  ),
  target: (
    <svg {...base}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  ),
  workflow: (
    <svg {...base}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <path d="M10 7h3a3 3 0 0 1 3 3v4" />
    </svg>
  ),
};
