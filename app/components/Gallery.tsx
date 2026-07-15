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
} from "@/app/lib/constants";
import { playMinimal } from "@/app/lib/ui-sounds";
import type { ImageItem } from "@/app/types";

/** Matches gallery column width so Next/Image does not over-fetch (e.g. 3840w). */
const GALLERY_IMAGE_SIZES = "(max-width: 768px) calc(100vw - 24px), 603px";
const GALLERY_PRIORITY_COUNT = 2;

const DESKTOP_QUERY = "(min-width: 1024px)";

/** Grid card hide/show while modal is open (whole card, layout-stable). */
const slotHidden = { opacity: 0, filter: "blur(14px)", y: 6 };
const slotVisible = { opacity: 1, filter: "blur(0px)", y: 0 };

function slotCardTransition(hidden: boolean) {
  return hidden
    ? { duration: 0.22, ease: EASING.smooth }
    : { duration: 0.52, ease: EASING.smooth };
}

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
  const [modalImageLoaded, setModalImageLoaded] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const galleryImages = content.gallery as ImageItem[];

  const closeModal = useCallback(() => {
    setIsClosing((prev) => {
      if (prev) return prev;
      playMinimal("slide");
      return true;
    });
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

  const handleImageClick = useCallback(
    (index: number) => {
      if (typeof window === "undefined") return;
      if (!window.matchMedia(DESKTOP_QUERY).matches) return;
      playMinimal("toggle-on");
      setModalImageLoaded(false);
      setSelectedId(index);
    },
    [],
  );

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
            backdropFilter: isClosing
              ? "blur(0px)"
              : "blur(4px)",
            transition: { duration: isClosing ? 0.4 : 0.28, ease: "easeInOut" },
          }}
          exit={{
            opacity: 0,
            backdropFilter: "blur(0px)",
            transition: { duration: 0.1, ease: "easeOut" },
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-900/10"
        >
          <div
            onClick={closeModal}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="w-full h-full flex items-center justify-center px-3 py-3 md:px-4 md:py-4 overflow-hidden cursor-pointer"
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
                  className="relative w-[72vw] max-w-[98vw]"
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
                    className="w-full cursor-default overflow-hidden rounded-[6px] bg-white"
                  >
                    <Image
                      src={
                        galleryImages[selectedId].modalSrc ||
                        galleryImages[selectedId].fullSrc ||
                        galleryImages[selectedId].src
                      }
                      alt={galleryImages[selectedId].alt}
                      width={1638}
                      height={814}
                      sizes="(max-width: 768px) 94vw, 90vw"
                      onLoad={() => setModalImageLoaded(true)}
                      className={cn(
                        "block h-auto w-full rounded-[6px] border-[0.5px] border-zinc-200/70 transition-opacity duration-200",
                        modalImageLoaded ? "opacity-100" : "opacity-0",
                      )}
                      quality={90}
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

  const listClassName = "space-y-[20px] md:space-y-[28px]";

  const galleryCards = galleryImages.map((image, index) => {
    /** Hidden while modal is open; reveals when close starts (not after exit). */
    const isSlotHidden = selectedId === index && !isClosing;
    const cardClassName = cn(
      "w-full border-[0.5px] border-zinc-200/70 rounded-[6px] overflow-hidden relative",
      "lg:cursor-pointer",
      "transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
      !isSlotHidden &&
        "md:hover:border-zinc-200/90 md:hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)]",
      "bg-white",
      isSlotHidden && "md:pointer-events-none",
    );
    const img = (
      <Image
        src={image.src}
        alt={image.alt}
        width={1638}
        height={814}
        sizes={GALLERY_IMAGE_SIZES}
        className="w-full h-auto block"
        quality={88}
        priority={index < GALLERY_PRIORITY_COUNT}
      />
    );

    return (
      <motion.div
        key={image.src}
        initial={false}
        animate={isSlotHidden ? slotHidden : slotVisible}
        transition={slotCardTransition(isSlotHidden)}
        onClick={() => handleImageClick(index)}
        className={cardClassName}
        aria-hidden={isSlotHidden}
      >
        {img}
      </motion.div>
    );
  });

  return (
    <>
      <div className="space-y-4 md:space-y-7 group/gallery">
        <div className={listClassName}>{galleryCards}</div>
      </div>

      {mounted && createPortal(modal, document.body)}
    </>
  );
}
