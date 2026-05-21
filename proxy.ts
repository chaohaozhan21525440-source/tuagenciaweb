import { NextResponse, type NextRequest } from "next/server";
import { SERVICE_SLUG_REDIRECTS } from "@/lib/services";

const LOCALES = ["es", "en"] as const;

const SERVICES_ROOT: Record<"es" | "en", string> = {
  es: "/es/servicios",
  en: "/en/services",
};

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Root: always redirect to Spanish. Visitors who want English can switch
  // via the language switcher in the header.
  if (pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/es";
    return NextResponse.redirect(url, 301);
  }

  // 301 redirect legacy service slugs after the SEO + maintenance merge:
  // /es/servicios/seo-tecnico    → /es/servicios/seo-mantenimiento
  // /es/servicios/mantenimiento  → /es/servicios/seo-mantenimiento
  // /en/services/technical-seo   → /en/services/seo-maintenance
  // /en/services/maintenance     → /en/services/seo-maintenance
  for (const locale of LOCALES) {
    const root = SERVICES_ROOT[locale];
    if (!pathname.startsWith(`${root}/`)) continue;
    const slug = pathname.slice(root.length + 1);
    const target = SERVICE_SLUG_REDIRECTS[locale][slug];
    if (target) {
      const url = req.nextUrl.clone();
      url.pathname = `${root}/${target}`;
      return NextResponse.redirect(url, 301);
    }
  }

  // Expose the pathname to server components (for <html lang> resolution)
  const headers = new Headers(req.headers);
  headers.set("x-pathname", pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: [
    // Match everything except Next internals, API routes and static files
    "/((?!_next/|api/|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};

export { LOCALES };
