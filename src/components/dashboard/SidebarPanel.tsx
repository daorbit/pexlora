"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { isNavItemActive, type DashboardSection } from "@/config/dashboard";
import { shellCopy } from "@/content/dashboard";
import { SidebarLink } from "@/components/dashboard/SidebarLink";

type SidebarPanelProps = { section: DashboardSection; footer: ReactNode };

export function SidebarPanel({ section, footer }: SidebarPanelProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const general = section.id === "general";
  const needle = query.trim().toLowerCase();
  const items = needle ? section.items.filter((item) => item.label.toLowerCase().includes(needle)) : section.items;

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-3.5 px-3 pt-4.5 pb-3">
      <div className="flex flex-col gap-0.5 px-1.5">
        <h2 className="text-base font-semibold tracking-[-0.02em]">{section.title}</h2>
        <p className="text-xs text-secondary">{general ? shellCopy.generalNote : shellCopy.toolCount(section.items.length)}</p>
      </div>
      {!general && (
        <label className="flex h-9 items-center gap-2 rounded-[10px] bg-background px-2.5 text-secondary focus-within:outline-2 focus-within:outline-ring">
          <Search className="size-3.75 shrink-0" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={shellCopy.filterTools}
            aria-label={shellCopy.filterTools}
            className="min-w-0 flex-1 bg-transparent text-[13px] text-foreground outline-none placeholder:text-secondary"
          />
        </label>
      )}
      <nav aria-label={section.title} className="scrollbar-none relative -mx-1 flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto px-1">
        {items.map((item) => (
          <SidebarLink key={item.href} item={item} active={isNavItemActive(item, pathname)} />
        ))}
        {!items.length && <p className="px-2.5 py-2 text-[13px] text-secondary">{shellCopy.noMatches}</p>}
      </nav>
      <div className="flex shrink-0 flex-col gap-2 border-t border-separator pt-3">{footer}</div>
    </div>
  );
}
