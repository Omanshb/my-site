import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Hello, I&apos;m
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Your Name
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Designer, developer, or whatever describes you best — replace this line
          with a short tagline.
        </p>
      </section>

      <section className="flex flex-wrap gap-4">
        <Link
          href="https://github.com/yourusername"
          className="inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
        <a
          href="mailto:you@example.com"
          className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          Email
        </a>
        <Link
          href="/projects"
          className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-400"
        >
          View projects
        </Link>
      </section>
    </div>
  );
}
