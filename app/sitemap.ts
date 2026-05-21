import type { MetadataRoute } from "next";
import { getDict } from "@/lib/i18n";
import { SERVICE_IDS, SERVICE_SLUGS } from "@/lib/services";

const BASE = "https://www.tuagenciaweb.es";

type LocalePair = { es: string; en: string };
type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

function entry(
  pair: LocalePair,
  priority: number,
  changeFrequency: ChangeFrequency,
  lastModified: Date,
): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE}${pair.es}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: { es: `${BASE}${pair.es}`, en: `${BASE}${pair.en}` } },
    },
    {
      url: `${BASE}${pair.en}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: { es: `${BASE}${pair.es}`, en: `${BASE}${pair.en}` } },
    },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const es = getDict("es");

  const staticPairs: Array<{ pair: LocalePair; priority: number; freq: ChangeFrequency }> = [
    { pair: { es: "/es", en: "/en" }, priority: 1.0, freq: "weekly" },
    { pair: { es: "/es/servicios", en: "/en/services" }, priority: 0.9, freq: "monthly" },
    { pair: { es: "/es/sobre-nosotros", en: "/en/about" }, priority: 0.7, freq: "monthly" },
    { pair: { es: "/es/contacto", en: "/en/contact" }, priority: 0.7, freq: "monthly" },
    { pair: { es: "/es/blog", en: "/en/blog" }, priority: 0.6, freq: "weekly" },
  ];

  const servicePairs: Array<{ pair: LocalePair; priority: number; freq: ChangeFrequency }> =
    SERVICE_IDS.map((id) => ({
      pair: {
        es: `/es/servicios/${SERVICE_SLUGS[id].es}`,
        en: `/en/services/${SERVICE_SLUGS[id].en}`,
      },
      priority: 0.8,
      freq: "monthly",
    }));

  const blogPairs: Array<{ pair: LocalePair; priority: number; freq: ChangeFrequency }> =
    es.blogPage.articles.map((a) => ({
      pair: { es: `/es/blog/${a.slug}`, en: `/en/blog/${a.slug}` },
      priority: 0.5,
      freq: "monthly",
    }));

  return [...staticPairs, ...servicePairs, ...blogPairs].flatMap(({ pair, priority, freq }) =>
    entry(pair, priority, freq, now),
  );
}
