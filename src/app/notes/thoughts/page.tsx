import { THOUGHTS } from "@/app/notes/content";
import { NotesShell } from "@/app/notes/notes-shell";

export default function NotesThoughtsPage() {
  return (
    <NotesShell activeSection="thoughts">
      <section>
        <h2 className="font-display text-[32px] leading-none text-white">
          Thoughts
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-white/55">
          Small beliefs and values I return to.
        </p>
        <ul className="mt-6 space-y-3">
          {THOUGHTS.map((item) => (
            <li
              key={item.statement}
              className="border-b border-white/10 pb-3 text-base leading-relaxed text-white/82"
            >
              {item.statement}
            </li>
          ))}
        </ul>
      </section>
    </NotesShell>
  );
}
