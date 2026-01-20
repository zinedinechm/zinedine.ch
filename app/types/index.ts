// Content types for content.json
export interface Company {
  name: string;
  url: string;
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface ImageItem {
  src: string;
  alt: string;
  fullSrc?: string;
}

export interface SiteContent {
  greeting: string;
  name: string;
  bio: string;
  companies: Company[];
  interests: string;
  social: SocialLink[];
  slideshow: ImageItem[];
  gallery: ImageItem[];
}

// Component prop types
export interface SlideshowProps {
  images: ImageItem[];
  currentIndex: number;
}

// Shared UI types
export interface HoverRect {
  left: number;
  width: number;
  opacity: number;
}
