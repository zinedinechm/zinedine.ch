import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zinedine Chami",
  description:
    "Design engineer based in Paris, interested in AI, web3, and online culture. Building software interfaces and visual identities.",
  openGraph: {
    title: "Zinedine Chami",
    description:
      "Design engineer based in Paris, interested in AI, web3, and online culture.",
    url: "https://zinedine.ch",
    siteName: "Zinedine Chami",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zinedine Chami",
    description:
      "Design engineer based in Paris, interested in AI, web3, and online culture.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="hidden md:block fixed top-0 left-0 right-0 h-[25px] z-[100] pointer-events-none bg-gradient-to-b from-white to-transparent" />
        {children}
      </body>
    </html>
  );
}
