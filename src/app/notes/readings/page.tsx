import Link from "next/link";

import { READINGS, type ReadingItem } from "@/app/notes/content";
import { NotesShell } from "@/app/notes/notes-shell";

function ReadingGroup({
  label,
  items,
}: {
  label: string;
  items: ReadingItem[];
}) {
  return (
    <div className="space-y-3">
      <h3 className="font-nav text-xs uppercase tracking-[0.14em] text-white/55">
        {label}
      </h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={`${label}-${item.title}`}
            className="grid gap-1 border-b border-white/10 pb-3 sm:grid-cols-[1fr_auto]"
          >
            <div>
              <p className="font-display text-[19px] leading-tight text-white/95">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {item.title}
                  </Link>
                ) : (
                  item.title
                )}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white/60">
                {item.takeaway}
              </p>
            </div>
            <p className="text-xs tracking-[0.06em] text-white/45 sm:pt-1">
              {item.date}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function NotesReadingsPage() {
  return (
    <NotesShell activeSection="readings">
      <section>
        <h2 className="font-display text-[32px] leading-none text-white">
          Readings
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-white/55">
          Videos, papers, blogs, books - each with a short takeaway.
        </p>
        <div className="mt-6 space-y-8">
          {Object.entries(READINGS).map(([label, items]) => (
            <ReadingGroup key={label} label={label} items={items} />
          ))}
        </div>
      </section>
    </NotesShell>
  );
}
