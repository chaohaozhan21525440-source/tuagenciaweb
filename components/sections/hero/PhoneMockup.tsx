"use client";

import Image from "next/image";

type Props = { src: string; alt: string };

export function PhoneMockup({ src, alt }: Props) {
  return (
    <div className="relative w-[140px] lg:w-[170px]">
      {/* Outer phone frame */}
      <div className="relative rounded-[2.5rem] border-[8px] border-[#0F172A] bg-[#0F172A] shadow-[0_30px_50px_-20px_rgba(15,23,42,0.4)]">
        {/* Dynamic island */}
        <div className="absolute left-1/2 top-[10px] z-10 h-[18px] w-[60px] -translate-x-1/2 rounded-full bg-black" />
        {/* Inner screen */}
        <div className="overflow-hidden rounded-[1.8rem] bg-white">
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
