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
      <section className="pt-10 md:pt-[120px] pb-20 md:pb-[60px] px-6">
        <div className="max-w-[670px] ml-0 mr-auto md:mx-auto w-[330px] md:w-full">
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.3, delay: 0, ease: "easeOut" }}
            className="text-zinc-500/80 text-sm md:text-base leading-relaxed mb-4"
          >
            {siteContent.greeting}
          </motion.p>

          {/* Bio & Social */}
          <div className="space-y-5 w-full">
            <motion.p
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, delay: 0.08, ease: "easeOut" }}
              className="text-sm md:text-base leading-[1.95] md:leading-[1.75] w-full"
            >
              I'm Zinedine, a 22 year-old design engineer,<br className="md:hidden" /> born in London and based in Paris, creating software interfaces, visual identities and everything in between.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, delay: 0.16, ease: "easeOut" }}
              className="text-sm md:text-base leading-[1.95] md:leading-[1.75] w-full"
            >
              I enjoy building products around artificial intelligence, web3, and online culture from 0-to-1.
              <br />
              Feel free to reach out, I'm available for one-off projects and long-term commitments.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, delay: 0.24, ease: "easeOut" }}
              className="pt-1.5"
            >
              <SocialLinks />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <motion.section
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className="pb-4 px-3 md:px-6 relative z-0"
      >
        <div className="max-w-[670px] mx-auto">
          <Gallery />
          
          {/* Footer Text */}
          <div className="mt-14 md:mt-20 pb-1 text-zinc-500 text-[10px] md:text-xs leading-[1.95] md:leading-[1.75]">
            <p>
              This portfolio was built in Next.js using Cursor, featuring explorations, concepts, and production work, all entirely made by me. For deeper case studies and more info, explore{" "}
              <span className="underline cursor-not-allowed">
                my private portfolio
              </span>
              .
            </p>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
