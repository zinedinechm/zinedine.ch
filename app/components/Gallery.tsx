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

// SSR-safe check for client-side mounting
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function Gallery() {
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [hoveredRect, setHoveredRect] = useState<HoverRect | null>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const galleryImages = content.gallery as ImageItem[];

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
        (selectedId - 1 + galleryImages.length) % galleryImages.length,
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
    [],
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
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FCFCFC]/90"
        >
          <div
            onClick={closeModal}
            className="w-full h-full flex items-center justify-center p-10 md:p-20 overflow-hidden cursor-pointer"
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
                className="relative w-full max-w-[1320px]"
                onClick={stopPropagation}
              >
                <motion.div
                  initial={{ filter: "blur(20px)", opacity: 0 }}
                  animate={{ filter: "blur(0px)", opacity: 1 }}
                  exit={{ filter: "blur(20px)", opacity: 0 }}
                  transition={{
                    duration: 0.7,
                    ease: EASING.smooth,
                  }}
                  className="cursor-default"
                >
                  <Image
                    src={
                      galleryImages[selectedId].fullSrc ||
                      galleryImages[selectedId].src
                    }
                    alt={galleryImages[selectedId].alt}
                    width={1638}
                    height={814}
                    className="w-full h-auto rounded-[6px] block border-[0.5px] border-zinc-200/70"
                    priority={true}
                    quality={100}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="space-y-4 md:space-y-7 group/gallery">
        {/* Gallery grid */}
        <div className="space-y-4 md:space-y-5 pb-5">
          {galleryImages.map((image, index) => {
            const isContained = CONTAINED_IMAGES.includes(
              image.alt as (typeof CONTAINED_IMAGES)[number],
            );

            return (
              <div
                key={image.src}
                onClick={() => handleImageClick(index)}
                className={cn(
                  "w-full border-[0.5px] border-zinc-200/70 rounded-[6px] overflow-hidden relative cursor-pointer",
                  "transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
                  "md:hover:translate-y-[-2px] md:hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)]",
                  isContained ? "bg-zinc-50" : "bg-zinc-100/30",
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1638}
                  height={814}
                  className="w-full h-auto block"
                  quality={100}
                  priority={true}
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
