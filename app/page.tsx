import * as motion from "framer-motion/client";

import content from "@/app/data/content.json";
import type { SiteContent } from "@/app/types";
import Gallery from "@/app/components/Gallery";
import Header from "@/app/components/Header";
import IntroCTAs from "@/app/components/IntroCTAs";

const blurIn = (delay: number) => ({
  initial: { opacity: 0, filter: "blur(8px)", y: 6 },
  animate: { opacity: 1, filter: "blur(0px)", y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

const siteContent = content as SiteContent;

export default function Home() {
  return (
    <main className="min-h-screen bg-white relative">
      <Header />
      {/* Hero Section */}
      <section className="pt-26 md:pt-[120px] pb-16 md:pb-[74px] px-6">
        <div className="max-w-[605px] ml-0 mr-auto md:mx-auto w-[330px] md:w-full mt-[2px] md:mt-0">
          {/* Greeting */}
          <motion.p
            {...blurIn(0)}
            className="text-zinc-500 text-sm md:text-base leading-relaxed mb-4"
          >
            {siteContent.greeting}
          </motion.p>

          {/* Bio & Social */}
          <div className="space-y-3 md:space-y-3 w-full">
            <motion.p
              {...blurIn(0.15)}
              className="text-sm md:text-base leading-[1.85] md:leading-[1.75] w-full text-zinc-600"
            >
              I{"'"}m a self-taught Design Engineer, born in{" "}
              <br className="md:hidden" />
              London and based in Paris,
              {"\u00A0"}
              working on{" "}
              <br className="md:hidden" />
              refined software interfaces and websites,{" "}
              <br className="md:hidden" />
              across agentic coding and canvas tools.
            </motion.p>

            <motion.p
              {...blurIn(0.3)}
              className="text-sm md:text-base leading-[1.85] md:leading-[1.75] w-full text-zinc-600 mt-5 md:mt-0"
            >
              I care deeply about visual craft and solving{" "}
              <br className="md:hidden" />
              problems through design from 0 → 1.
              <br />
              Feel free to inquire, I{"'"}m available for{" "}
              <br className="md:hidden" />
              long-term commitments and one-off projects.
            </motion.p>
          </div>

          <IntroCTAs />
        </div>
      </section>

      {/* Gallery Section — per-shot entrance lives in Gallery */}
      <section id="gallery-section" className="pb-0 relative z-0">
        <div className="px-3 md:px-6">
          <div className="max-w-[605px] md:max-w-[652px] mx-auto pb-0">
            <Gallery />
          </div>
        </div>
      </section>
    </main>
  );
}
