"use client";

import { ChevronDown, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  MOVIES,
  READING_CATEGORIES,
  READINGS,
  type MovieItem,
  type ReadingCategory,
  type ReadingItem,
} from "@/data/notes";
import { cn } from "@/lib/utils";

const initialCategory = READING_CATEGORIES[0].id;

type SortOption = "date" | "alphabetical" | "rating";

const DEFAULT_SORT_BY_CATEGORY: Record<ReadingCategory, SortOption> = {
  papers: "date",
  books: "date",
  videos: "date",
  blogs: "date",
  movies: "rating",
};

const SORT_LABELS: Record<SortOption, string> = {
  date: "Date released",
  alphabetical: "Alphabetical",
  rating: "Rating",
};

const formatRating = (rating: number) =>
  `${"★".repeat(Math.floor(rating))}${rating % 1 ? "½" : ""}`;

const getSortOptions = (category: ReadingCategory): SortOption[] =>
  category === "movies" ? ["rating", "date", "alphabetical"] : ["date", "alphabetical"];

const getYear = (date?: string) => {
  const match = date?.match(/\d{4}/);
  return match ? Number(match[0]) : Number.NEGATIVE_INFINITY;
};

const sortReadingItems = (items: ReadingItem[], sortBy: SortOption) =>
  [...items].sort((a, b) => {
    if (sortBy === "alphabetical") {
      return a.title.localeCompare(b.title);
    }

    return getYear(b.date) - getYear(a.date);
  });

const sortMovies = (movies: MovieItem[], sortBy: SortOption) =>
  [...movies].sort((a, b) => {
    if (sortBy === "alphabetical") {
      return a.title.localeCompare(b.title);
    }

    if (sortBy === "date") {
      return getYear(b.releaseYear) - getYear(a.releaseYear);
    }

    return b.rating - a.rating;
  });

