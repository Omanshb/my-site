"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  READING_CATEGORIES,
  READINGS,
  type ReadingCategory,
} from "@/data/notes";
import { cn } from "@/lib/utils";

const initialCategory = READING_CATEGORIES[0].id;

export function ReadingCategoryBrowser() {
  const [activeCategory, setActiveCategory] =
    useState<ReadingCategory>(initialCategory);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const activeLabel =
    READING_CATEGORIES.find((category) => category.id === activeCategory)
      ?.label ?? "Readings";
  const activeItems = READINGS[activeCategory];

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [menuOpen]);

  const selectCategory = (category: ReadingCategory) => {
    setActiveCategory(category);
    setMenuOpen(false);
  };

  return (
    <section aria-label="What I consume">
      <div
        ref={menuRef}
        className="flex flex-col items-center border-b border-white/10 pb-3"
      >
        <button
          type="button"
          className="inline-flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
          onClick={() => setMenuOpen((open) => !open)}
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

      {activeItems.length > 0 ? (
        <ul>
          {activeItems.map((item) => {
            const rowClassName =
              "group grid gap-2 border-b border-white/10 py-4 transition-colors duration-200 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6";

            const rowContent = (
              <>
                <p className="text-[21px] leading-tight">
                  <span className="font-display text-white/85 transition-colors duration-200 group-hover:text-white">
                    {item.title}
                  </span>
                  {item.author ? (
                    <span className="text-base leading-relaxed text-white/60">
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
