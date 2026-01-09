"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";

import content from "@/app/data/content.json";
import { cn } from "@/app/lib/utils";
import {
  BREAKPOINTS,
  TIMING,
  EASING,
  SPRING_CONFIG,
  galleryModalVariants,
  CONTAINED_IMAGES,
} from "@/app/lib/constants";
import type { HoverRect, ImageItem } from "@/app/types";
import Slideshow from "./Slideshow/Slideshow";

// SSR-safe check for client-side mounting
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function Gallery() {
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [hoveredRect, setHoveredRect] = useState<HoverRect | null>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const slideshowImages = content.slideshow as ImageItem[];
  const galleryImages = content.gallery as ImageItem[];

  // Slideshow auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideshowIndex((prev) => (prev + 1) % slideshowImages.length);
    }, TIMING.SLIDESHOW_INTERVAL);
    return () => clearInterval(timer);
  }, [slideshowImages.length]);

  const handleNext = useCallback(() => {
    if (selectedId !== null) {
      setDirection(1);
      setSelectedId((selectedId + 1) % galleryImages.length);
    }
  }, [selectedId, galleryImages.length]);

  const handlePrev = useCallback(() => {
    if (selectedId !== null) {
      setDirection(-1);
      setSelectedId(
        (selectedId - 1 + galleryImages.length) % galleryImages.length
      );
    }
  }, [selectedId, galleryImages.length]);

  const handleControlMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const containerRect = controlsRef.current?.getBoundingClientRect();

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

  const handleControlMouseLeave = useCallback(() => {
    setHoveredRect((prev) => (prev ? { ...prev, opacity: 0 } : null));
  }, []);

  const closeModal = useCallback(() => {
    setSelectedId(null);
  }, []);

  // Prevent scroll when modal is open and handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
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
  }, [selectedId, handleNext, handlePrev, closeModal]);

  const handleImageClick = useCallback((index: number) => {
    if (window.innerWidth >= BREAKPOINTS.md) {
      setDirection(0);
      setSelectedId(index);
    }
  }, []);

  const stopPropagation = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

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
          <div
            onClick={closeModal}
            className="w-full h-full flex items-center justify-center p-10 md:p-20 overflow-hidden"
          >
            <AnimatePresence initial custom={direction} mode="popLayout">
              <motion.div
                key={selectedId}
                custom={direction}
                variants={galleryModalVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={
                  direction === 0
                    ? {
                        y: { type: "spring", ...SPRING_CONFIG },
                        scale: { type: "spring", ...SPRING_CONFIG },
                        opacity: { duration: 0.2 },
                      }
                    : { duration: 0.25, ease: EASING.smooth }
                }
                className="relative w-full max-w-[1200px]"
                onClick={stopPropagation}
              >
                <motion.div
                  initial={{ filter: "blur(10px)", opacity: 0 }}
                  animate={{ filter: "blur(0px)", opacity: 1 }}
                  transition={{ duration: 0.4, ease: EASING.smooth }}
                  className="cursor-default"
                >
                  <Image
                    src={galleryImages[selectedId].src}
                    alt={galleryImages[selectedId].alt}
                    width={1638}
                    height={814}
                    className="w-full h-auto rounded-lg block border-[0.5px] border-border"
                    priority
                    quality={100}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div
              className="absolute bottom-6 right-6 z-20 flex items-center gap-2"
              onClick={stopPropagation}
            >
              <div
                ref={controlsRef}
                className="flex bg-zinc-50 rounded-full p-1 relative"
              >
                {/* Hover blob */}
                <motion.div
                  className="absolute bg-zinc-100 rounded-full pointer-events-none"
                  animate={{
                    left: hoveredRect?.left ?? 0,
                    width: hoveredRect?.width ?? 0,
                    opacity: hoveredRect?.opacity ?? 0,
                  }}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                  style={{ height: "calc(100% - 8px)", top: "4px" }}
                />

                <button
                  type="button"
                  onClick={handlePrev}
                  onMouseEnter={handleControlMouseEnter}
                  onMouseLeave={handleControlMouseLeave}
                  className="p-2 rounded-full hover:bg-zinc-200/50 transition-colors relative z-10 focus:outline-none"
                  aria-label="Previous image"
                >
                  <ChevronUpIcon className="w-5 h-5 text-zinc-900" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  onMouseEnter={handleControlMouseEnter}
                  onMouseLeave={handleControlMouseLeave}
                  className="p-2 rounded-full hover:bg-zinc-200/50 transition-colors relative z-10 focus:outline-none"
                  aria-label="Next image"
                >
                  <ChevronDownIcon className="w-5 h-5 text-zinc-900" />
                </button>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="p-3 rounded-full bg-zinc-50 hover:bg-zinc-200/80 transition-colors focus:outline-none"
                aria-label="Close modal"
              >
                <XMarkIcon className="w-5 h-5 text-zinc-900" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="space-y-4 md:space-y-7 group/gallery">
        <Slideshow images={slideshowImages} currentIndex={slideshowIndex} />

        {/* Separator */}
        <div className="border-t-[0.5px] border-border w-full !mt-8 md:!mt-16 !mb-8 md:!mb-16" />

        {/* Gallery grid */}
        <div className="space-y-4 md:space-y-7 pb-5">
          {galleryImages.map((image, index) => {
            const isContained = CONTAINED_IMAGES.includes(
              image.alt as (typeof CONTAINED_IMAGES)[number]
            );

            return (
              <div
                key={image.src}
                onClick={() => handleImageClick(index)}
                className={cn(
                  "w-full border-[0.5px] border-border rounded-lg overflow-hidden relative",
                  "transition-transform duration-300 md:cursor-pointer md:hover:scale-[0.98]",
                  isContained ? "bg-zinc-50" : "bg-zinc-100/30"
                )}
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
}
