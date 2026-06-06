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

interface HomeHeroProps {
  useFixedLayout?: boolean;
}

export function HomeHero({ useFixedLayout = false }: HomeHeroProps) {
  return (
    <section
      className={
        useFixedLayout
          ? "pointer-events-none fixed inset-0 z-30 pl-[51%] pr-12 lg:pr-16"
          : "pointer-events-none relative z-10 min-h-[100svh] bg-black px-8 py-10 sm:px-12 sm:py-12 md:px-16"
      }
      aria-label="Introduction"
    >
      <div
        className={
          useFixedLayout
            ? "h-full max-w-[44rem] pb-16 pr-3 pt-28 pl-2 text-left"
            : "w-full max-w-[42rem] pb-16 pt-18 text-left sm:max-w-[44rem]"
        }
      >
        <motion.h1
          className={`font-hero leading-[1.08] tracking-tight text-white${
            useFixedLayout
              ? " text-[42px] min-[400px]:text-[48px] sm:text-[60px] lg:text-[70px]"
              : " text-[48px] min-[400px]:text-[54px] sm:text-[64px] md:text-[68px]"
          }`}
          variants={blurReveal}
          initial="hidden"
          animate="visible"
        >
          What&apos;s up?
        </motion.h1>
        <motion.h1
          className={`font-hero pl-1 leading-[1.08] tracking-tight text-white${
            useFixedLayout
              ? " text-[42px] min-[400px]:text-[48px] sm:text-[60px] lg:text-[70px]"
              : " text-[48px] min-[400px]:text-[54px] sm:text-[64px] md:text-[68px]"
          }`}
          variants={blurReveal}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4, duration: 2.4, ease: blurEase }}
        >
          I&apos;m Omansh Bainsla,
        </motion.h1>
        <motion.div
          className={`mt-6 space-y-5 pl-1 text-pretty text-[16px] font-[250] leading-relaxed text-white/90${useFixedLayout ? " max-w-[44rem]" : " max-w-none"}`}
          variants={paragraphContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={paragraphVariants}>
          a 21-year-old software engineer, researcher, and builder based out of San Francisco. I recently graduated from Georgia Tech with a bachelor’s degree in computer science, though I like to consider myself a life-long student. Currently, I’m a member of technical staff at Mercor, where I’m helping scale RL environments and synthetic data.          </motion.p>
          <motion.p variants={paragraphVariants}>
          I’m primarily devoted to taking the theoretical research ideas I read about and forging them into systems that thrive in the real world. More recently, this has led me to work on security infrastructure for enterprise AI at Triage and agent evaluation frameworks at Salesforce. 
          </motion.p>
          <motion.p variants={paragraphVariants}>
          When my laptop dies, you’ll see me outside trying to catch the perfect photo, unwinding with a round of golf, or pretending to be a movie critic. I’ve also had some unsolicited attempts at becoming more literate.
          </motion.p>
          <motion.p variants={paragraphVariants}>
          To all of the remarkable people who I&apos;ve had the opportunity to surround myself with, I&apos;m perpetually grateful for you all. If you&apos;re among the hundreds more that are yet to come, reach out.
          </motion.p>
          <motion.div variants={paragraphVariants} className="pt-2">
            <SocialLinks className="pointer-events-auto text-base font-[500] leading-relaxed" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
