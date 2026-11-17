import { SearchX } from "lucide-react";
import type { DashboardNavItem } from "@/config/dashboard";
import { shellCopy } from "@/content/dashboard";
import { NavIcon } from "@/components/dashboard/NavIcon";

const SUGGESTION_COUNT = 4;

type SearchEmptyStateProps = {
  query: string;
  items: DashboardNavItem[];
  onSelect: (item: DashboardNavItem) => void;
};

export function SearchEmptyState({ query, items, onSelect }: SearchEmptyStateProps) {
  const suggestions = items.filter((item) => item.iconSrc).slice(0, SUGGESTION_COUNT);

  return (
    <div className="flex flex-col items-center gap-5 px-3 pt-6 pb-4 text-center motion-safe:animate-fade-up">
      <span className="flex size-14 items-center justify-center rounded-full bg-fill text-secondary">
        <SearchX className="size-6" aria-hidden />
      </span>
      <div className="flex max-w-xs flex-col gap-1.5">
        <p className="text-[15px] font-semibold">
          {shellCopy.noResultsFor}{" "}
          <span translate="no" className="notranslate break-all">&ldquo;{query.trim()}&rdquo;</span>
        </p>
        <p className="text-[13px] leading-relaxed text-secondary">{shellCopy.noResultsHint}</p>
      </div>
      {suggestions.length > 0 && (
        <div className="flex w-full flex-col gap-2">
          <span className="text-[11px] font-semibold tracking-[0.12em] text-tertiary uppercase">{shellCopy.popularTools}</span>
          <ul className="grid grid-cols-2 gap-1.5">
            {suggestions.map((item) => (
              <li key={item.href} className="min-w-0">
                <button
                  type="button"
                  onClick={() => onSelect(item)}
                  className="flex w-full items-center gap-2.5 rounded-xl bg-fill px-2.5 py-2 text-left text-[13px] font-semibold transition-colors hover:bg-fill-strong focus-visible:outline-2 focus-visible:outline-ring"
                >
                  <NavIcon item={item} />
                  <span className="truncate">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
