import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import SmoothScroll from "@/app/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Zinedine Chami",
  description:
    "I'm a 22 year-old Design Engineer, born in London and based in Paris, working on software products bridging the gap between the design and engineering process.",
  metadataBase: new URL("https://zinedine.ch"),
  openGraph: {
    title: "Zinedine Chami",
    description:
      "I'm a 22 year-old Design Engineer, born in London and based in Paris, working on software products bridging the gap between the design and engineering process.",
    url: "https://zinedine.ch",
    siteName: "Zinedine Chami",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zinedine Chami",
    description:
      "I'm a 22 year-old Design Engineer, born in London and based in Paris, working on software products bridging the gap between the design and engineering process.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/Globe_Fav.png",
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
        <SmoothScroll>
          <div className="root">{children}</div>
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
