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
  title: "Zinedine Chami · Product Designer",
  description: "Product designer based in Paris, interested in AI, web3, and online culture. Building software interfaces and visual identities.",
  openGraph: {
    title: "Zinedine Chami · Product Designer",
    description: "Product designer based in Paris, interested in AI, web3, and online culture.",
    url: "https://zinedine.ch",
    siteName: "Zinedine Chami",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zinedine Chami · Product Designer",
    description: "Product designer based in Paris, interested in AI, web3, and online culture.",
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
        {children}
      </body>
    </html>
  );
}
