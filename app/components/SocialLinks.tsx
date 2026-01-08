"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import content from "../data/content.json";

export default function SocialLinks() {
  const [copied, setCopied] = useState(false);
  const [hoveredRect, setHoveredRect] = useState<{
    left: number;
    width: number;
    opacity: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleEmailClick = (e: React.MouseEvent, url: string) => {
    if (url.startsWith("mailto:")) {
      e.preventDefault();
      const email = url.replace("mailto:", "");
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (containerRect) {
      setHoveredRect({
        left: rect.left - containerRect.left,
        width: rect.width,
        opacity: 1,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredRect((prev) => (prev ? { ...prev, opacity: 0 } : null));
  };

  return (
    <div
      ref={containerRef}
      className="flex gap-4 md:gap-1.5 md:-ml-3 relative items-center"
    >
      {/* The Blob */}
      <div
        className="hidden md:block absolute bg-zinc-100/80 rounded-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-none"
        style={{
          left: hoveredRect?.left ?? 0,
          width: hoveredRect?.width ?? 0,
          opacity: hoveredRect?.opacity ?? 0,
          height: "100%",
          top: "0",
        }}
      />

      {content.social.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link text-[14px] md:text-[16px] cursor-pointer relative"
          onClick={(e) => handleEmailClick(e, link.url)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {link.name === "Copy Email" ? (
            <div className="relative h-auto md:h-[24px] flex items-center justify-start md:justify-center w-auto md:w-[85px]">
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.1 }}
                    className="md:absolute md:inset-0 flex items-center justify-start md:justify-center"
                  >
                    Copied
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.1 }}
                    className="md:absolute md:inset-0 flex items-center justify-start md:justify-center whitespace-nowrap"
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
