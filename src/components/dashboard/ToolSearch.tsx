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
        className="inline-flex h-11 items-center gap-2.5 rounded-2xl bg-fill-strong/70 pr-2 pl-3.5 text-sm text-secondary transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring sm:w-70"
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
