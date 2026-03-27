"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import Lenis from "lenis";

import "lenis/dist/lenis.css";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      // Light: higher lerp = quicker catch-up, less floaty inertia
      lerp: 0.14,
      wheelMultiplier: 0.88,
      touchMultiplier: 0.92,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return children;
}
