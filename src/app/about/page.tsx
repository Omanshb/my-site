import type { Metadata } from "next";

import { Credentials } from "@/components/about/credentials";
import { ExperienceList } from "@/components/about/experience-list";
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

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <TopLeftStatus />
      <TopNav />

      <ScrollRevealText text={ABOUT_TEXT} images={ABOUT_IMAGES} />
      <ExperienceList />
      <Credentials />
    </main>
  );
}
