type ArticleHeaderProps = {
  entry: string;
  title: string;
  description: string;
  date: string;
};

export function ArticleHeader({
  entry,
  title,
  description,
  date,
}: ArticleHeaderProps) {
  return (
    <header className="mt-10 border-b border-white/10 pb-10 md:mt-12 md:pb-12">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-notes-section text-[12.5px] tracking-[0.04em] text-white/50">
          {date}
        </p>
        <p className="font-notes-section text-[12px] uppercase tracking-[0.12em] text-white/50">
          {entry}
        </p>
      </div>

      <h1 className="font-display mt-6 text-[38px] leading-[1.04] text-white/96 sm:text-[46px] md:text-[52px]">
        {title}
      </h1>

      <p className="mt-5 max-w-[38rem] font-sans text-[17px] leading-[1.55] text-white/52 md:text-[18px] md:leading-[1.6]">
        {description}
      </p>
    </header>
  );
}
