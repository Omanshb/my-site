"use client";

import { Children } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

import {
  revealHidden,
  revealTransition,
  revealVisible,
} from "@/components/notes/article-motion";

type ArticleBodyProps = {
  children: ReactNode;
};

export function ArticleBody({ children }: ArticleBodyProps) {
  const items = Children.toArray(children);
  const count = items.length;

  return (
    <article className="article-prose pt-10 md:pt-12">
      {items.map((child, index) => (
        <motion.div
          key={index}
          initial={revealHidden}
          animate={revealVisible}
          transition={revealTransition(index, count, { start: 0.55 })}
        >
          {child}
        </motion.div>
      ))}
    </article>
  );
}
