import content from "@/app/data/content.json";
import type { SiteContent } from "@/app/types";
import Gallery from "@/app/components/Gallery";
import Header from "@/app/components/Header";
import IntroCTAs from "@/app/components/IntroCTAs";

const siteContent = content as SiteContent;

export default function Home() {
  return (
    <main className="min-h-screen bg-white relative">
      <Header />
      {/* Hero Section */}
      <section className="pt-26 md:pt-[120px] pb-20 md:pb-[88px] px-6">
        <div className="max-w-[603px] ml-0 mr-auto md:mx-auto w-[334px] md:w-full my-3 md:my-0">
          {/* Greeting */}
          <p
            className="text-zinc-500 text-[14px] md:text-base leading-relaxed mb-4"
          >
            {siteContent.greeting}
          </p>

          {/* Bio & Social */}
          <div className="space-y-3 md:space-y-3 w-full">
            <p
              className="text-[14px] md:text-base leading-[1.8] md:leading-[28px] w-full text-zinc-800 text-balance"
            >
              {`I’m a self-taught design engineer rooted in London and Paris, with experience collaborating with talented teams to create refined and intuitive software products.`}
            </p>

            <p
              className="text-[14px] md:text-base leading-[1.8] md:leading-[28px] w-full text-zinc-800 mt-5 md:mt-0 text-balance md:text-wrap"
            >
              {`I care deeply about visual craft and solving problems through design from `}
              <span className="whitespace-nowrap">0-to-1.</span>{" "}
              <br className="md:hidden" aria-hidden />
              <span className="block text-balance md:text-wrap md:inline">
                {`Feel free to reach out, whether to talk about a collaboration or just to say hello.`}
              </span>
            </p>
          </div>

          <IntroCTAs />
        </div>
      </section>

      {/* Gallery Section: per-shot entrance lives in Gallery */}
      <section id="gallery-section" className="relative z-0">
        <div className="px-3 md:px-6">
          <div className="max-w-[595px] md:max-w-[603px] mx-auto pb-[94px] md:pb-[120px]">
            <Gallery />
          </div>
        </div>
      </section>
    </main>
  );
}
