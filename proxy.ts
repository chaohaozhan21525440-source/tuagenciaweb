import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["es", "en"] as const;

function pickLocale(req: NextRequest): "es" | "en" {
  const al = req.headers.get("accept-language") ?? "";
  // Prefer EN if Accept-Language starts with en, otherwise ES default
  if (/^en\b/i.test(al.trim()) || al.toLowerCase().split(",").some((p) => p.trim().startsWith("en"))) {
    return "en";
  }
  return "es";
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Root: redirect to preferred locale
  if (pathname === "/") {
    const locale = pickLocale(req);
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url, 307);
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
