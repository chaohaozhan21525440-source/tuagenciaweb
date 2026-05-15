import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

export const metadata: Metadata = {
  title: "Tuagenciaweb",
  description: "Webs profesionales para tu negocio, listas en 2 semanas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={geist.variable} style={{ ["--font-cabinet" as string]: "var(--font-geist)" }}>
      <body>{children}</body>
    </html>
  );
}
