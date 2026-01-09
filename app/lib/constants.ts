import type { Variants } from "framer-motion";

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  md: 768,
} as const;

// Timing constants
export const TIMING = {
  SLIDESHOW_INTERVAL: 2000,
  COPY_FEEDBACK_DURATION: 1000,
} as const;

// Animation easing
export const EASING = {
  smooth: [0.23, 1, 0.32, 1],
} as const;

// Shared spring config for snappy animations
export const SPRING_CONFIG = {
  damping: 25,
  stiffness: 400,
  mass: 0.8,
} as const;

// Gallery modal animation variants
export const galleryModalVariants: Variants = {
  enter: (direction: number) => ({
    y: direction === 0 ? 10 : 0,
    opacity: direction === 0 ? 0 : 1,
    scale: direction === 0 ? 0.95 : 1,
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    y: 0,
    opacity: direction === 0 ? 0 : 1,
    scale: direction === 0 ? 0.95 : 1,
  }),
};

// Page entrance animation
export const fadeInUp = {
  initial: { opacity: 0, filter: "blur(10px)", y: 10 },
  animate: { opacity: 1, filter: "blur(0px)", y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

// Gallery image alt names that need contained styling
export const CONTAINED_IMAGES = [
  "shot-12",
  "frame-random",
  "contributor-view",
  "frame-457",
] as const;
