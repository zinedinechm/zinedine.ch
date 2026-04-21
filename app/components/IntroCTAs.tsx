"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import * as motion from "framer-motion/client";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import { TIMING } from "@/app/lib/constants";
import { cn } from "@/app/lib/utils";

const CONTACT_EMAIL = "contact@zinedine.ch";
const CAL_BOOKING_URL = "https://cal.com/zinedinechm";

const entrance = {
  initial: { opacity: 0, filter: "blur(8px)", y: 6 },
  animate: { opacity: 1, filter: "blur(0px)", y: 0 },
  transition: { duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
};

const baseBtn =
  "inline-flex cursor-pointer items-center justify-center rounded-full border-0 bg-zinc-50 px-3 py-[4px] md:py-[6px] text-xs md:text-sm font-medium text-zinc-800 transition-colors duration-200 ease-out hover:bg-zinc-100 w-auto shrink-0";

const copyLabelRoll = {
  initial: { opacity: 0, filter: "blur(8px)", y: -8 },
  animate: { opacity: 1, filter: "blur(0px)", y: 0 },
  exit: { opacity: 0, filter: "blur(8px)", y: 8 },
  transition: { duration: 0.2, ease: "easeOut" as const },
};

const ICON_HOVER_TRANSITION = {
  duration: 0.28,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

export default function IntroCTAs() {
  const [copied, setCopied] = useState(false);
  const [calHover, setCalHover] = useState(false);

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
        onPointerEnter={() => setCalHover(true)}
        onPointerLeave={() => setCalHover(false)}
        className={cn(baseBtn, "bg-zinc-800 text-white hover:bg-zinc-800")}
      >
        <span className="inline-flex items-center">
          <span className="shrink-0">Quick Chat</span>
          <motion.span
            aria-hidden
            className="inline-flex shrink-0 items-center justify-end overflow-hidden text-white"
            initial={false}
            animate={{
              width: calHover ? 18 : 0,
              marginLeft: calHover ? 4 : 0,
              opacity: calHover ? 1 : 0,
              filter: calHover ? "blur(0px)" : "blur(8px)",
              x: calHover ? 0 : -10,
            }}
            transition={ICON_HOVER_TRANSITION}
          >
            <ArrowRightIcon className="h-3 w-3 min-h-3 min-w-3 md:h-3.5 md:w-3.5 md:min-h-3.5 md:min-w-3.5" />
          </motion.span>
        </span>
      </a>
      <button
        type="button"
        onClick={copyEmail}
        aria-label={copied ? "Email copied" : `Copy ${CONTACT_EMAIL} to clipboard`}
        className={baseBtn}
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
                Copy Email
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </button>
    </motion.div>
  );
}
