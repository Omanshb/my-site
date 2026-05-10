"use client";

import { motion } from "framer-motion";

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
      staggerChildren: 0.15,
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
      <div className="pointer-events-auto h-full max-w-xl pb-12 pr-2 pt-24 text-left md:max-w-2xl md:pb-16 md:pr-3 md:pt-35 md:pl-2">
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
          I&apos;m Omansh Bainsla.
        </motion.h1>
        <motion.div
          className="mt-6 max-w-xl space-y-5 pl-1 text-pretty text-base font-[250] leading-relaxed text-white/90 md:text-lg md:leading-relaxed"
          variants={paragraphContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={paragraphVariants}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            luctus, nibh in egestas aliquam, justo sem luctus dui, vel aliquet
            felis lectus in sem. Sed gravida sapien ut justo sodales, at
            interdum mauris fermentum. Integer dictum lectus non quam tempor
            efficitur.
          </motion.p>
          <motion.p variants={paragraphVariants}>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Nunc tincidunt sem vel augue semper, nec
            congue magna vulputate. Aenean congue magna at eros tristique, sed
            feugiat lorem volutpat. Proin eu orci sit amet risus volutpat
            gravida.
          </motion.p>
          <motion.p variants={paragraphVariants}>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc tincidunt sem vel augue semper, nec congue magna vulputate. Aenean congue magna at eros tristique, sed feugiat lorem volutpat. Proin eu orci sit amet risus volutpat gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc tincidunt sem vel augue semper, nec congue magna vulputate. Aenean congue magna at eros tristique, sed feugiat lorem volutpat. Proin eu orci sit amet risus volutpat gravida.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
