import type { Locale } from "./config";

export type RouteKey = "home" | "about" | "contact";

export const ROUTES: Record<RouteKey, Record<Locale, string>> = {
  home: { es: "/es", en: "/en" },
  about: { es: "/es/sobre-nosotros", en: "/en/about" },
  contact: { es: "/es/contacto", en: "/en/contact" },
};

export const SECTION_HASHES = {
  services: "servicios",
  projects: "proyectos",
  pricing: "precios",
  faq: "faq",
} as const;

export function path(key: RouteKey, locale: Locale): string {
  return ROUTES[key][locale];
}

export function sectionPath(
  key: RouteKey,
  locale: Locale,
  hash: keyof typeof SECTION_HASHES,
): string {
  return `${ROUTES[key][locale]}#${SECTION_HASHES[hash]}`;
}

/**
 * Build the equivalent URL in the other locale from the current pathname.
 * Falls back to the home of the target locale if no match.
 */
export function alternatePath(pathname: string, target: Locale): string {
  for (const route of Object.values(ROUTES)) {
    for (const loc of ["es", "en"] as const) {
      if (route[loc] === pathname) return route[target];
    }
  }
  return ROUTES.home[target];
}
