"use client";

import { motion } from "framer-motion";

import {
  revealHidden,
  revealTransition,
  revealVisible,
} from "@/components/notes/article-motion";

type ArticleHeaderProps = {
  entry: string;
  title: string;
  description: string;
  date: string;
};

const HEADER_COUNT = 3;

const headerTransition = (index: number) =>
  revealTransition(index, HEADER_COUNT, { start: 0, total: 1, duration: 0.7 });

export function ArticleHeader({
  entry,
  title,
  description,
  date,
}: ArticleHeaderProps) {
  return (
    <header className="mt-10 border-b border-white/10 pb-10 md:mt-12 md:pb-12">
      <motion.div
        initial={revealHidden}
        animate={revealVisible}
        transition={headerTransition(0)}
        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
      >
        <p className="font-notes-section text-[12.5px] tracking-[0.04em] text-white/50">
          {date}
        </p>
        <p className="font-notes-section text-[12px] uppercase tracking-[0.12em] text-white/50">
          {entry}
        </p>
      </motion.div>

      <motion.h1
        initial={revealHidden}
        animate={revealVisible}
        transition={headerTransition(1)}
        className="font-display mt-6 text-[38px] leading-[1.04] text-white/96 sm:text-[46px] md:text-[52px]"
      >
        {title}
      </motion.h1>

      <motion.p
        initial={revealHidden}
        animate={revealVisible}
        transition={headerTransition(2)}
        className="mt-5 max-w-[38rem] font-sans text-[17px] leading-[1.55] text-white/52 md:text-[18px] md:leading-[1.6]"
      >
        {description}
      </motion.p>
    </header>
  );
}
