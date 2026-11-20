"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { Search, X } from "lucide-react";
import { dashboardSearchItems, type DashboardNavItem } from "@/config/dashboard";
import { shellCopy } from "@/content/dashboard";
import { useOverlayLock } from "@/hooks/useOverlayLock";
import { groupResults } from "@/lib/search/group-results";
import { matchesQuery } from "@/lib/utils/match-query";
import { Kbd } from "@/components/ui/Kbd";
import { SearchEmptyState } from "@/components/dashboard/SearchEmptyState";
import { SearchFooter } from "@/components/dashboard/search/SearchFooter";
import { SearchResults } from "@/components/dashboard/search/SearchResults";

type ToolSearchDialogProps = { onClose: () => void; items?: DashboardNavItem[] };

export function ToolSearchDialog({ onClose, items = dashboardSearchItems }: ToolSearchDialogProps) {
  const router = useRouter();
  const listId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  useOverlayLock(true, onClose);

  const { ordered, grouped } = useMemo(
    () => groupResults(items.filter((item) => matchesQuery(query, [item.label, item.description, item.group ?? ""]))),
    [items, query],
  );
  const optionId = (index: number) => `${listId}-option-${index}`;

  useEffect(() => {
    if (active === 0) listRef.current?.scrollTo({ top: 0 });
    else document.getElementById(`${listId}-option-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, listId]);

  const go = (item: DashboardNavItem) => {
    onClose();
    router.push(item.href);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((index) => (index + step + ordered.length) % Math.max(ordered.length, 1));
    }
    if (event.key === "Enter" && ordered[active]) {
      event.preventDefault();
      go(ordered[active]);
    }
  };

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={shellCopy.searchTools} className="fixed inset-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-[12vh]">
      <button
        type="button"
        tabIndex={-1}
        aria-label={shellCopy.closeSearch}
        onClick={onClose}
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px] motion-safe:animate-fade-in"
      />
      <div className="relative flex h-fit max-h-[min(80dvh,640px)] w-full max-w-[640px] flex-col overflow-hidden rounded-2xl border border-separator bg-surface shadow-[0_24px_64px_-12px_rgb(0_0_0/0.35)] motion-safe:animate-pop">
        <div className="flex items-center gap-3 border-b border-separator pr-3 pl-4">
          <Search className="size-[18px] shrink-0 text-tertiary" aria-hidden />
          <input
            autoFocus
            type="text"
            role="combobox"
            aria-expanded={ordered.length > 0}
            aria-controls={listId}
            aria-activedescendant={ordered[active] ? optionId(active) : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
            value={query}
            placeholder={shellCopy.searchPlaceholder}
            aria-label={shellCopy.searchPlaceholder}
            onKeyDown={onKeyDown}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            className="h-14 min-w-0 flex-1 bg-transparent text-[16px] outline-none placeholder:text-tertiary"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={shellCopy.closeSearch}
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-fill focus-visible:outline-2 focus-visible:outline-ring sm:size-auto sm:rounded-md sm:hover:bg-transparent"
          >
            <X className="size-[18px] sm:hidden" aria-hidden />
            <Kbd className="max-sm:hidden">{shellCopy.escKey}</Kbd>
          </button>
        </div>
        {ordered.length > 0 ? (
          <SearchResults id={listId} groups={grouped} active={active} listRef={listRef} optionId={optionId} onHover={setActive} onSelect={go} />
        ) : (
          <SearchEmptyState query={query} items={items} onSelect={go} />
        )}
        <SearchFooter count={ordered.length} />
      </div>
    </div>,
    document.body,
  );
}
