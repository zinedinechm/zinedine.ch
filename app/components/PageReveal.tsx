"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EASING } from "@/app/lib/constants";

interface PageRevealProps {
  children: React.ReactNode;
  delay: number;
}

export function LineReveal({ children, delay }: PageRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.span
      className="block"
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, y: 6, filter: "blur(6px)" }
      }
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.55,
        ease: EASING.smooth,
        delay: prefersReducedMotion ? 0 : delay,
      }}
    >
      {children}
    </motion.span>
  );
}

export default function PageReveal({ children, delay }: PageRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, y: 6, filter: "blur(6px)" }
      }
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.55,
        ease: EASING.smooth,
        delay: prefersReducedMotion ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}
