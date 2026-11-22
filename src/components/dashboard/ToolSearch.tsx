"use client";

import { useCallback, useState } from "react";
import { Search } from "lucide-react";
import type { DashboardNavItem } from "@/config/dashboard";
import { shellCopy } from "@/content/dashboard";
import { useCommandShortcut } from "@/hooks/useCommandShortcut";
import { cn } from "@/lib/utils/cn";
import { ToolSearchDialog } from "@/components/dashboard/ToolSearchDialog";

const variants = {
  bar: "inline-flex size-10 items-center justify-center gap-2.5 rounded-xl bg-surface text-sm text-foreground shadow-thumb transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring sm:h-11 sm:w-70 sm:justify-start sm:rounded-2xl sm:bg-fill-strong/70 sm:pr-2 sm:pl-3.5 sm:text-secondary sm:shadow-none",
  header:
    "inline-flex size-10 shrink-0 items-center justify-center gap-2 rounded-xl text-sm text-secondary transition-colors hover:bg-fill hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring bg-fill xl:h-9 xl:w-44 xl:justify-start xl:pr-1.5 xl:pl-3",
};

const labelVisibility = { bar: "sm:inline", header: "xl:inline" };
const kbdVisibility = { bar: "sm:inline-flex", header: "xl:inline-flex" };

type ToolSearchProps = { variant?: keyof typeof variants; items?: DashboardNavItem[] };

export function ToolSearch({ variant = "bar", items }: ToolSearchProps) {
  const [open, setOpen] = useState(false);
  const openSearch = useCallback(() => setOpen(true), []);
  useCommandShortcut("k", openSearch);

  return (
    <>
      <button
        type="button"
        onClick={openSearch}
        aria-label={shellCopy.searchTools}
        title={shellCopy.searchShortcut}
        className={variants[variant]}
      >
        <Search className="size-4 shrink-0" aria-hidden />
        <span className={cn("hidden flex-1 text-left whitespace-nowrap", labelVisibility[variant])}>{shellCopy.searchTools}</span>
        <kbd
          className={cn(
            "hidden h-6.5 items-center rounded-lg bg-surface px-2 font-sans text-xs font-semibold text-foreground",
            kbdVisibility[variant],
          )}
        >
          ⌘K
        </kbd>
      </button>
      {open && <ToolSearchDialog onClose={() => setOpen(false)} items={items} />}
    </>
  );
}
