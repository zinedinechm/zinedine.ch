"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import content from "@/app/data/content.json";
import { cn } from "@/app/lib/utils";
import type { HoverRect, SocialLink } from "@/app/types";

const socialLinks = content.social as SocialLink[];

export default function SocialLinks() {
  const [hoveredRect, setHoveredRect] = useState<HoverRect | null>(null);
  const [copied, setCopied] = useState(false);
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
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredRect((prev) => (prev ? { ...prev, opacity: 0 } : null));
  }, []);

  const handleEmailClick = useCallback((e: React.MouseEvent, url: string) => {
    if (url.startsWith("mailto:")) {
      e.preventDefault();
      const email = url.replace("mailto:", "");
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex gap-[14px] md:gap-0 relative items-center md:-ml-3.5 social-links-container"
    >
      {/* Hover blob - desktop only */}
      <div
        className={cn(
          "hidden md:block absolute bg-zinc-50 rounded-full pointer-events-none",
          "transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
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
          rel={
            link.url.startsWith("mailto:") ? undefined : "noopener noreferrer"
          }
          className={cn(
            "social-link text-zinc-500 text-[12px] md:text-[14px] cursor-pointer relative",
            (link.name === "Twitter" || link.name === "Github") && "hidden md:block"
          )}
          onClick={(e) => handleEmailClick(e, link.url)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {link.name === "Copy Email" ? (
            <div className="relative min-w-[65px] md:min-w-[75px] h-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="flex items-center justify-center w-full"
                  >
                    Copied
                  </motion.span>
                ) : (
                  <motion.span
                    key="email"
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="flex items-center justify-center w-full whitespace-nowrap"
                  >
                    Copy Email
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          ) : (
            link.name
          )}
        </a>
      ))}
    </div>
  );
}
