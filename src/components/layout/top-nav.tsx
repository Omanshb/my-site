"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/notes", label: "Notes" },
  { href: "/media", label: "Media" },
] as const;

const baseLinkClassName =
  "font-nav text-[14px] uppercase tracking-[0.02em] text-[#555555] transition-colors duration-200 ease-out hover:text-white focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60";

const mobileLinkClassName =
  "block w-full px-4 py-2.5 text-right font-nav text-[14px] uppercase tracking-[0.02em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60";

function isNavItemActive(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

export function TopNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <nav
      className="fixed right-3 top-4 z-20 flex h-7 items-center sm:right-5 md:right-8 md:top-6"
      aria-label="Primary navigation"
    >
      <div className="hidden h-7 items-center gap-6 md:flex">
        {NAV_ITEMS.map((item) => {
          const isActive = isNavItemActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(baseLinkClassName, isActive && "text-white")}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <div ref={menuRef} className="relative flex h-7 items-center md:hidden">
        <button
          type="button"
          className="inline-flex h-7 w-7 shrink-0 flex-col items-center justify-center gap-[5px] text-[#555555] transition-colors duration-200 hover:text-white focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <span
            aria-hidden
            className={cn(
              "block h-px w-[18px] bg-current transition-transform duration-200",
              menuOpen && "translate-y-[6px] rotate-45",
            )}
          />
          <span
            aria-hidden
            className={cn(
              "block h-px w-[18px] bg-current transition-opacity duration-200",
              menuOpen && "opacity-0",
            )}
          />
          <span
            aria-hidden
            className={cn(
              "block h-px w-[18px] bg-current transition-transform duration-200",
              menuOpen && "-translate-y-[6px] -rotate-45",
            )}
          />
        </button>

        {menuOpen ? (
          <ul
            id="mobile-nav-menu"
            className="absolute right-0 top-9 z-30 min-w-36 overflow-hidden rounded-sm border border-white/10 bg-black/95 py-1 shadow-lg shadow-black/40"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = isNavItemActive(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      mobileLinkClassName,
                      isActive
                        ? "text-white"
                        : "text-[#555555] hover:text-white",
                    )}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </nav>
  );
}
