import Link from "next/link";

import { WRITINGS } from "@/app/notes/content";
import { NotesShell } from "@/app/notes/notes-shell";

export default function NotesWritingsPage() {
  return (
    <NotesShell activeSection="writings">
      <section>
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {WRITINGS.map((item) => (
            <li key={item.title} className="py-6">
              <div className="grid grid-cols-[96px_1fr] items-center gap-5 sm:grid-cols-[112px_1fr] sm:gap-6">
                <Link
                  href={item.href}
                  aria-label={`${item.entry}: ${item.title}`}
                  className="block h-[112px] w-[96px] rounded-sm border border-white/15 sm:h-[128px] sm:w-[112px]"
                  style={{ background: item.coverGradient }}
                />
                <div className="grid items-start gap-4 sm:grid-cols-[1fr_auto]">
                  <div>
                    <p className="font-nav text-[11px] uppercase tracking-[0.12em] text-white/50">
                      {item.entry}
                    </p>
                    <Link
                      href={item.href}
                      className="font-display mt-2 block text-[33px] leading-[1.02] text-white/95 transition-colors duration-200 hover:text-white"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-2 max-w-2xl text-base leading-relaxed text-white/62">
                      {item.description}
                    </p>
                  </div>
                  <p className="pt-1 text-xs tracking-[0.06em] text-white/42 sm:text-right">
                    {item.date}
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
