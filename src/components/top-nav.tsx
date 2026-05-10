"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/notes", label: "Notes" },
  { href: "/media", label: "Media" },
] as const;

const baseLinkClassName =
  "font-nav text-[14px] uppercase tracking-[0.02em] text-[#555555] transition-colors duration-200 ease-out hover:text-white focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60";

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed right-6 top-4 z-20 flex h-7 items-center gap-5 md:right-8 md:top-6 md:gap-6"
      aria-label="Primary navigation"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${baseLinkClassName} ${isActive ? "text-white" : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
