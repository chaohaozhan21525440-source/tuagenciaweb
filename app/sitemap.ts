import type { MetadataRoute } from "next";

const BASE = "https://www.tuagenciaweb.es";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{ es: string; en: string; priority: number; changeFrequency: "weekly" | "monthly" }> = [
    { es: "/es", en: "/en", priority: 1.0, changeFrequency: "weekly" },
    { es: "/es/sobre-nosotros", en: "/en/about", priority: 0.8, changeFrequency: "monthly" },
    { es: "/es/contacto", en: "/en/contact", priority: 0.8, changeFrequency: "monthly" },
  ];

  const now = new Date();
  return routes.flatMap((r) => [
    {
      url: `${BASE}${r.es}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
      alternates: { languages: { es: `${BASE}${r.es}`, en: `${BASE}${r.en}` } },
    },
    {
      url: `${BASE}${r.en}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
      alternates: { languages: { es: `${BASE}${r.es}`, en: `${BASE}${r.en}` } },
    },
  ]);
}
