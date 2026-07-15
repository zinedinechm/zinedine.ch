"use client";

import SocialLinks from "./SocialLinks";

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 px-6 h-[120px] overflow-hidden pt-[22px] md:pt-[18px]"
    >
      <div className="absolute inset-0 bg-linear-to-b from-white to-transparent gradient-ease-out pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backdropFilter: "blur(8px)",
          maskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />
      <div className="relative max-w-[603px] mx-auto w-full flex justify-between items-center">
        <h1 className="text-[14px] md:text-base font-medium text-zinc-900">
          <span className="block text-zinc-900">Zinedine Chami</span>
        </h1>
        <div>
          <SocialLinks />
        </div>
      </div>
    </header>
  );
}
