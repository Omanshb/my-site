import type { Metadata } from "next";

import {
  AboutAccordion,
  type AccordionItem,
} from "@/components/about/about-accordion";
import { EducationCard } from "@/components/about/education";
import { ExperienceRows } from "@/components/about/experience-list";
import {
  ScrollRevealText,
  type RevealImage,
} from "@/components/about/scroll-reveal-text";
import { TopLeftStatus } from "@/components/layout/top-left-status";
import { TopNav } from "@/components/layout/top-nav";

export const metadata: Metadata = {
  title: "About",
  description: "A longer introduction to Omansh Bainsla and his work.",
};

const ABOUT_PARAGRAPHS = [
  "I believe curiosity, sharpened by rigor, is the most powerful force a person can wield.",
  "I spend my days trying to understand the systems that hold our world together: how they work, how to improve them, and how they can propel humanity in the right direction.",
  "I believe every answer, however small, will lead me an inch closer to fulfilling my dharma.",
  "I move with urgency across every facet of my life, acknowledging how infinitesimally small the odds of every breath I take are.",
  "I never move alone though. After all, the people beside me are my fuel, compass, and anchor.",
  "I marvel at the memories I’ve compiled throughout this journey but let there be no confusion: the horizon remains vast, untouched, and ours to chase.",
];

const ABOUT_IMAGES: RevealImage[] = [
  {
    src: "/media/images/IMG_5705.JPG",
    alt: "Pointing out over a sea of fog from a ridgeline at golden hour",
    width: 4311,
    height: 3047,
  },
  {
    src: "/media/images/IMG_1420.JPG",
    alt: "Sitting on a bench in cap and gown at Georgia Tech graduation",
    width: 1365,
    height: 2048,
  },
  {
    src: "/media/images/IMG_0347.jpeg",
    alt: "Building out a workspace late at night with friends",
    width: 4284,
    height: 5712,
  },
  {
    src: "/media/images/DSCN1259.JPG",
    alt: "With friends in front of the Salesforce \u201cFutures Made Here\u201d mural",
    width: 4320,
    height: 3240,
  },
];

const FELLOWSHIPS = [
  "Palantir Startup Fellow",
  "YC Startup School",
  "Millennium Technology Fellow",
];

const HONORS = [
  "3rd Place, xAI Hackathon",
  "USA Computing Olympiad Platinum Division",
  "American Invitational Mathematics Exam Qualifier",
  "USA Physics Olympiad Semifinalist",
  "USA Track and Field Nationals Qualifier",
  "EA Sports FC Divison 1 (Top 1.5%)"
];

function TextList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 px-5 pb-4">
      {items.map((item) => (
        <li
          key={item}
          className="font-display text-[18px] leading-snug text-white/85"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

const SECTIONS: AccordionItem[] = [
  { id: "experience", label: "Experience", content: <ExperienceRows /> },
  { id: "education", label: "Education", content: <EducationCard /> },
  {
    id: "fellowships",
    label: "Fellowships & Programs",
    content: <TextList items={FELLOWSHIPS} />,
  },
  { id: "awards", label: "Awards", content: <TextList items={HONORS} /> },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <TopLeftStatus />
      <TopNav />

      <ScrollRevealText text={ABOUT_PARAGRAPHS} images={ABOUT_IMAGES} />
      <AboutAccordion items={SECTIONS} />
    </main>
  );
}
