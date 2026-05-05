import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Projects
      </h1>
      <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
        Showcase work you&apos;re proud of — side projects, open source, or client
        work. This page is a stub; add cards or a list when you&apos;re ready.
      </p>
      <ul className="list-inside list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
        <li>Project one — one-line description</li>
        <li>Project two — one-line description</li>
      </ul>
    </div>
  );
}
