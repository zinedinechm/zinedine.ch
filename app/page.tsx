import * as motion from "framer-motion/client";

import content from "@/app/data/content.json";
import { fadeInUp } from "@/app/lib/constants";
import type { SiteContent } from "@/app/types";
import SocialLinks from "@/app/components/SocialLinks";
import Gallery from "@/app/components/Gallery";
import Header from "@/app/components/Header";

const siteContent = content as SiteContent;

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FCFCFC] relative">
      <Header />
      {/* Hero Section */}
      <section className="pt-22 md:pt-[120px] pb-16 md:pb-[78px] px-6">
        <motion.div
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          transition={fadeInUp.transition}
          className="max-w-[620px] ml-0 mr-auto md:mx-auto w-[330px] md:w-full"
        >
          {/* Greeting */}
          <p className="text-zinc-500 text-sm md:text-base leading-relaxed mb-4">
            {siteContent.greeting}
          </p>

          {/* Bio & Social */}
          <div className="space-y-3 md:space-y-3 w-full">
            <p className="text-sm md:text-base leading-[1.95] md:leading-[1.75] w-full text-zinc-600">
              I'm a 22 year-old Design Engineer, born in
              <br className="md:hidden" /> London and based in Paris, designing
              and <br className="md:hidden" /> building software interfaces,
              visual identities <br className="md:hidden" /> and everything in
              between.
            </p>

            <p className="text-sm md:text-base leading-[1.95] md:leading-[1.75] w-full text-zinc-600 mt-5 md:mt-0">
              I care deeply about craft and solving problems through design from
              0-to-1.
              <br />
              Feel free to reach out for more information at{" "}
              <a
                href="https://x.com/zinedinechm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 underline decoration-zinc-200 decoration-[0.5px] underline-offset-4 hover:text-zinc-500 hover:decoration-zinc-400 transition-colors"
              >
                @zinedinechm
              </a>{" "}
              or{" "}
              <a
                href="mailto:contact@zinedine.ch"
                className="text-zinc-400 underline decoration-zinc-200 decoration-[0.5px] underline-offset-4 hover:text-zinc-500 hover:decoration-zinc-400 transition-colors"
              >
                contact@zinedine.ch
              </a>
            </p>
          </div>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <motion.section
        initial={{ opacity: 0, filter: "blur(10px)", y: 8 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className="pb-4 px-3 md:px-6 relative z-0"
      >
        <div className="max-w-[620px] mx-auto">
          <Gallery />

          {/* Footer Text */}
          <div className="mt-14 md:mt-20 pb-1 text-zinc-500 text-[10px] md:text-xs leading-[1.95] md:leading-[1.75]"></div>
        </div>
      </motion.section>
    </main>
  );
}
