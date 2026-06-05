"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export type AccordionItem = {
  id: string;
  label: string;
  content: ReactNode;
  defaultOpen?: boolean;
};

export function AboutAccordion({ items }: { items: AccordionItem[] }) {
  const [openIds, setOpenIds] = useState<string[]>(() =>
    items.filter((item) => item.defaultOpen).map((item) => item.id),
  );

  const toggle = (id: string) =>
    setOpenIds((current) =>
      current.includes(id)
        ? current.filter((openId) => openId !== id)
        : [...current, id],
    );

  return (
    <section className="mx-auto w-full max-w-4xl px-6 pb-32 pt-6">
      <div className="border-t border-white/10">
        {items.map((item) => {
          const open = openIds.includes(item.id);

          return (
            <div key={item.id} className="border-b border-white/10">
              <h2>
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-expanded={open}
                  aria-controls={`about-panel-${item.id}`}
                  className="group flex w-full items-center justify-between gap-4 px-5 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <span
                    className={cn(
                      "font-nav text-[15px] uppercase tracking-[0.04em] transition-colors duration-200",
                      open
                        ? "text-white"
                        : "text-white/55 group-hover:text-white",
                    )}
                  >
                    {item.label}
                  </span>
                  <ChevronDown
                    size={16}
                    strokeWidth={2.5}
                    aria-hidden
                    className={cn(
                      "shrink-0 text-white/35 transition-all duration-300 group-hover:text-white/70",
                      open && "rotate-180 text-white/70",
                    )}
                  />
                </button>
              </h2>

              <div
                id={`about-panel-${item.id}`}
                className={cn(
                  "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="pb-9 pt-1" inert={!open}>
                    {item.content}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
