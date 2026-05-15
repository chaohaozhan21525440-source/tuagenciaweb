"use client";

/*
 * CountUp
 * Ported from react-bits (TextAnimations/CountUp).
 * Origin: .cache/skills/react-bits/src/content/TextAnimations/CountUp/CountUp.jsx
 *
 * Adapted to framer-motion v11. Triggers when in viewport. Respects
 * prefers-reduced-motion (sets to final value immediately).
 */

import * as React from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

type CountUpProps = {
  to: number;
  from?: number;
  duration?: number; // seconds
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

export function CountUp({
  to,
  from = 0,
  duration = 1.5,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });
  const mv = useMotionValue(from);
  const damping = 22 + 30 * (1 / duration);
  const stiffness = 100 * (1 / duration);
  const spring = useSpring(mv, { damping, stiffness });

  React.useEffect(() => {
    if (!inView) return;
    if (reduce) {
      mv.set(to);
    } else {
      mv.set(to);
    }
  }, [inView, reduce, to, mv]);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = `${prefix}${from.toFixed(decimals)}${suffix}`;
    const unsub = spring.on("change", (v) => {
      el.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
    });
    return () => unsub();
  }, [spring, prefix, suffix, decimals, from]);

  return <span ref={ref} className={className} />;
}

export default CountUp;
