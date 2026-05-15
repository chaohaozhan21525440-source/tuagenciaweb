const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tuagenciaweb.es";

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tuagenciaweb",
    url: SITE,
    logo: `${SITE}/logo/logo-full-light.svg`,
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hola@tuagenciaweb.es",
      areaServed: "ES",
      availableLanguage: ["Spanish", "English"],
    },
  };
}

export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Tuagenciaweb",
    url: SITE,
    image: `${SITE}/og/default.png`,
    priceRange: "€€",
    areaServed: "ES",
    address: { "@type": "PostalAddress", addressCountry: "ES" },
  };
}

export function blogPostLd(post: { title: string; description: string; date: string; slug: string; cover: string | null; locale: "es" | "en" }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: post.locale,
    mainEntityOfPage: `${SITE}/${post.locale}/blog/${post.slug}`,
    image: post.cover ?? `${SITE}/og/default.png`,
    publisher: { "@type": "Organization", name: "Tuagenciaweb", logo: `${SITE}/logo/logo-full-light.svg` },
  };
}