export function ReadingCategoryBrowser() {
  const [activeCategory, setActiveCategory] =
    useState<ReadingCategory>(initialCategory);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [sortByCategory, setSortByCategory] = useState(DEFAULT_SORT_BY_CATEGORY);
  const menuRef = useRef<HTMLDivElement>(null);

  const activeLabel =
    READING_CATEGORIES.find((category) => category.id === activeCategory)
      ?.label ?? "Readings";
  const isMovieCategory = activeCategory === "movies";
  const activeItems = READINGS[activeCategory];
  const activeSort = sortByCategory[activeCategory];
  const activeSortOptions = getSortOptions(activeCategory);
  const sortedItems = useMemo(
    () => sortReadingItems(activeItems, activeSort),
    [activeItems, activeSort],
  );
  const sortedMovies = useMemo(
    () => sortMovies(MOVIES, activeSort),
    [activeSort],
  );

  useEffect(() => {
    if (!menuOpen && !sortMenuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
        setSortMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [menuOpen, sortMenuOpen]);

  const selectCategory = (category: ReadingCategory) => {
    setActiveCategory(category);
    setMenuOpen(false);
  };

  const selectSort = (sortBy: SortOption) => {
    setSortByCategory((current) => ({
      ...current,
      [activeCategory]: sortBy,
    }));
    setSortMenuOpen(false);
  };

  return (
    <section aria-label="What I consume">
      <div
        ref={menuRef}
        className="relative flex flex-col items-center border-b border-white/10 pb-3"
      >
        <div className="flex flex-col items-center">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
            onClick={() => {
              setMenuOpen((open) => !open);
              setSortMenuOpen(false);
            }}
            aria-expanded={menuOpen}
            aria-haspopup="listbox"
            aria-label={`Category: ${activeLabel}`}
          >
            <span className="font-nav text-[14px] uppercase tracking-[0.02em] text-white">
              {activeLabel}
            </span>
            <ChevronDown
              size={14}
              strokeWidth={3}
              aria-hidden
              className={cn(
                "text-[#555555] transition-transform duration-200",
                menuOpen && "rotate-180",
              )}
            />
          </button>

          {menuOpen ? (
            <ul
              role="listbox"
              aria-label="Choose consume section"
              className="mt-2 flex flex-col items-center gap-1"
            >
              {READING_CATEGORIES.map((category) => {
                const isActive = category.id === activeCategory;

                return (
                  <li key={category.id} role="none">
                    <button
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      onClick={() => selectCategory(category.id)}
                      className={cn(
                        "font-nav text-[14px] uppercase tracking-[0.02em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60",
                        isActive
                          ? "text-white"
                          : "text-[#555555] hover:text-white",
                      )}
                    >
                      {category.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>

        <button
          type="button"
          className="absolute right-0 top-0 inline-flex h-6 w-6 items-center justify-center text-[#555555] transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
          onClick={() => {
            setSortMenuOpen((open) => !open);
            setMenuOpen(false);
          }}
          aria-expanded={sortMenuOpen}
          aria-haspopup="listbox"
          aria-label={`Sort by: ${SORT_LABELS[activeSort]}`}
        >
          <SlidersHorizontal size={16} strokeWidth={2.25} aria-hidden />
        </button>

        {sortMenuOpen ? (
          <ul
            role="listbox"
            aria-label={`Sort ${activeLabel.toLowerCase()}`}
            className="absolute right-0 top-8 z-10 flex min-w-36 flex-col items-end gap-1 bg-black/95 py-1"
          >
            {activeSortOptions.map((sortOption) => {
              const isActive = sortOption === activeSort;

              return (
                <li key={sortOption} role="none">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => selectSort(sortOption)}
                    className={cn(
                      "font-nav text-[14px] uppercase tracking-[0.02em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60",
                      isActive ? "text-white" : "text-[#555555] hover:text-white",
                    )}
                  >
                    {SORT_LABELS[sortOption]}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>

      {isMovieCategory ? (
        <MovieList movies={sortedMovies} />
      ) : sortedItems.length > 0 ? (
        <ul>
          {sortedItems.map((item) => {
            const rowClassName =
              "group grid gap-2 border-b border-white/10 py-4 transition-colors duration-200 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6";

            const rowContent = (
              <>
                <p className="text-[21px] leading-tight">
                  <span className="font-display text-white/85 transition-colors duration-200 group-hover:text-white">
                    {item.title}
                  </span>
                  {item.author ? (
                    <span className="text-base leading-relaxed text-white/52">
                      , {item.author}
                    </span>
                  ) : null}
                </p>
                {item.date ? (
                  <span className="font-notes-section text-[11px] uppercase tracking-[0.12em] text-white/45 sm:text-right">
                    {item.date}
                  </span>
                ) : null}
              </>
            );

            return (
              <li key={`${activeCategory}-${item.title}`}>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={rowClassName}
                  >
                    {rowContent}
                  </a>
                ) : (
                  <div className={rowClassName}>{rowContent}</div>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="border-b border-white/10 py-4 text-center text-sm leading-relaxed text-white/50">
          No {activeLabel.toLowerCase()} here yet.
        </p>
      )}
    </section>
  );
}

function MovieList({ movies }: { movies: MovieItem[] }) {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.href} className="border-b border-white/10 py-4">
          <a
            href={movie.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid grid-cols-[72px_1fr] items-start gap-4 transition-colors duration-200 sm:grid-cols-[92px_1fr] sm:gap-6"
          >
            <div className="relative h-[108px] w-[72px] overflow-hidden border border-white/15 bg-white/[0.03] sm:h-[138px] sm:w-[92px]">
              <Image
                src={movie.poster}
                alt={`${movie.title} poster`}
                fill
                className="object-cover"
                sizes="(min-width: 640px) 92px, 72px"
              />
            </div>
            <div className="relative flex min-h-[108px] min-w-0 items-center sm:min-h-[138px]">
              <span className="absolute right-0 top-0 font-notes-section text-[11px] uppercase tracking-[0.12em] text-white/45">
                {movie.releaseYear}
              </span>
              <div className="min-w-0 pr-14 sm:pr-16">
                <h2 className="font-display text-[26px] leading-[1.02] text-white/85 transition-colors duration-200 group-hover:text-white sm:text-[31px]">
                  <span>{movie.title}</span>
                  <span className="font-sans text-base leading-relaxed text-white/52">
                    , {movie.director}
                  </span>
                </h2>
                <p
                  className="mt-2 font-notes-section text-[13px] tracking-[0.18em] text-white/55"
                  aria-label={`${movie.rating} out of 5 stars`}
                >
                  {formatRating(movie.rating)}
                </p>
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
