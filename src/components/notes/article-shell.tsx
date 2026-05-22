import type { ReactNode } from "react";
import Link from "next/link";

import { TopLeftStatus } from "@/components/layout/top-left-status";
import { TopNav } from "@/components/layout/top-nav";

type ArticleShellProps = {
  backHref?: string;
  backLabel?: string;
  children: ReactNode;
};

export function ArticleShell({
  backHref = "/notes/writings",
  backLabel = "writings",
  children,
}: ArticleShellProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <TopLeftStatus />
      <TopNav />
      <main className="mx-auto w-full max-w-[46rem] px-6 pb-32 pt-24 sm:px-8 sm:pt-28">
        <Link
          href={backHref}
          className="group inline-flex items-center gap-2.5 font-sans text-[14px] text-white/50 transition-colors duration-200 hover:text-white/80"
        >
          <span
            aria-hidden
            className="text-[15px] leading-none transition-transform duration-200 group-hover:-translate-x-0.5"
          >
            ←
          </span>
          {backLabel}
        </Link>
        {children}
      </main>
    </div>
  );
}
