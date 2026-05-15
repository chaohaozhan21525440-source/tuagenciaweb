"use client";

import Image from "next/image";

type Props = { src: string; alt: string };

export function LaptopMockup({ src, alt }: Props) {
  return (
    <div className="relative w-full max-w-[520px] mx-auto">
      {/* Body of the laptop (lid) */}
      <div className="rounded-[14px] bg-[#1B1F24] p-[6px] shadow-[0_40px_80px_-30px_rgba(15,23,42,0.35)]">
        <div className="overflow-hidden rounded-[8px] bg-white">
          {/* Browser bar */}
          <div className="flex items-center gap-1.5 border-b border-black/10 bg-[#f4f5f7] px-4 py-2.5">
            <span className="size-2.5 rounded-full bg-[#FF5F57]" />
            <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="size-2.5 rounded-full bg-[#28C840]" />
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

      {/* Keyboard base (trapezoid) */}
      <div
        aria-hidden
        className="relative mx-auto h-3 bg-[#1B1F24]"
        style={{ clipPath: "polygon(2% 0, 98% 0, 100% 100%, 0% 100%)" }}
      />
      {/* Subtle base shadow */}
      <div
        aria-hidden
        className="mx-auto h-[2px] w-[92%] bg-black/15 blur-sm"
      />
    </div>
  );
}
