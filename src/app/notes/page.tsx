import Link from "next/link";

import { SocialLinks } from "@/components/social-links";
import { TopNav } from "@/components/top-nav";

type WritingItem = {
  title: string;
  blurb: string;
  date: string;
  href: string;
};

type ReadingItem = {
  title: string;
  takeaway: string;
  date: string;
  href?: string;
};

type ThoughtItem = {
  statement: string;
};

const WRITINGS: WritingItem[] = [
  {
    title: "Entry 4: Forward Projections",
    blurb: "Building things with a longer memory.",
    date: "Coming soon",
    href: "#",
  },
  {
    title: "Entry 3: Leaving Text Behind",
    blurb: "What changes when taste becomes visible.",
    date: "Coming soon",
    href: "#",
  },
  {
    title: "Entry 2: Global Maxima",
    blurb: "On depth over short-term optimization.",
    date: "Coming soon",
    href: "#",
  },
];

const READINGS: Record<string, ReadingItem[]> = {
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

const THOUGHTS: ThoughtItem[] = [
  { statement: "Distribution without craft is noise." },
  { statement: "Clarity is a competitive advantage." },
  { statement: "Taste is built, not inherited." },
  { statement: "A good product should teach itself." },
  { statement: "Momentum is usually an interface problem first." },
];

function ReadingGroup({
  label,
  items,
}: {
  label: string;
  items: ReadingItem[];
}) {
  return (
    <div className="space-y-3">
      <h3 className="font-nav text-xs uppercase tracking-[0.14em] text-white/55">
        {label}
      </h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={`${label}-${item.title}`}
            className="grid gap-1 border-b border-white/10 pb-3 sm:grid-cols-[1fr_auto]"
          >
            <div>
              <p className="font-display text-[19px] leading-tight text-white/95">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {item.title}
                  </Link>
                ) : (
                  item.title
                )}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white/60">
                {item.takeaway}
              </p>
            </div>
            <p className="text-xs tracking-[0.06em] text-white/45 sm:pt-1">
              {item.date}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function NotesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SocialLinks />
      <TopNav />
      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-24 sm:px-8 sm:pt-28">
        <header className="border-b border-white/15 pb-7">
          <p className="font-nav text-xs uppercase tracking-[0.18em] text-white/45">
            Notes
          </p>
          <h1 className="font-hero mt-4 text-[46px] leading-[0.98] text-white md:text-[56px]">
            writings, readings, thoughts
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/58 md:text-base">
            A minimal running log of what I write, what I consume, and what I
            believe.
          </p>
        </header>

        <section id="writings" className="pt-10">
          <h2 className="font-display text-[32px] leading-none text-white">
            Writings
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-white/55">
            Longer entries. Each one opens into a full post.
          </p>
          <ul className="mt-5 space-y-4">
            {WRITINGS.map((item) => (
              <li
                key={item.title}
                className="grid gap-2 border-b border-white/10 pb-4 sm:grid-cols-[1fr_auto]"
              >
                <div>
                  <Link
                    href={item.href}
                    className="font-display text-[23px] leading-tight text-white/95 transition-colors duration-200 hover:text-white"
                  >
                    {item.title}
                  </Link>
                  <p className="mt-1 text-sm text-white/58">{item.blurb}</p>
                </div>
                <p className="text-xs tracking-[0.06em] text-white/45 sm:pt-2">
                  {item.date}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section id="readings" className="pt-12">
          <h2 className="font-display text-[32px] leading-none text-white">
            Readings
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-white/55">
            Videos, papers, blogs, books - each with a short takeaway.
          </p>
          <div className="mt-6 space-y-8">
            {Object.entries(READINGS).map(([label, items]) => (
              <ReadingGroup key={label} label={label} items={items} />
            ))}
          </div>
        </section>

        <section id="thoughts" className="pt-12">
          <h2 className="font-display text-[32px] leading-none text-white">
            Thoughts
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-white/55">
            Small beliefs and values I return to.
          </p>
          <ul className="mt-6 space-y-3">
            {THOUGHTS.map((item) => (
              <li
                key={item.statement}
                className="border-b border-white/10 pb-3 text-base leading-relaxed text-white/82"
              >
                {item.statement}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
