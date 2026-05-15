"use client";

/*
 * GradientText
 * Ported from react-bits (TextAnimations/GradientText).
 * Origin: .cache/skills/react-bits/src/content/TextAnimations/GradientText/GradientText.jsx
 *
 * Restringido a la paleta accent (#0c78f7 / #062b6e). NO purple/pink.
 * Animado mediante background-position en lugar de WebGL.
 */

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

type GradientTextProps = {
  children: React.ReactNode;
  className?: string;
  colors?: [string, string, string];
  speed?: number;
};

export function GradientText({
  children,
  className,
  colors = ["#062b6e", "#0c78f7", "#062b6e"],
  speed = 8,
}: GradientTextProps) {
  const reduce = useReducedMotion();
  const gradient = `linear-gradient(90deg, ${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[0]})`;
  return (
    <motion.span
      className={cn("inline-block bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: gradient,
        backgroundSize: "300% 100%",
        WebkitBackgroundClip: "text",
      }}
      animate={
        reduce
          ? undefined
          : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
      }
      transition={{ duration: speed, ease: "linear", repeat: Infinity }}
    >
      {children}
    </motion.span>
  );
}

export default GradientText;
