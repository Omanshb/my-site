import Link from "next/link";

import { NotesShell } from "@/components/notes/notes-shell";
import { WritingCover } from "@/components/notes/writing-cover";
import { WRITINGS } from "@/data/notes";

export default function NotesWritingsPage() {
  return (
    <NotesShell activeSection="writings" contentClassName="pt-0">
      <section>
        <ul>
          {WRITINGS.map((item) => (
            <li
              key={item.title}
              className="border-b border-white/10 py-6"
            >
              <div className="grid grid-cols-[96px_1fr] items-center gap-5 sm:grid-cols-[112px_1fr] sm:gap-6">
                <Link
                  href={item.href}
                  aria-label={`${item.entry}: ${item.title}`}
                  className="relative block h-[112px] w-[96px] overflow-hidden border border-white/15 bg-white/[0.03] sm:h-[128px] sm:w-[112px]"
                >
                  <WritingCover
                    src={item.coverImage}
                    alt={`${item.title} cover image`}
                    useDither={item.coverDither}
                    zoomClassName={item.coverZoomClassName}
                  />
                </Link>
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-nav text-[11px] uppercase tracking-[0.12em] text-white/42">
                      {item.date}
                    </p>
                    <p className="font-nav text-[11px] uppercase tracking-[0.12em] text-white/58">
                      {item.entry}
                    </p>
                  </div>
                  <Link
                    href={item.href}
                    className="font-display mt-2 block text-[33px] leading-[1.02] text-white/95 transition-colors duration-200 hover:text-white"
                  >
                    {item.title}
                  </Link>
                  <p className="mt-2 max-w-2xl text-base leading-relaxed text-white/60">
                    {item.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </NotesShell>
  );
}
