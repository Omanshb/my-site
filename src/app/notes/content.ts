export type WritingItem = {
  entry: string;
  title: string;
  description: string;
  date: string;
  href: string;
  coverImage?: string;
  coverZoomClassName?: string;
  coverDither?: boolean;
};

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
    entry: "Entry 5",
    title: "Leaving the Sandbox",
    description:
      "What now?",
    date: "05.15.2026",
    href: "#",
    coverImage: "/blog_covers/leavingthesandbox.png",
    coverZoomClassName: "scale-[1.03]",
    coverDither: true,
  },
  {
    entry: "Entry 4",
    title: "Forward Projections",
    description: "Building things with a longer memory.",
    date: "Coming soon",
    href: "#",
  },
  {
    entry: "Entry 3",
    title: "Leaving Text Behind",
    description: "What changes when taste becomes visible.",
    date: "Coming soon",
    href: "#",
  },
  {
    entry: "Entry 2",
    title: "Global Maxima",
    description: "On depth over short-term optimization.",
    date: "Coming soon",
    href: "#",
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
