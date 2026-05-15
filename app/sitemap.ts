import type { MetadataRoute } from "next";
import { listPosts } from "@/lib/blog";
import { routing } from "@/i18n/routing";

const STATIC_KEYS = [
  "/",
  "/servicios",
  "/portfolio",
  "/sobre-nosotros",
  "/contacto",
  "/blog",
  "/legal/aviso-legal",
  "/legal/privacidad",
  "/legal/cookies",
] as const;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tuagenciaweb.es";

function localizedHref(key: string, locale: "es" | "en"): string {
  const map = (routing.pathnames as Record<string, string | Record<string, string>>)[key];
  const path = typeof map === "string" ? map : map[locale];
  return `${SITE}/${locale}${path === "/" ? "" : path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = STATIC_KEYS.flatMap((key) =>
    (routing.locales as readonly ["es", "en"]).map((locale) => ({
      url: localizedHref(key, locale),
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, localizedHref(key, l)])),
      },
    })),
  );

  const blogEntries = (
    await Promise.all(
      routing.locales.map(async (locale) => {
        const posts = await listPosts(locale);
        return posts.map((p) => ({
          url: `${SITE}/${locale}/blog/${p.slug}`,
          lastModified: new Date(p.date),
        }));
      }),
    )
  ).flat();

  return [...staticEntries, ...blogEntries];
}
