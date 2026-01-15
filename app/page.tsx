import * as motion from "framer-motion/client";

import content from "@/app/data/content.json";
import { fadeInUp } from "@/app/lib/constants";
import type { SiteContent } from "@/app/types";
import SocialLinks from "@/app/components/SocialLinks";
import Gallery from "@/app/components/Gallery";

const siteContent = content as SiteContent;

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-10 md:pt-[75px] pb-24 md:pb-[60px] px-6">
        <motion.div
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          transition={fadeInUp.transition}
          className="max-w-[670px] ml-0 mr-auto md:mx-auto w-80 md:w-full"
        >
          {/* Greeting */}
          <p className="text-zinc-500 text-sm md:text-base leading-relaxed mb-4">
            {siteContent.greeting}
          </p>

          {/* Bio & Social */}
          <div className="space-y-5 w-full">
            <p className="text-sm md:text-base leading-[1.95] md:leading-[1.75] w-full">
              I'm Zinedine, a 22 year-old design engineer,<br className="md:hidden" /> born in London and based in Paris, creating software interfaces, visual identities and everything in between.
            </p>

            <p className="text-sm md:text-base leading-[1.95] md:leading-[1.75] w-full">
              I enjoy building products around artificial intelligence, web3, and online culture from 0-to-1.
              <br />
              Feel free to reach out, I'm available for one-off projects and long-term commitments.
            </p>

            <div className="pt-1.5">
              <SocialLinks />
            </div>
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
        <div className="max-w-[670px] mx-auto">
          <Gallery />
          <div className="mt-7 pt-10 md:pt-[60px]" />
        </div>
      </motion.section>
    </main>
  );
}
