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
import { createPortal } from "react-dom";

import content from "@/app/data/content.json";
import { cn } from "@/app/lib/utils";
import {
  EASING,
  SPRING_CONFIG,
  galleryModalVariants,
  CONTAINED_IMAGES,
} from "@/app/lib/constants";
import type { ImageItem } from "@/app/types";

const galleryListVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
};

const galleryItemVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(12px)",
    y: 14,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

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
  const [isClosing, setIsClosing] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const galleryImages = content.gallery as ImageItem[];

  const closeModal = useCallback(() => {
    setIsClosing(true);
  }, []);

  const handleImageExitComplete = useCallback(() => {
    if (isClosing) {
      setSelectedId(null);
      setIsClosing(false);
    }
  }, [isClosing]);

  // Prevent scroll when modal is open; Escape closes
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
  }, [selectedId, closeModal]);

  const handleImageClick = useCallback((index: number) => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    setSelectedId(index);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      touchStartRef.current = null;

      // Swipe down to close (must be more vertical than horizontal)
      if (dy > 60 && Math.abs(dy) > Math.abs(dx)) {
        closeModal();
      }
    },
    [closeModal],
  );

  const stopPropagation = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const modal = (
    <AnimatePresence initial={false}>
      {selectedId !== null && (
        <motion.div
          key="modal"
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{
            opacity: isClosing ? 0 : 1,
            backdropFilter: isClosing ? "blur(0px)" : "blur(4px)",
            transition: { duration: isClosing ? 0.4 : 0.3, ease: "easeInOut" },
          }}
          exit={{
            opacity: 0,
            backdropFilter: "blur(0px)",
            transition: { duration: 0.1, ease: "easeOut" },
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70"
        >
          <div
            onClick={closeModal}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="w-full h-full flex items-center justify-center px-2 py-6 md:p-20 overflow-hidden cursor-pointer"
          >
            <AnimatePresence
              initial
              custom={0}
              mode="popLayout"
              onExitComplete={handleImageExitComplete}
            >
              {!isClosing && (
                <motion.div
                  key={selectedId}
                  custom={0}
                  variants={galleryModalVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    y: { type: "spring", ...SPRING_CONFIG },
                    scale: { type: "spring", ...SPRING_CONFIG },
                    opacity: { duration: 0.2 },
                  }}
                  className="relative w-[98%] md:w-full max-w-[1320px]"
                  onClick={stopPropagation}
                >
                  <motion.div
                    initial={{ filter: "blur(20px)", opacity: 0, y: 12 }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: EASING.smooth, delay: 0.15 },
                    }}
                    exit={{
                      filter: "blur(20px)",
                      opacity: 0,
                      y: 12,
                      transition: { duration: 0.55, ease: EASING.smooth, delay: 0 },
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
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="space-y-4 md:space-y-7 group/gallery">
        {/* Gallery grid — staggered blur-in per shot */}
        <motion.div
          className="space-y-[18px] md:space-y-[22px] pb-[52px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08, margin: "0px 0px -6% 0px" }}
          variants={galleryListVariants}
        >
          {galleryImages.map((image, index) => {
            const isContained = CONTAINED_IMAGES.includes(
              image.alt as (typeof CONTAINED_IMAGES)[number],
            );

            return (
              <motion.div
                key={image.src}
                variants={galleryItemVariants}
                onClick={() => handleImageClick(index)}
                className={cn(
                  "w-full border-[0.5px] border-zinc-200/70 rounded-[6px] overflow-hidden relative md:cursor-pointer",
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
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {mounted && createPortal(modal, document.body)}
    </>
  );
}
