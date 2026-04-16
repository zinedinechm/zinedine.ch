"use client";

import { useState, useEffect } from "react";
import * as motion from "framer-motion/client";
import { AnimatePresence } from "framer-motion";
import { fadeInUp } from "@/app/lib/constants";
import { cn } from "@/app/lib/utils";
import SocialLinks from "./SocialLinks";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [inGallery, setInGallery] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const section = document.getElementById("gallery-section");
    if (!section) return;

    const HEADER_HEIGHT = 120;

    const checkPosition = () => {
      const sectionTop = section.getBoundingClientRect().top;
      setInGallery(sectionTop <= HEADER_HEIGHT);
    };

    checkPosition();
    window.addEventListener("scroll", checkPosition, { passive: true });
    return () => window.removeEventListener("scroll", checkPosition);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 h-[120px] overflow-hidden transition-[padding] duration-300 ease-out",
        scrolled ? "pt-[18px]" : "pt-6",
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backdropFilter: "blur(8px)",
          maskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />
      <div className="relative max-w-[620px] mx-auto w-full flex justify-between items-center">
        <h1 className="text-sm md:text-base font-medium text-zinc-900">
          <AnimatePresence mode="wait" initial={false}>
            {inGallery ? (
              <motion.span
                key="sample-work"
                initial={{ opacity: 0, filter: "blur(6px)", y: 6 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, filter: "blur(6px)", y: -6 }}
                transition={{ duration: 0.26, ease: "easeOut" }}
                className="block"
              >
                Selected Work
              </motion.span>
            ) : (
              <span className="block">Zinedine Chami</span>
            )}
          </AnimatePresence>
        </h1>
        <motion.div
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          transition={fadeInUp.transition}
          className="md:-mr-3.5"
        >
          <SocialLinks />
        </motion.div>
      </div>
    </header>
  );
}
