import { NotesShell } from "@/components/notes/notes-shell";

export default function NotesThoughtsPage() {
  return (
    <NotesShell activeSection="thoughts">
      <section>
        <ol className="space-y-3">
          <li className="flex items-baseline gap-2">
            <span className="font-display text-[36px] leading-none text-white/85">
              1.
            </span>
            <span className="text-[18px] leading-relaxed text-white/52">
              coming soon...
            </span>
          </li>
        </ol>
      </section>
    </NotesShell>
  );
}
