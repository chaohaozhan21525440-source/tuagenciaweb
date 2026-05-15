import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
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
  title: "Tuagenciaweb · Webs que convierten visitas en clientes",
  description:
    "Agencia web para pymes y autónomos. Pack único, sin cuotas mensuales. Diseño, desarrollo, SEO y dominio incluidos.",
  icons: {
    icon: "/logo/favicon.png",
    apple: "/logo/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
