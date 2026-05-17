import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://www.tuagenciaweb.es/sitemap.xml",
    host: "https://www.tuagenciaweb.es",
  };
}
