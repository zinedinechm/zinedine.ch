import content from "@/app/data/content.json";
import type { SiteContent } from "@/app/types";
import Gallery from "@/app/components/Gallery";
import Header from "@/app/components/Header";
import IntroCTAs from "@/app/components/IntroCTAs";
import PageReveal from "@/app/components/PageReveal";

const siteContent = content as SiteContent;

export default function Home() {
  return (
    <main className="min-h-screen bg-white relative">
      <Header />
      {/* Hero Section */}
      <section className="pt-26 md:pt-[120px] pb-20 md:pb-[88px] px-6">
        <div className="max-w-[590px] ml-0 mr-auto md:mx-auto w-[334px] md:w-full my-3 md:my-0">
          {/* Greeting */}
          <PageReveal delay={0.08}>
            <p className="text-zinc-500 text-[14px] leading-relaxed mb-2">
              {siteContent.greeting}
            </p>
          </PageReveal>

          {/* Bio & Social */}
          <div className="space-y-3 md:space-y-3 w-full">
            <PageReveal delay={0.19}>
              <p className="text-[14px] md:text-base leading-[1.8] md:leading-[28px] w-full text-zinc-800 text-balance">
                {`I’m a self-taught Design Engineer`}
                <br className="md:hidden" aria-hidden />
                {` born in London and based in Paris,`}
                <br className="md:hidden" aria-hidden />
                {` with experience working with venture-backed startups to build software interfaces.`}
              </p>
            </PageReveal>

            <PageReveal delay={0.3}>
              <p className="text-[14px] md:text-base leading-[1.8] md:leading-[28px] w-full text-zinc-800 mt-5 md:mt-0 text-balance md:text-wrap">
                {`I care deeply about visual craft and solving problems through design from `}
                <span className="whitespace-nowrap">0-to-1.</span>{" "}
                <br className="md:hidden" aria-hidden />
                <span className="block text-balance md:text-wrap md:inline">
                  {`Feel free to reach out, whether to talk about a collaboration or just to say hello.`}
                </span>
              </p>
            </PageReveal>
          </div>

          <PageReveal delay={0.41}>
            <IntroCTAs />
          </PageReveal>
        </div>
      </section>

      {/* Gallery Section: per-shot entrance lives in Gallery */}
      <section id="gallery-section" className="relative z-0">
        <div className="px-3 md:px-6">
          <div className="max-w-[595px] md:max-w-[590px] mx-auto pb-[94px] md:pb-[148px]">
            <Gallery entryDelay={0.54} />
          </div>
        </div>
      </section>
    </main>
  );
}
