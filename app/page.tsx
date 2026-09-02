import content from "@/app/data/content.json";
import type { SiteContent } from "@/app/types";
import Gallery from "@/app/components/Gallery";
import Header from "@/app/components/Header";
import IntroCTAs from "@/app/components/IntroCTAs";
import PageReveal, { LineReveal } from "@/app/components/PageReveal";

const siteContent = content as SiteContent;

export default function Home() {
  return (
    <main className="min-h-screen bg-white relative">
      <Header />
      {/* Hero Section */}
      <section className="pt-[116px] md:pt-[124px] pb-20 md:pb-[96px] px-6">
        <div className="max-w-[590px] ml-0 mr-auto md:mx-auto w-[334px] md:w-full my-3 md:my-0">
          {/* Greeting */}
          <PageReveal delay={0.08}>
            <p className="text-zinc-500 text-[14px] leading-relaxed mb-2">
              {siteContent.greeting}
            </p>
          </PageReveal>

          {/* Bio & Social */}
          <div className="md:hidden space-y-3 w-full">
            <p className="text-base leading-[1.75] w-full text-zinc-800 text-balance">
              <LineReveal delay={0.19}>{`I’m a self-taught Design Engineer`}</LineReveal>
              <LineReveal delay={0.26}>
                {` born in London and based in Paris, with`}
              </LineReveal>
              <LineReveal delay={0.33}>{` experience working with venture-backed`}</LineReveal>
              <LineReveal delay={0.4}>{` startups to build software interfaces.`}</LineReveal>
            </p>
            <p className="text-base leading-[1.75] w-full text-zinc-800 mt-5 text-balance">
              <LineReveal delay={0.49}>{`I care deeply about visual craft and solving`}</LineReveal>
              <LineReveal delay={0.56}>
                {` problems through design from 0-to-1.`}
              </LineReveal>
              <LineReveal delay={0.63}>{`Feel free to reach out, whether to talk`}</LineReveal>
              <LineReveal delay={0.7}>{`about a collaboration or just to say hello.`}</LineReveal>
            </p>
          </div>

          <div className="hidden md:block space-y-3 w-full">
            <p className="text-base leading-[28px] w-full text-zinc-800 text-balance">
              <LineReveal delay={0.19}>
                {`I’m a self-taught Design Engineer born in London and based in Paris, with`}
              </LineReveal>
              <LineReveal delay={0.26}>
                {`experience working with venture-backed startups to build software interfaces.`}
              </LineReveal>
            </p>
            <p className="text-base leading-[28px] w-full text-zinc-800 text-balance">
              <LineReveal delay={0.34}>
                {`I care deeply about visual craft and solving problems through design from 0-to-1.`}
              </LineReveal>
              <LineReveal delay={0.41}>
                {`Feel free to reach out, whether to talk about a collaboration or just to say hello.`}
              </LineReveal>
            </p>
          </div>

          <div className="md:hidden">
            <PageReveal delay={0.78}>
              <IntroCTAs />
            </PageReveal>
          </div>
          <div className="hidden md:block">
            <PageReveal delay={0.52}>
              <IntroCTAs />
            </PageReveal>
          </div>
        </div>
      </section>

      {/* Gallery Section: per-shot entrance lives in Gallery */}
      <section id="gallery-section" className="relative z-0">
        <div className="px-3 md:px-6">
          <div className="max-w-[595px] md:max-w-[590px] mx-auto pb-[116px] md:pb-[148px]">
            <Gallery entryDelay={0.8} />
          </div>
        </div>
      </section>
    </main>
  );
}
