"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import * as motion from "framer-motion/client";

import { TIMING } from "@/app/lib/constants";

const CONTACT_EMAIL = "contact@zinedine.ch";
const CAL_BOOKING_URL = "https://cal.com/zinedinechm";

const entrance = {
  initial: { opacity: 0, filter: "blur(8px)", y: 6 },
  animate: { opacity: 1, filter: "blur(0px)", y: 0 },
  transition: { duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
};

const baseBtn =
  "inline-flex cursor-pointer items-center justify-center rounded-full px-3 py-[5px] md:py-[6px] text-xs md:text-sm font-medium transition-colors duration-200 ease-out w-auto shrink-0";

const copyBtnOutline = "border-[0.5px] border-zinc-200/70";

const copyLabelRoll = {
  initial: { opacity: 0, filter: "blur(8px)", y: -8 },
  animate: { opacity: 1, filter: "blur(0px)", y: 0 },
  exit: { opacity: 0, filter: "blur(8px)", y: 8 },
  transition: { duration: 0.2, ease: "easeOut" as const },
};

export default function IntroCTAs() {
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(() => {
    void navigator.clipboard.writeText(CONTACT_EMAIL).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), TIMING.COPY_FEEDBACK_DURATION);
    });
  }, []);

  return (
    <motion.div
      {...entrance}
      className="mt-6 md:mt-7 flex flex-row flex-wrap gap-3 w-full"
    >
      <a
        href={CAL_BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseBtn} bg-zinc-900 text-white hover:bg-zinc-800`}
      >
        Get in touch
      </a>
      <button
        type="button"
        onClick={copyEmail}
        aria-label={copied ? "Email copied" : `Copy ${CONTACT_EMAIL} to clipboard`}
        className={`${baseBtn} ${copyBtnOutline} bg-white text-zinc-800 hover:bg-zinc-50 overflow-hidden`}
      >
        <span className="relative grid min-h-[1.25rem] w-max place-items-center">
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="copied"
                {...copyLabelRoll}
                className="col-start-1 row-start-1 whitespace-nowrap"
              >
                Copied
              </motion.span>
            ) : (
              <motion.span
                key="email"
                {...copyLabelRoll}
                className="col-start-1 row-start-1 whitespace-nowrap"
              >
                Copy email
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </button>
    </motion.div>
  );
}
