"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import content from "@/app/data/content.json";
import { cn } from "@/app/lib/utils";
import { TIMING } from "@/app/lib/constants";
import type { HoverRect, SocialLink } from "@/app/types";

const socialLinks = content.social as SocialLink[];

export default function SocialLinks() {
  const [copied, setCopied] = useState(false);
  const [hoveredRect, setHoveredRect] = useState<HoverRect | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const copyEmail = useCallback(() => {
    const emailLink = socialLinks.find(link => link.name === "Copy Email");
    if (emailLink) {
      const email = emailLink.url.replace("mailto:", "");
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), TIMING.COPY_FEEDBACK_DURATION);
    }
  }, []);

  const handleEmailClick = useCallback((e: React.MouseEvent, url: string) => {
    if (url.startsWith("mailto:")) {
      e.preventDefault();
      copyEmail();
    }
  }, [copyEmail]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        copyEmail();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [copyEmail]);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (containerRect) {
      setHoveredRect({
        left: rect.left - containerRect.left,
        width: rect.width,
        opacity: 1,
      });
    }
  }, []);

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
          "hidden md:block absolute bg-zinc-100/80 rounded-full pointer-events-none",
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
          target="_blank"
          rel="noopener noreferrer"
          className="social-link text-zinc-500 text-sm md:text-base cursor-pointer relative"
          onClick={(e) => handleEmailClick(e, link.url)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {link.name === "Copy Email" ? (
            <div className="relative h-auto md:h-6 flex items-center justify-start w-auto gap-1">
              <div className="relative w-auto md:w-[85px] h-full flex items-center justify-start md:justify-center">
                <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, y: 4, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -4, filter: "blur(4px)" }}
                    transition={{ 
                      duration: 0.08,
                      ease: "easeOut"
                    }}
                    className="md:absolute md:inset-0 flex items-center justify-start md:justify-center"
                  >
                    Copied :)
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0, y: 4, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -4, filter: "blur(4px)" }}
                    transition={{ 
                      duration: 0.08,
                      ease: "easeOut"
                    }}
                    className="md:absolute md:inset-0 flex items-center justify-start md:justify-center whitespace-nowrap"
                  >
                    Copy Email
                  </motion.span>
                )}
                </AnimatePresence>
              </div>
              
              {/* Shortcut indicator - desktop only */}
              <div className="hidden md:flex items-center">
                <span className="px-1.5 py-0.5 rounded-[4px] bg-zinc-50 text-zinc-400 text-[12px] font-medium">
                  ⌘K
                </span>
              </div>
            </div>
          ) : (
            link.name
          )}
        </a>
      ))}
    </div>
  );
}
