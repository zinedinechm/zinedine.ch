import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import "./globals.css";

const openRunde = localFont({
  src: [
    {
      path: "../public/fonts/OpenRunde-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/OpenRunde-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/OpenRunde-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/OpenRunde-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-open-runde",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Zinedine Chami",
  description:
    "Zinedine Chami is a designer, born in London and based in Paris.",
  metadataBase: new URL("https://zinedine.ch"),
  openGraph: {
    title: "Zinedine Chami",
    description:
      "Zinedine Chami is a designer, born in London and based in Paris.",
    url: "https://zinedine.ch",
    siteName: "Zinedine Chami",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zinedine Chami",
    description:
      "Zinedine Chami is a designer, born in London and based in Paris.",
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
      <body className={`${openRunde.variable} antialiased`}>
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
