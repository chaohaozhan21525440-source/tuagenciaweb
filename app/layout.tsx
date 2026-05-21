import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { buildOrganizationSchema, buildLocalBusinessSchema } from "@/lib/seo/schemas";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Tuagenciaweb — Agencia web en Barcelona",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tuagenciaweb.es"),
  title: "Tuagenciaweb",
  description:
    "Agencia web para pymes y autónomos. Pack único, sin cuotas mensuales.",
  icons: {
    icon: [
      { url: "/logo/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/logo/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/logo/apple-touch-icon.png", sizes: "192x192" },
    ],
    shortcut: "/logo/favicon.png",
  },
  openGraph: {
    siteName: "Tuagenciaweb",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tuagenciaweb",
    description:
      "Agencia web para pymes y autónomos. Diseño, SEO y mantenimiento.",
    images: [OG_IMAGE.url],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const pathname = h.get("x-pathname") ?? "/";
  const lang = pathname.startsWith("/en") ? "en" : "es";
  return (
    <html lang={lang} className={`${inter.variable} ${display.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildOrganizationSchema() }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildLocalBusinessSchema() }}
        />
        {children}
      </body>
    </html>
  );
}
