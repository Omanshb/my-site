export type WritingItem = {
  slug: string;
  entry: string;
  title: string;
  description: string;
  date: string;
  coverImage?: string;
  coverZoomClassName?: string;
  coverDither?: boolean;
};

export function getWritingHref(slug: string) {
  return `/notes/writings/${slug}`;
}

export function getWritingBySlug(slug: string): WritingItem | undefined {
  return WRITINGS.find((item) => item.slug === slug);
}

export type ReadingItem = {
  title: string;
  takeaway: string;
  date: string;
  href?: string;
};

export type ThoughtItem = {
  statement: string;
};

export const WRITINGS: WritingItem[] = [
  {
    slug: "earning-my-goodbyes",
    entry: "Entry 1",
    title: "Earning My Goodbyes",
    description: "Leaving 1804 and Tech",
    date: "05.19.2026",
    coverImage: "/blog_covers/earningmygoodbyes.jpeg",
    coverZoomClassName: "rotate-90 scale-[1.15]",
    coverDither: true,
  },
];

export const READINGS: Record<string, ReadingItem[]> = {
  videos: [
    {
      title: "Visual Explanations in Motion Design",
      takeaway: "Good pacing turns complexity into intuition.",
      date: "May 2026",
    },
  ],
  papers: [
    {
      title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs",
      takeaway: "Reasoning quality can emerge from clean objectives.",
      date: "May 2026",
    },
    {
      title: "Learning to Reason in 1.3 Parameters",
      takeaway: "Constraint-driven design often sharpens ideas.",
      date: "March 2026",
    },
  ],
  blogs: [
    {
      title: "Notes on Product Taste",
      takeaway: "Small interface choices quietly shape trust.",
      date: "April 2026",
    },
  ],
  books: [
    {
      title: "Zero to One",
      takeaway: "Original insight compounds when distribution is focused.",
      date: "May 2026",
    },
  ],
};

export const THOUGHTS: ThoughtItem[] = [
  { statement: "Distribution without craft is noise." },
  { statement: "Clarity is a competitive advantage." },
  { statement: "Taste is built, not inherited." },
  { statement: "A good product should teach itself." },
  { statement: "Momentum is usually an interface problem first." },
];
