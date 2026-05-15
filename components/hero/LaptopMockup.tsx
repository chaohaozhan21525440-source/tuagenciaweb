"use client";

import Image from "next/image";

type Props = { src: string; alt: string };

/**
 * Linear/Vercel-style laptop mockup. Pure CSS frame + browser chrome.
 * The screen content is whatever image you pass via `src`.
 */
export function LaptopMockup({ src, alt }: Props) {
  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      {/* Lid (screen bezel) */}
      <div className="relative rounded-[14px] bg-[#0a1733] p-[6px] shadow-[0_50px_100px_-30px_rgba(10,23,51,0.35),0_20px_40px_-20px_rgba(37,99,235,0.18)]">
        <div className="overflow-hidden rounded-[10px] bg-white">
          {/* Browser bar */}
          <div className="flex items-center gap-2 border-b border-black/5 bg-[#f8fafc] px-3 py-2.5">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="ml-3 flex-1 rounded-md bg-white px-3 py-1 text-[11px] text-[var(--color-ink-400)]">
              tuagenciaweb.es
            </div>
          </div>
          <Image
            src={src}
            alt={alt}
            width={1280}
            height={800}
            priority
            className="h-auto w-full"
          />
        </div>
      </div>
      {/* Keyboard base */}
      <div
        aria-hidden
        className="mx-auto h-[10px] bg-gradient-to-b from-[#1e293b] to-[#0a1733]"
        style={{ clipPath: "polygon(3% 0, 97% 0, 100% 100%, 0% 100%)" }}
      />
      <div aria-hidden className="mx-auto h-1 w-[88%] rounded-b-full bg-black/15 blur-md" />
    </div>
  );
}
