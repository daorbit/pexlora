import type { RefObject } from "react";
import type { DashboardNavItem } from "@/config/dashboard";
import { shellCopy } from "@/content/dashboard";
import type { ResultGroup } from "@/lib/search/group-results";
import { SearchResultRow } from "@/components/dashboard/search/SearchResultRow";

type SearchResultsProps = {
  id: string;
  groups: ResultGroup[];
  active: number;
  listRef: RefObject<HTMLDivElement | null>;
  optionId: (index: number) => string;
  onHover: (index: number) => void;
  onSelect: (item: DashboardNavItem) => void;
};

export function SearchResults({ id, groups, active, listRef, optionId, onHover, onSelect }: SearchResultsProps) {
  return (
    <div
      id={id}
      ref={listRef}
      role="listbox"
      aria-label={shellCopy.searchTools}
      className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-2"
    >
      {groups.map((group) => (
        <div key={group.title || "pages"} role="group" aria-label={group.title || undefined} className="pt-2">
          {group.title && (
            <p className="px-2.5 pt-1 pb-1.5 text-[11px] font-semibold tracking-[0.08em] text-tertiary uppercase">{group.title}</p>
          )}
          <ul role="presentation" className="flex flex-col gap-0.5">
            {group.items.map(({ item, index }) => (
              <SearchResultRow
                key={item.href}
                id={optionId(index)}
                item={item}
                active={index === active}
                onHover={() => onHover(index)}
                onSelect={() => onSelect(item)}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
