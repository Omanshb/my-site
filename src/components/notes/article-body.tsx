import type { ReactNode } from "react";

type ArticleBodyProps = {
  children: ReactNode;
};

export function ArticleBody({ children }: ArticleBodyProps) {
  return (
    <article className="article-prose pt-10 md:pt-12">{children}</article>
  );
}
