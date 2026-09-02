"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import SocialLinks from "./SocialLinks";

export default function Header() {
  const { scrollY } = useScroll();
  const topOffset = useTransform(scrollY, [0, 48], [8, 0]);
  const headerHeight = useTransform(scrollY, [0, 48], [120, 136]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 overflow-hidden pt-[22px] md:pt-[18px]"
      style={{ height: headerHeight }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-white to-transparent gradient-ease-out pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backdropFilter: "blur(8px)",
          maskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />
      <motion.div
        className="relative max-w-[590px] mx-auto w-full flex justify-between items-center"
        style={{ y: topOffset }}
      >
        <h1 className="text-[14px] md:text-base font-medium text-zinc-900">
          <span className="block text-zinc-900">Zinedine Chami</span>
        </h1>
        <div>
          <SocialLinks />
        </div>
      </motion.div>
    </motion.header>
  );
}
