"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

import content from "@/app/data/content.json";
import type { HoverRect, SocialLink } from "@/app/types";
import { playMinimal } from "@/app/lib/ui-sounds";

const socialLinks = content.social as SocialLink[];

export default function SocialLinks() {
  const [hoveredRect, setHoveredRect] = useState<HoverRect | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, linkName: string) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();

      setHoveredLink(linkName);

      if (containerRect) {
        setHoveredRect({
          left: rect.left - containerRect.left,
          width: rect.width,
          opacity: 1,
        });
      }
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredLink(null);
    setHoveredRect((prev) => (prev ? { ...prev, opacity: 0 } : null));
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex gap-[12px] md:gap-0 relative items-center social-links-container"
    >
      {/* Hover blob - desktop only */}
      {/* <div
        className="hidden md:block absolute bg-zinc-50 rounded-full pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{
          left: hoveredRect?.left ?? 0,
          width: hoveredRect?.width ?? 0,
          opacity: hoveredRect?.opacity ?? 0,
          height: "100%",
          top: "0",
        }}
      /> */}

      {socialLinks.map((link, index) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`social-link text-zinc-500 text-[12px] md:text-[14px] cursor-pointer relative${
            link.name === "Github" ? " social-link-flush-right" : ""
          }`}
          onMouseEnter={(event) => handleMouseEnter(event, link.name)}
          onMouseLeave={handleMouseLeave}
          onClick={() => playMinimal("tap")}
          initial={
            prefersReducedMotion
              ? false
              : { opacity: 0, filter: "blur(6px)" }
          }
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.55,
            ease: [0.23, 1, 0.32, 1],
            delay: prefersReducedMotion ? 0 : 0.06 + index * 0.1,
          }}
        >
          <span style={{ display: "inline-block", position: "relative" }}>
            {link.name}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: "-2px",
                height: 0,
                borderTop: "1px dashed #d4d4d8",
                opacity: hoveredLink === link.name ? 1 : 0,
                transition: "opacity 0.2s ease",
              }}
            />
          </span>
        </motion.a>
      ))}
    </div>
  );
}
