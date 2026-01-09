import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Zinedine Chami",
  description:
    "Zinedine Chami is a designer, born in London and based in Paris, previously with Châtaigne.ai and OpenSource Together.",
  metadataBase: new URL("https://zinedine.ch"),
  openGraph: {
    title: "Zinedine Chami",
    description:
      "Zinedine Chami is a designer, born in London and based in Paris, previously with Châtaigne.ai and OpenSource Together.",
    url: "https://zinedine.ch",
    siteName: "Zinedine Chami",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zinedine Chami",
    description:
      "Zinedine Chami is a designer, born in London and based in Paris, previously with Châtaigne.ai and OpenSource Together.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Top gradient fade - desktop only */}
        <div
          className="hidden md:block fixed top-0 left-0 right-0 h-6 z-[100] pointer-events-none bg-gradient-to-b from-white to-transparent"
          aria-hidden="true"
        />
        {children}
      </body>
    </html>
  );
}
