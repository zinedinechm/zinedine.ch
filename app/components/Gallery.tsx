"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";

const Gallery = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);
  const placeholders = Array.from({ length: 10 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedId !== null && selectedId < placeholders.length - 1) {
      setDirection(1);
      setSelectedId(selectedId + 1);
    }
  }, [selectedId, placeholders.length]);

  const handlePrev = useCallback(() => {
    if (selectedId !== null && selectedId > 0) {
      setDirection(-1);
      setSelectedId(selectedId - 1);
    }
  }, [selectedId]);

  // Prevent scroll when modal is open and handle keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
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
            <div className="flex bg-zinc-50 rounded-full p-1">
              <button
                onClick={handlePrev}
                disabled={selectedId === 0}
                className="p-2 rounded-full hover:bg-black/5 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronUpIcon className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={handleNext}
                disabled={selectedId === placeholders.length - 1}
                className="p-2 rounded-full hover:bg-black/5 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronDownIcon className="w-5 h-5 text-foreground" />
              </button>
            </div>
            <button
              onClick={() => setSelectedId(null)}
              className="p-3 rounded-full bg-zinc-50 hover:bg-zinc-100 transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-foreground" />
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
                  src="/banner.png"
                  alt="Selected design shot"
                  width={1638}
                  height={814}
                  className="w-full h-auto rounded-[8px] block"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="space-y-[28px] group/gallery">
        {placeholders.map((_, index) => (
          <div
            key={index}
            onClick={() => {
              setDirection(0);
              setSelectedId(index);
            }}
            className="w-full border border-border bg-muted/5 rounded-[8px] overflow-hidden relative transition-opacity duration-500 group-hover/gallery:opacity-[0.95] hover:!opacity-100 cursor-pointer"
          >
            <Image
              src="/banner.png"
              alt={`Design Shot ${index + 1}`}
              width={1638}
              height={814}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>

      {mounted && createPortal(modal, document.body)}
    </>
  );
};

export default Gallery;
