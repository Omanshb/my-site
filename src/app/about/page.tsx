import type { Metadata } from "next";

import { TopLeftStatus } from "@/components/layout/top-left-status";
import { TopNav } from "@/components/layout/top-nav";

export const metadata: Metadata = {
  title: "About",
  description: "A longer introduction to Omansh Bainsla and his work.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <TopLeftStatus />
      <TopNav />

      <section className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center px-6 py-28 sm:px-8 md:py-32">
        <p className="font-notes-section text-[11px] uppercase tracking-[0.22em] text-white/35">
          About
        </p>
        <h1 className="mt-4 max-w-3xl font-hero text-[56px] leading-[0.96] tracking-tight text-white md:text-[78px]">
          A little more context.
        </h1>
        <p className="mt-8 max-w-3xl text-lg font-[250] leading-[1.8] text-white/64 md:text-xl md:leading-[1.85]">
          I use this page as a slower introduction than the one on the
          homepage: a place to trace the people, problems, and ideas that have
          shaped how I work. Most of what I&apos;m drawn to lives at the
          boundary between research and production, taking fragile theoretical
          ideas and turning them into systems that survive real users, messy
          constraints, and the occasional dead laptop.
        </p>
      </section>
    </main>
  );
}
