import type { Metadata } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tuagenciaweb.es";

export type SeoInput = {
  locale: "es" | "en";
  path: string;
  title: string;
  description: string;
  image?: string;
};

export function buildMetadata({ locale, path, title, description, image }: SeoInput): Metadata {
  const url = `${SITE}/${locale}${path === "/" ? "" : path}`;
  const ogImage = image ?? `${SITE}/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description.slice(0, 80))}`;
  return {
    title,
    description,
    metadataBase: new URL(SITE),
    alternates: {
      canonical: url,
      languages: {
        es: `${SITE}/es${path === "/" ? "" : path}`,
        en: `${SITE}/en${path === "/" ? "" : path}`,
      },
    },
    openGraph: { title, description, url, siteName: "Tuagenciaweb · Diseño, desarrollo y resultados", images: [{ url: ogImage }], locale, type: "website" },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}
