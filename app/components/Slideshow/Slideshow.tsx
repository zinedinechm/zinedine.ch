"use client";

import Image from "next/image";
import type { SlideshowProps } from "@/app/types";

export default function Slideshow({ images, currentIndex }: SlideshowProps) {
  return (
    <div className="w-full border-[0.5px] border-zinc-300 bg-zinc-50/50 rounded-[6px] overflow-hidden relative cursor-default">
      <div className="relative w-full aspect-[16/10]">
        {/* Affichage de l'image actuelle */}
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          fill
          className="object-cover"
          priority
          quality={100}
        />
        
        {/* Préchargement invisible des autres images pour éviter le clignotement */}
        <div className="hidden" aria-hidden="true">
          {images.map((image, index) => (
            index !== currentIndex && (
              <Image
                key={image.src}
                src={image.src}
                alt=""
                width={10}
                height={10}
                priority
              />
            )
          ))}
        </div>
      </div>
    </div>
  );
}
