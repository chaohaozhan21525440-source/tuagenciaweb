"use client";

import Image from "next/image";

type Props = { src: string; alt: string };

export function PhoneMockup({ src, alt }: Props) {
  return (
    <div className="relative w-[140px] lg:w-[170px]">
      <div className="relative rounded-[2.5rem] border-[8px] border-[#0a1733] bg-[#0a1733] shadow-[0_30px_60px_-20px_rgba(10,23,51,0.45)]">
        {/* Dynamic island */}
        <div className="absolute left-1/2 top-2 z-10 h-[18px] w-[58px] -translate-x-1/2 rounded-full bg-black" />
        <div className="overflow-hidden rounded-[1.85rem] bg-white">
          <Image
            src={src}
            alt={alt}
            width={400}
            height={800}
            className="h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}
