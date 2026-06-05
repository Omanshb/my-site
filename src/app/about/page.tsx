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

const ABOUT_TEXT =
  "I use this page as a slower introduction than the one on the homepage: a place to trace the people, problems, and ideas that have shaped how I work. Most of what I’m drawn to lives at the boundary between research and production, taking fragile theoretical ideas and turning them into systems that survive real users, messy constraints, and the occasional dead laptop.";

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
    <ul className="space-y-2.5 px-5">
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
  { id: "experience", label: "Experience", content: <ExperienceRows />, defaultOpen: true },
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

      <ScrollRevealText text={ABOUT_TEXT} images={ABOUT_IMAGES} />
      <AboutAccordion items={SECTIONS} />
    </main>
  );
}
