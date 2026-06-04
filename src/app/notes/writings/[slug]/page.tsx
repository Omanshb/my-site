import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleHeader } from "@/components/notes/article-header";
import { ArticleShell } from "@/components/notes/article-shell";
import { WRITING_ARTICLES } from "@/content/writings/index";
import { getWritingBySlug, WRITINGS } from "@/data/notes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return WRITINGS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const writing = getWritingBySlug(slug);
  const Article = WRITING_ARTICLES[slug];

  if (!writing || !Article) {
    return { title: "Writing" };
  }

  return {
    title: writing.title,
    description: writing.description,
  };
}

export default async function WritingArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const writing = getWritingBySlug(slug);
  const Article = WRITING_ARTICLES[slug];

  if (!writing || !Article) {
    notFound();
  }

  return (
    <ArticleShell>
      <ArticleHeader
        entry={writing.entry}
        title={writing.title}
        description={writing.description}
        date={writing.date}
      />
      <Article />
    </ArticleShell>
  );
}
