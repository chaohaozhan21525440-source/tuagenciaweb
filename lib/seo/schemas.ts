/**
 * Schema.org JSON-LD builders for SEO.
 *
 * All builders return a JSON string ready to inject into a
 * <script type="application/ld+json"> tag via dangerouslySetInnerHTML.
 */

const BASE_URL = "https://www.tuagenciaweb.es";

const BUSINESS_CORE = {
  name: "Tuagenciaweb",
  legalName: "Tuagenciaweb",
  url: BASE_URL,
  logo: `${BASE_URL}/logo/icon-512.png`,
  image: `${BASE_URL}/og-image.png`,
  email: "info@tuagenciaweb.es",
  telephone: "+34613654273",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle Pelai 46",
    addressLocality: "Barcelona",
    addressRegion: "Cataluña",
    postalCode: "08001",
    addressCountry: "ES",
  },
  sameAs: [] as string[],
};

export function buildOrganizationSchema(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    ...BUSINESS_CORE,
    description:
      "Agencia de diseño web, SEO y marketing digital en Barcelona. Webs a medida, tiendas online y mantenimiento por horas.",
  });
}

export function buildLocalBusinessSchema(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}#localbusiness`,
    ...BUSINESS_CORE,
    description:
      "Agencia web en Barcelona especializada en diseño a medida, SEO técnico, tiendas online y mantenimiento.",
    priceRange: "€€",
    areaServed: { "@type": "Country", name: "Spain" },
    geo: { "@type": "GeoCoordinates", latitude: 41.3829, longitude: 2.1729 },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
  });
}

export function buildServiceSchema(args: {
  name: string;
  description: string;
  url: string;
  areaServed?: string;
}): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    name: args.name,
    description: args.description,
    url: args.url.startsWith("http") ? args.url : `${BASE_URL}${args.url}`,
    provider: {
      "@type": "Organization",
      name: BUSINESS_CORE.name,
      url: BASE_URL,
    },
    areaServed: { "@type": "Country", name: args.areaServed ?? "Spain" },
  });
}

export function buildArticleSchema(args: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  image?: string;
  authorName?: string;
}): string {
  const absoluteUrl = args.url.startsWith("http") ? args.url : `${BASE_URL}${args.url}`;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.headline,
    description: args.description,
    url: absoluteUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl },
    datePublished: args.datePublished,
    dateModified: args.datePublished,
    image: args.image ? (args.image.startsWith("http") ? args.image : `${BASE_URL}${args.image}`) : `${BASE_URL}/og-image.png`,
    author: {
      "@type": "Organization",
      name: args.authorName ?? BUSINESS_CORE.name,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS_CORE.name,
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: BUSINESS_CORE.logo },
    },
  });
}

const MONTHS_ES: Record<string, number> = {
  ene: 1, feb: 2, mar: 3, abr: 4, may: 5, jun: 6,
  jul: 7, ago: 8, sep: 9, oct: 10, nov: 11, dic: 12,
};
const MONTHS_EN: Record<string, number> = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
};

/**
 * Parses localized blog dates into ISO 8601 (YYYY-MM-DD).
 *  - ES: "12 may 2026"  -> "2026-05-12"
 *  - EN: "May 12, 2026" -> "2026-05-12"
 * Returns "" if it can't parse (caller should fall back).
 */
export function dateToIso(date: string, locale: "es" | "en"): string {
  const clean = date.replace(",", "").trim().toLowerCase();
  const parts = clean.split(/\s+/);
  if (parts.length < 3) return "";
  let day: number, monthKey: string, year: number;
  if (locale === "es") {
    day = parseInt(parts[0], 10);
    monthKey = parts[1].slice(0, 3);
    year = parseInt(parts[2], 10);
  } else {
    monthKey = parts[0].slice(0, 3);
    day = parseInt(parts[1], 10);
    year = parseInt(parts[2], 10);
  }
  const month = (locale === "es" ? MONTHS_ES : MONTHS_EN)[monthKey];
  if (!month || !day || !year) return "";
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url.startsWith("http") ? it.url : `${BASE_URL}${it.url}`,
    })),
  });
}
