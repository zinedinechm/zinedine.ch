"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { SlideshowProps } from "@/app/types";

export default function Slideshow({ images, currentIndex }: SlideshowProps) {
  // Préchargement de toutes les images pour éviter le clignotement
  useEffect(() => {
    images.forEach((image) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = image.src;
      document.head.appendChild(link);
    });

    return () => {
      // Nettoyage optionnel
      document.head
        .querySelectorAll('link[rel="preload"][as="image"]')
        .forEach((link) => {
          if (images.some((img) => img.src === link.getAttribute("href"))) {
            link.remove();
          }
        });
    };
  }, [images]);

  return (
    <div className="w-full border-[0.5px] border-zinc-300 bg-zinc-50/50 rounded-[6px] overflow-hidden relative cursor-default">
      <div className="relative w-full aspect-[16/10]">
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-cover"
              priority
              quality={100}
            />
      </div>
    </div>
  );
}
