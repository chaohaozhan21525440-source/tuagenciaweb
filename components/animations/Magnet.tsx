"use client";

/*
 * Magnet
 * Ported from react-bits (Animations/Magnet).
 * Origin: .cache/skills/react-bits/src/content/Animations/Magnet/Magnet.jsx
 *
 * Adapted to framer-motion useMotionValue (instead of useState) per
 * taste-skill rule: NEVER use React state for continuous mouse-following
 * animations. Wraps children in a div that pulls toward the cursor when
 * inside its padding zone.
 */

import * as React from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

type MagnetProps = {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
  innerClassName?: string;
};

export function Magnet({
  children,
  padding = 80,
  strength = 3,
  className,
  innerClassName,
}: MagnetProps) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.6 });

  React.useEffect(() => {
    if (reduce) return;
    const handle = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      if (Math.abs(dx) < r.width / 2 + padding && Math.abs(dy) < r.height / 2 + padding) {
        x.set(dx / strength);
        y.set(dy / strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, [padding, strength, reduce, x, y]);

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <motion.div style={{ x: sx, y: sy }} className={cn("will-change-transform", innerClassName)}>
        {children}
      </motion.div>
    </div>
  );
}

export default Magnet;
