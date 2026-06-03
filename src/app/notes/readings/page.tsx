import { NotesShell } from "@/components/notes/notes-shell";
import { ReadingCategoryBrowser } from "@/components/notes/reading-category-browser";

export default function NotesReadingsPage() {
  return (
    <NotesShell activeSection="readings" contentClassName="pt-4">
      <ReadingCategoryBrowser />
    </NotesShell>
  );
}
