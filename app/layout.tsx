import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

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
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const pathname = h.get("x-pathname") ?? "/";
  const lang = pathname.startsWith("/en") ? "en" : "es";
  return (
    <html lang={lang} className={`${inter.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
