import * as motion from "framer-motion/client";
import { fadeInUp } from "@/app/lib/constants";
import SocialLinks from "./SocialLinks";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-6 px-6 h-[120px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FCFCFC] to-transparent pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backdropFilter: "blur(8px)",
          maskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />
      <motion.div
        initial={fadeInUp.initial}
        animate={fadeInUp.animate}
        transition={fadeInUp.transition}
        className="max-w-[620px] mx-auto w-full flex justify-between items-center"
      >
        <h1 className="text-sm md:text-base font-medium text-zinc-900">
          Zinedine Chami
        </h1>
        <div className="md:-mr-3.5">
          <SocialLinks />
        </div>
      </motion.div>
    </header>
  );
}
