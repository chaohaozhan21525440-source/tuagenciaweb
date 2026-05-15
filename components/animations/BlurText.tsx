"use client";

/*
 * BlurText
 * Ported from react-bits (TextAnimations/BlurText).
 * Origin: .cache/skills/react-bits/src/content/TextAnimations/BlurText/BlurText.jsx
 *
 * Adapted to framer-motion v11 (instead of motion/react) and Tailwind v4.
 * Words/chars enter from blur(12px) -> blur(0) with staggered delay.
 * Honors prefers-reduced-motion.
 */

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number; // ms per word
  startDelay?: number; // seconds
  duration?: number; // seconds
  blurAmount?: number; // px
  direction?: "top" | "bottom";
};

export function BlurText({
  text,
  className,
  delay = 28,
  startDelay = 0,
  duration = 0.6,
  blurAmount = 12,
  direction = "bottom",
}: BlurTextProps) {
  const reduce = useReducedMotion();
  const words = text.split(/(\s+)/);
  const [inView, setInView] = React.useState(false);
  const ref = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(node);
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const from = reduce
    ? { opacity: 1, filter: "blur(0px)", y: 0 }
    : {
        opacity: 0,
        filter: `blur(${blurAmount}px)`,
        y: direction === "bottom" ? 12 : -12,
      };
  const to = { opacity: 1, filter: "blur(0px)", y: 0 };

  return (
    <span ref={ref} className={cn("inline-block", className)} aria-label={text}>
      {words.map((w, i) => {
        if (/^\s+$/.test(w)) return <span key={i}>{w}</span>;
        return (
          <motion.span
            key={i}
            initial={from}
            animate={inView ? to : from}
            transition={{
              duration,
              ease: [0.16, 1, 0.3, 1],
              delay: startDelay + (i / words.length) * (delay / 1000) * words.length,
            }}
            className="inline-block will-change-[transform,filter,opacity]"
            aria-hidden="true"
          >
            {w}
          </motion.span>
        );
      })}
    </span>
  );
}

export default BlurText;
