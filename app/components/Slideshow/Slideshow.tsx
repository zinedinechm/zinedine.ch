"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ImageItem {
  src: string;
  alt: string;
}

interface SlideshowProps {
  images: ImageItem[];
  currentIndex: number;
}

const Slideshow = ({ images, currentIndex }: SlideshowProps) => {
  return (
    <div className="w-full border-[0.5px] border-border bg-zinc-50/50 rounded-[8px] overflow-hidden relative transition-all duration-300 cursor-default">
      <div className="relative w-full aspect-[16/10]">
        <div className="absolute inset-0">
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
    </div>
  );
};

export default Slideshow;
