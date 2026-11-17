"use client";

import { useCallback, useState } from "react";
import { Search } from "lucide-react";
import { shellCopy } from "@/content/dashboard";
import { useCommandShortcut } from "@/hooks/useCommandShortcut";
import { ToolSearchDialog } from "@/components/dashboard/ToolSearchDialog";

export function ToolSearch() {
  const [open, setOpen] = useState(false);
  const openSearch = useCallback(() => setOpen(true), []);
  useCommandShortcut("k", openSearch);

  return (
    <>
      <button
        type="button"
        onClick={openSearch}
        aria-label={shellCopy.searchTools}
        className="inline-flex size-10 items-center justify-center gap-2.5 rounded-xl bg-surface text-sm text-foreground shadow-thumb transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring sm:h-11 sm:w-70 sm:justify-start sm:rounded-2xl sm:bg-fill-strong/70 sm:pr-2 sm:pl-3.5 sm:text-secondary sm:shadow-none"
      >
        <Search className="size-4 shrink-0" aria-hidden />
        <span className="hidden flex-1 text-left sm:inline">{shellCopy.searchTools}</span>
        <kbd className="hidden h-6.5 items-center rounded-lg bg-surface px-2 font-sans text-xs font-semibold text-foreground sm:inline-flex">
          ⌘K
        </kbd>
      </button>
      {open && <ToolSearchDialog onClose={() => setOpen(false)} />}
    </>
  );
}
