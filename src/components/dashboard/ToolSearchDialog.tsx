"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { Search } from "lucide-react";
import { dashboardSearchItems, type DashboardNavItem } from "@/config/dashboard";
import { shellCopy } from "@/content/dashboard";
import { cn } from "@/lib/utils/cn";
import { matchesQuery } from "@/lib/utils/match-query";
import { NavIcon } from "@/components/dashboard/NavIcon";

type ToolSearchDialogProps = { onClose: () => void; items?: DashboardNavItem[] };

export function ToolSearchDialog({ onClose, items = dashboardSearchItems }: ToolSearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const results = useMemo(
    () => items.filter((item) => matchesQuery(query, [item.label, item.description])),
    [items, query],
  );

  const go = (item: DashboardNavItem) => {
    onClose();
    router.push(item.href);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") return onClose();
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((index) => Math.min(Math.max(index + step, 0), results.length - 1));
    }
    if (event.key === "Enter" && results[active]) {
      event.preventDefault();
      go(results[active]);
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={shellCopy.searchTools}
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-50 flex justify-center px-4 pt-[12vh]"
    >
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 motion-safe:animate-fade-in"
      />
      <div className="relative flex h-fit max-h-[70vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-surface shadow-card motion-safe:animate-pop">
        <label className="flex items-center gap-3 border-b border-separator px-4">
          <Search className="size-4 shrink-0 text-secondary" aria-hidden />
          <input
            autoFocus
            type="search"
            value={query}
            placeholder={shellCopy.searchPlaceholder}
            aria-label={shellCopy.searchPlaceholder}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            className="h-14 flex-1 bg-transparent text-[15px] outline-none placeholder:text-secondary"
          />
        </label>
        <ul role="listbox" aria-label={shellCopy.searchTools} className="overflow-y-auto p-2">
          {results.map((item, index) => (
            <li key={item.href}>
              <button
                type="button"
                role="option"
                aria-selected={index === active}
                onMouseEnter={() => setActive(index)}
                onClick={() => go(item)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                  index === active && "bg-fill",
                )}
              >
                <NavIcon item={item} />
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-semibold">{item.label}</span>
                  <span className="truncate text-xs text-secondary">{item.description}</span>
                </span>
              </button>
            </li>
          ))}
          {!results.length && <li className="px-3 py-8 text-center text-sm text-secondary">{shellCopy.noResults}</li>}
        </ul>
      </div>
    </div>,
    document.body,
  );
}
