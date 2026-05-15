import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/servicios": { es: "/servicios", en: "/services" },
    "/portfolio": "/portfolio",
    "/sobre-nosotros": { es: "/sobre-nosotros", en: "/about" },
    "/contacto": { es: "/contacto", en: "/contact" },
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/legal/aviso-legal": { es: "/legal/aviso-legal", en: "/legal/legal-notice" },
    "/legal/privacidad": { es: "/legal/privacidad", en: "/legal/privacy" },
    "/legal/cookies": "/legal/cookies",
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
