"use client";

import { useEffect, useRef } from "react";

export default function Footer() {
  const pathRef = useRef<SVGPathElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const span = spanRef.current;
    if (!path || !span) return;

    const length = path.getTotalLength();

    const resetPath = () => {
      path.style.transition = "none";
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    };

    const resetSpan = () => {
      span.style.transition = "none";
      span.style.opacity = "0";
      span.style.filter = "blur(6px)";
    };

    resetPath();
    resetSpan();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate path draw
          requestAnimationFrame(() => {
            path.style.transition = "stroke-dashoffset 2s cubic-bezier(0.37, 0, 0.63, 1)";
            path.style.strokeDashoffset = "0";
          });
          // Animate span blur-in
          requestAnimationFrame(() => {
            span.style.transition = "opacity 0.7s ease, filter 0.7s ease";
            span.style.opacity = "1";
            span.style.filter = "blur(0px)";
          });
        } else {
          resetPath();
          resetSpan();
        }
      },
      { threshold: 0.3 },
    );

    const svg = path.closest("svg") ?? path;
    observer.observe(svg);

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="mt-[14px] md:mt-[30px] mb-1 min-h-[52px] flex items-center justify-between gap-4 text-[11px] md:text-xs text-zinc-500">
      <span ref={spanRef} className="leading-snug flex-1 min-w-0 mr-0 md:mr-[122px]" style={{ opacity: 0, filter: "blur(6px)" }}>
        All featured designs were created by Zinedine Chami,
        <span className="md:hidden"> </span>
        <br className="hidden md:block" />
        including production, conceptual, and exploratory work.
      </span>
      <svg
        width="201"
        height="90"
        viewBox="0 0 201 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[52px] w-auto shrink-0 text-zinc-500/50"
        aria-label="Zinedine Chami signature"
      >
        <path
          ref={pathRef}
          d="M92.2996 1C75.4111 23.2858 58.5225 45.5716 64.8786 58.3067C71.2348 71.0418 101.347 73.5508 121.401 71.6701C141.454 69.7895 150.536 63.4432 157.365 57.9601C164.194 52.477 168.496 48.0493 171.589 44.1449C174.681 40.2406 176.434 36.9936 176.858 34.4354C177.283 31.8772 176.327 30.1062 172.011 29.3414C167.695 28.5766 160.047 28.8718 148.938 30.7211C137.828 32.5704 123.489 35.965 99.9304 43.8386C76.3719 51.7122 44.0286 63.962 25.3754 71.3056C6.72212 78.6493 2.73896 80.7155 1.404 81.8537C0.0690416 82.9919 1.50298 83.1395 14.0318 80.2638C26.5607 77.3881 50.141 71.4845 56.0746 68.4433C62.0083 65.4021 49.5809 65.4021 39.1957 66.14C28.8105 66.878 20.8442 68.3539 16.9794 69.188C13.1145 70.0221 13.5925 70.1696 21.9643 70.0243C30.3362 69.8789 46.5875 69.4362 62.607 67.8798C78.6266 66.3234 93.9219 63.6668 101.403 63.0362C108.884 62.4056 108.087 63.8815 106.96 67.5198C104.074 76.8329 102.921 84.763 103.957 87.5962C104.993 88.5108 107.064 88.3632 122.869 81.7933C138.673 75.2234 168.149 62.2357 199 49.3016"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="bevel"
        />
      </svg>
    </footer>
  );
}
