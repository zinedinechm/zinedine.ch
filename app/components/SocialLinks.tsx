"use client";

import { useState, useRef, useCallback } from "react";

import content from "@/app/data/content.json";
import { cn } from "@/app/lib/utils";
import type { HoverRect, SocialLink } from "@/app/types";

const socialLinks = content.social as SocialLink[];

export default function SocialLinks() {
  const [hoveredRect, setHoveredRect] = useState<HoverRect | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();

      if (containerRect) {
        setHoveredRect({
          left: rect.left - containerRect.left,
          width: rect.width,
          opacity: 1,
        });
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredRect((prev) => (prev ? { ...prev, opacity: 0 } : null));
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex gap-4 md:gap-0 relative items-center md:-ml-3"
    >
      {/* Hover blob - desktop only */}
      <div
        className={cn(
          "hidden md:block absolute bg-zinc-50 rounded-full pointer-events-none",
          "transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
        )}
        style={{
          left: hoveredRect?.left ?? 0,
          width: hoveredRect?.width ?? 0,
          opacity: hoveredRect?.opacity ?? 0,
          height: "100%",
          top: "0",
        }}
      />

      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target={link.url.startsWith("mailto:") ? undefined : "_blank"}
          rel={link.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          className="social-link text-zinc-500 text-sm md:text-base cursor-pointer relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {link.name === "Copy Email" ? "Email" : link.name}
        </a>
      ))}
    </div>
  );
}
