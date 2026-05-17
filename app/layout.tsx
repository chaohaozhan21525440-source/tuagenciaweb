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
    icon: "/logo/favicon.png",
    apple: "/logo/apple-touch-icon.png",
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
