"use client";

/*
 * Aurora
 * Inspired by react-bits (Backgrounds/Aurora).
 * Origin: .cache/skills/react-bits/src/content/Backgrounds/Aurora/Aurora.jsx
 *
 * The original react-bits implementation uses WebGL via the `ogl` package.
 * To avoid pulling a new heavy dependency and to keep the hero LCP fast,
 * we ported the visual concept to a CSS-only version using three large
 * radial-gradient blobs that drift with @keyframes. Paleta restringida
 * a #0c78f7 / #062b6e / #e8f0fe — sin purple/pink, sin glow neon.
 * Respeta prefers-reduced-motion vía globals.css.
 */

import { cn } from "@/lib/cn";

type AuroraProps = {
  className?: string;
  opacity?: number;
};

export function Aurora({ className, opacity = 0.35 }: AuroraProps) {
  return (
    <div
      data-aurora
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      style={{ opacity }}
    >
      <div
        className="absolute -top-1/3 left-1/4 h-[70vh] w-[70vh] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(closest-side, #0c78f7 0%, rgba(12,120,247,0) 70%)",
          animation: "aurora-shift-a 14s ease-in-out infinite",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="absolute top-1/4 -right-1/4 h-[60vh] w-[60vh] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(closest-side, #e8f0fe 0%, rgba(232,240,254,0) 70%)",
          animation: "aurora-shift-b 18s ease-in-out infinite",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="absolute -bottom-1/4 left-1/3 h-[50vh] w-[50vh] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(closest-side, #062b6e 0%, rgba(6,43,110,0) 70%)",
          animation: "aurora-shift-c 22s ease-in-out infinite",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}

export default Aurora;
