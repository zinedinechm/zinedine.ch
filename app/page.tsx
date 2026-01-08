import SocialLinks from "./components/SocialLinks";
import LiveClock from "./components/LiveClock";
import Gallery from "./components/Gallery";
import content from "./data/content.json";
import * as motion from "framer-motion/client";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-10 md:pt-[70px] pb-[70px] px-6">
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[670px] ml-0 mr-auto md:mx-auto w-[320px] md:w-full"
        >
          {/* Greeting */}
          <p className="text-muted text-[14px] md:text-[16px] leading-[1.7] mb-4">
            {content.greeting}
          </p>

          {/* Bio & Social */}
          <div className="space-y-4 w-full">
            <p className="text-[14px] md:text-[16px] leading-[1.7] w-full">
              <span className="font-normal">{content.name}</span> {content.bio}{" "}
              {content.companies.map((company, index) => (
                <span key={company.name}>
                  <a
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline font-medium"
                  >
                    {company.name}
                  </a>
                  {index < content.companies.length - 1 ? " and " : "."}
                </span>
              ))}
            </p>

            <p className="text-[14px] md:text-[16px] leading-[1.7] w-full">
              {content.interests}
            </p>

            <div className="pt-2">
              <SocialLinks />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Gallery & Footer Section */}
      <motion.section
        initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className="pb-4 px-3 md:px-6 relative z-0"
      >
        <div className="max-w-[670px] mx-auto">
          <Gallery />

          <div className="mt-[28px] pt-[26px] flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="text-[14px] md:text-[16px] text-accent">
              It is <LiveClock /> for Zinedine
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
