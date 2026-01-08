"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";
import content from "../data/content.json";
import Slideshow from "./Slideshow/Slideshow";

const Gallery = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [hoveredRect, setHoveredRect] = useState<{
    left: number;
    width: number;
    opacity: number;
  } | null>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const slideshowImages = content.slideshow;
  const galleryImages = content.gallery;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Slideshow logic
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideshowIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [slideshowImages.length]);

  const handleNext = useCallback(() => {
    if (selectedId !== null && selectedId < galleryImages.length - 1) {
      setDirection(1);
      setSelectedId(selectedId + 1);
    }
  }, [selectedId, galleryImages.length]);

  const handlePrev = useCallback(() => {
    if (selectedId !== null && selectedId > 0) {
      setDirection(-1);
      setSelectedId(selectedId - 1);
    }
  }, [selectedId]);

  const handleControlMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = controlsRef.current?.getBoundingClientRect();

    if (containerRect) {
      setHoveredRect({
        left: rect.left - containerRect.left,
        width: rect.width,
        opacity: 1,
      });
    }
  };

  const handleControlMouseLeave = () => {
    setHoveredRect((prev) => (prev ? { ...prev, opacity: 0 } : null));
  };

  // Prevent scroll when modal is open and handle keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedId(null);
      }
      if (e.key === "ArrowUp") handlePrev();
      if (e.key === "ArrowDown") handleNext();
    };

    if (selectedId !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedId, handleNext, handlePrev]);

  const variants = {
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

  const modal = (
    <AnimatePresence initial={false}>
      {selectedId !== null && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
          {/* Controls */}
          <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
            <div
              ref={controlsRef}
              className="flex bg-zinc-50 rounded-full p-1 relative"
            >
              {/* The Blob */}
              <motion.div
                className="absolute bg-zinc-100 rounded-full pointer-events-none"
                animate={{
                  left: hoveredRect?.left ?? 0,
                  width: hoveredRect?.width ?? 0,
                  opacity: hoveredRect?.opacity ?? 0,
                }}
                transition={{
                  type: "spring",
                  bounce: 0.15,
                  duration: 0.4,
                }}
                style={{
                  height: "calc(100% - 8px)",
                  top: "4px",
                }}
              />

              <button
                onClick={handlePrev}
                onMouseEnter={handleControlMouseEnter}
                onMouseLeave={handleControlMouseLeave}
                disabled={selectedId === 0}
                className="p-2 rounded-full hover:bg-zinc-200/50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors relative z-10"
              >
                <ChevronUpIcon className="w-5 h-5 text-zinc-900" />
              </button>
              <button
                onClick={handleNext}
                onMouseEnter={handleControlMouseEnter}
                onMouseLeave={handleControlMouseLeave}
                disabled={selectedId === galleryImages.length - 1}
                className="p-2 rounded-full hover:bg-zinc-200/50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors relative z-10"
              >
                <ChevronDownIcon className="w-5 h-5 text-zinc-900" />
              </button>
            </div>
            <button
              onClick={() => {
                setSelectedId(null);
              }}
              className="p-3 rounded-full bg-zinc-50 hover:bg-zinc-200/80 transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-zinc-900" />
            </button>
          </div>

          <div className="w-full h-full flex items-center justify-center p-10 md:p-20 overflow-hidden">
            <AnimatePresence initial={true} custom={direction} mode="popLayout">
              <motion.div
                key={selectedId}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={
                  direction === 0
                    ? {
                        y: {
                          type: "spring",
                          damping: 25,
                          stiffness: 400,
                          mass: 0.8,
                        },
                        scale: {
                          type: "spring",
                          damping: 25,
                          stiffness: 400,
                          mass: 0.8,
                        },
                        opacity: { duration: 0.2 },
                      }
                    : {
                        duration: 0,
                      }
                }
                className="relative w-full max-w-[1200px]"
              >
                <Image
                  src={galleryImages[selectedId].src}
                  alt={galleryImages[selectedId].alt}
                  width={1638}
                  height={814}
                  className="w-full h-auto rounded-[8px] block border-[0.5px] border-border"
                  priority
                  quality={100}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const handleImageClick = (index: number) => {
    // Only open modal on desktop (md breakpoint and above)
    if (window.innerWidth >= 768) {
      setDirection(0);
      setSelectedId(index);
    }
  };

  return (
    <>
      <div className="space-y-4 md:space-y-7 group/gallery">
        {/* Slideshow at the top */}
        <Slideshow images={slideshowImages} currentIndex={slideshowIndex} />

        {/* Separator with large gap */}
        <div className="border-t-[0.5px] border-border w-full !mt-8 md:!mt-16 !mb-8 md:!mb-16" />

        {/* Full Gallery starting from Shot 1 */}
        <div className="space-y-4 md:space-y-7 pb-[20px]">
          {galleryImages.map((image, index) => {
            const isContained = [
              "shot-12",
              "frame-random",
              "contributor-view",
              "frame-457",
            ].includes(image.alt);

            return (
              <div
                key={index}
                onClick={() => handleImageClick(index)}
                className={`w-full border-[0.5px] border-border rounded-[8px] overflow-hidden relative transition-transform duration-300 md:cursor-pointer md:hover:scale-[0.98] ${
                  isContained ? "bg-zinc-50" : "bg-zinc-100/30"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1638}
                  height={814}
                  className="w-full h-auto block"
                  quality={100}
                />
              </div>
            );
          })}
        </div>
      </div>

      {mounted && createPortal(modal, document.body)}
    </>
  );
};

export default Gallery;
