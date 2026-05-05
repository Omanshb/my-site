import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        About
      </h1>
      <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
        Add a short bio, your background, and what you care about. This page is a
        stub — replace this paragraph with your story.
      </p>
    </div>
  );
}
