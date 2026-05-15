"use client";

/*
 * SplitText
 * Ported from react-bits (TextAnimations/SplitText).
 * Origin: .cache/skills/react-bits/src/content/TextAnimations/SplitText/SplitText.jsx
 *
 * Adapted for React 19 + framer-motion (no GSAP dependency) and Tailwind v4.
 * Splits text into spans (words or chars) and reveals them with a staggered
 * y-translate + opacity animation. Respects prefers-reduced-motion.
 */

import * as React from "react";
import { motion, useReducedMotion, type Variants, type Easing } from "framer-motion";
import { cn } from "@/lib/cn";

type SplitType = "words" | "chars";

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number; // ms per token
  duration?: number; // seconds
  ease?: Easing;
  splitType?: SplitType;
  startDelay?: number; // seconds before first token
  as?: "h1" | "h2" | "h3" | "p" | "span";
  highlightWords?: string[];
  highlightClassName?: string;
};

export function SplitText({
  text,
  className,
  delay = 18,
  duration = 0.55,
  ease = [0.16, 1, 0.3, 1],
  splitType = "words",
  startDelay = 0,
  as: Tag = "span",
  highlightWords = [],
  highlightClassName = "text-[var(--color-accent)]",
}: SplitTextProps) {
  const reduce = useReducedMotion();
  const tokens = React.useMemo(() => {
    if (splitType === "chars") return text.split("");
    return text.split(/(\s+)/); // keep spaces as separate tokens
  }, [text, splitType]);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: startDelay,
        staggerChildren: delay / 1000,
      },
    },
  };

  const child: Variants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration, ease } },
  };

  const highlightSet = new Set(highlightWords.map((w) => w.toLowerCase()));

  return (
    <Tag className={cn("inline-block", className)}>
      <motion.span
        className="inline-block will-change-transform"
        variants={container}
        initial="hidden"
        animate="show"
        aria-label={text}
      >
        {tokens.map((tok, i) => {
          if (/^\s+$/.test(tok)) return <span key={i}>{tok}</span>;
          const isHighlighted = highlightSet.has(tok.toLowerCase());
          return (
            <motion.span
              key={i}
              variants={child}
              className={cn("inline-block", isHighlighted && highlightClassName)}
              aria-hidden="true"
            >
              {tok}
            </motion.span>
          );
        })}
      </motion.span>
    </Tag>
  );
}

export default SplitText;
