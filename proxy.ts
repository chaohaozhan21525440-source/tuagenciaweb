import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["es", "en"] as const;

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Root: always redirect to Spanish. Visitors who want English can switch
  // via the language switcher in the header.
  if (pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/es";
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
