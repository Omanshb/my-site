import type { ReactNode } from "react";
import Link from "next/link";

import { TopLeftStatus } from "@/components/layout/top-left-status";
import { TopNav } from "@/components/layout/top-nav";

type NotesSection = "writings" | "readings" | "thoughts";

type NotesShellProps = {
  activeSection: NotesSection;
  children: ReactNode;
  contentClassName?: string;
};

const linkClassName =
  "text-white underline decoration-white/90 underline-offset-4 transition-opacity duration-200 hover:opacity-85";

export function NotesShell({
  activeSection,
  children,
  contentClassName = "pt-10",
}: NotesShellProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <TopLeftStatus />
      <TopNav />
      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-24 sm:px-8 sm:pt-28">
        <header className="border-b border-white/15 pb-7">
          <h1 className="font-hero text-[46px] leading-[0.98] text-white md:text-[56px]">
            Notes
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/52 md:text-lg">
            <span className="text-white/45">A running log of what I </span>
            <Link
              href="/notes/writings"
              className={`${linkClassName} ${
                activeSection === "writings" ? "opacity-100" : "opacity-90"
              }`}
              aria-current={activeSection === "writings" ? "page" : undefined}
            >
              write
            </Link>
            <span className="text-white/45">, what I </span>
            <Link
              href="/notes/readings"
              className={`${linkClassName} ${
                activeSection === "readings" ? "opacity-100" : "opacity-90"
              }`}
              aria-current={activeSection === "readings" ? "page" : undefined}
            >
              consume
            </Link>
            <span className="text-white/45">, and what I </span>
            <Link
              href="/notes/thoughts"
              className={`${linkClassName} ${
                activeSection === "thoughts" ? "opacity-100" : "opacity-90"
              }`}
              aria-current={activeSection === "thoughts" ? "page" : undefined}
            >
              believe
            </Link>
            <span className="text-white/45">.</span>
          </p>
        </header>
        <div className={contentClassName}>{children}</div>
      </main>
    </div>
  );
}
