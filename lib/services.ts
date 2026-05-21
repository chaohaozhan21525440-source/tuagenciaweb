import { ROUTES, type Locale } from "./i18n";

export const SERVICE_IDS = ["design", "shop", "seo", "maintenance"] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

export const SERVICE_SLUGS: Record<ServiceId, Record<Locale, string>> = {
  design:      { es: "diseno-web",     en: "web-design" },
  shop:        { es: "tiendas-online", en: "online-stores" },
  seo:         { es: "seo-tecnico",    en: "technical-seo" },
  maintenance: { es: "mantenimiento",  en: "maintenance" },
};

export function servicePath(id: ServiceId, locale: Locale): string {
  return `${ROUTES.services[locale]}/${SERVICE_SLUGS[id][locale]}`;
}

/**
 * Reverse lookup: given a slug and locale, return the ServiceId or null
 * if the slug doesn't match any known service. Used by [slug] route to
 * map URL → dict key.
 */
export function slugToId(slug: string, locale: Locale): ServiceId | null {
  for (const id of SERVICE_IDS) {
    if (SERVICE_SLUGS[id][locale] === slug) return id;
  }
  return null;
}

export function getServicePathsForStaticParams(locale: Locale): Array<{ slug: string }> {
  return SERVICE_IDS.map((id) => ({ slug: SERVICE_SLUGS[id][locale] }));
}
