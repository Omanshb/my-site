"use client";

import { motion } from "framer-motion";
import { SocialLinks } from "@/components/layout/social-links";

const blurEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const blurReveal = {
  hidden: { filter: "blur(12px)" },
  visible: {
    filter: "blur(0px)",
    transition: { duration: 2.4, ease: blurEase },
  },
};

const paragraphContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.3,
    },
  },
};

const paragraphVariants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 3, ease: blurEase },
  },
};

export function HomeHero() {
  return (
    <section
      className="pointer-events-none fixed inset-0 z-30 max-md:px-6 md:pl-[51%] md:pr-12 lg:pr-16"
      aria-label="Introduction"
    >
      <div className="h-full max-w-xl pb-12 pr-2 pt-12 text-left md:max-w-[44rem] md:pb-16 md:pr-3 md:pt-24 md:pl-2">
        <motion.h1
          className="font-hero text-[70px] leading-[1.08] tracking-tight text-white"
          variants={blurReveal}
          initial="hidden"
          animate="visible"
        >
          What&apos;s up?
        </motion.h1>
        <motion.h1
          className="font-hero pl-1 text-[70px] leading-[1.08] tracking-tight text-white"
          variants={blurReveal}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4, duration: 2.4, ease: blurEase }}
        >
          I&apos;m Omansh Bainsla,
        </motion.h1>
        <motion.div
          className="mt-6 max-w-[42rem] space-y-5 pl-1 text-pretty text-sm font-[250] leading-relaxed text-white/90 md:max-w-[44rem] md:text-base md:leading-relaxed"
          variants={paragraphContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={paragraphVariants}>
          a 21-year-old software engineer, researcher, and builder based out of San Francisco. Though I like to consider myself a life-long student as well, I recently graduated from Georgia Tech with a bachelor’s degree in computer science. Currently, I’m a member of technical staff at Mercor, where I’m helping scale RL environments, post-training, and synthetic data.
          </motion.p>
          <motion.p variants={paragraphVariants}>
          I’m primarily devoted to taking the theoretical research ideas I read about and forging them into systems that thrive in the real world. More recently, this has led me to work on security infrastructure for enterprise AI systems at Triage and agent evaluation frameworks at Salesforce. 
          </motion.p>
          <motion.p variants={paragraphVariants}>
          When my laptop dies, you’ll see me outside trying to catch the perfect photo, unwinding with a round of golf, or pretending to be a movie critic. I’ve also had some unsolicited attempts at becoming more literate.
          </motion.p>
          <motion.p variants={paragraphVariants}>
          To all of the remarkable people who I've had the opportunity to surround myself with, I'm perpetually grateful for you all. If you're among the hundreds more that are yet to come, reach out.
          </motion.p>
          <motion.div variants={paragraphVariants} className="pt-2">
            <SocialLinks className="pointer-events-auto text-sm font-[500] leading-relaxed md:text-base" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
