"use client";

import { Search, X } from "lucide-react";
import { getWorkspaceTool, type ToolCategory } from "@/config/tools";
import { historyCopy } from "@/content/dashboard";
import {
  HISTORY_SORTS,
  type HistoryCategory,
  type HistoryFilter,
  type HistorySummary,
} from "@/lib/history/history-filter";
import { Segmented } from "@/components/ui/Segmented";

type HistoryToolbarProps = {
  filter: HistoryFilter;
  summary: HistorySummary;
  onChange: (changes: Partial<HistoryFilter>) => void;
};

const sortOptions = HISTORY_SORTS.map((value) => ({ value, label: historyCopy.sorts[value] }));

export function HistoryToolbar({ filter, summary, onChange }: HistoryToolbarProps) {
  const categoryOptions: { value: HistoryCategory; label: string }[] = [
    { value: "all", label: `${historyCopy.categories.all} ${summary.count}` },
    ...(Object.entries(summary.categories) as [ToolCategory, number][]).map(([value, count]) => ({
      value,
      label: `${historyCopy.categories[value]} ${count}`,
    })),
  ];

  return (
    <div className="flex flex-col gap-3 rounded-[22px] bg-surface p-3 shadow-card sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">{historyCopy.searchLabel}</span>
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-tertiary" aria-hidden />
          <input
            type="search"
            value={filter.query}
            onChange={(event) => onChange({ query: event.target.value })}
            placeholder={historyCopy.searchPlaceholder}
            className="h-11 w-full rounded-xl border border-border bg-background pr-3 pl-10 text-sm outline-ring placeholder:text-tertiary focus-visible:outline-2"
          />
        </label>
        <Segmented
          label={historyCopy.sortLabel}
          value={filter.sort}
          options={sortOptions}
          onChange={(sort) => onChange({ sort })}
          size="sm"
          className="self-start sm:self-auto"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Segmented
          layout="chips"
          label={historyCopy.categoryLabel}
          value={filter.category}
          options={categoryOptions}
          onChange={(category) => onChange({ category, tool: null })}
          className="justify-start"
        />
        {filter.tool && (
          <button
            type="button"
            onClick={() => onChange({ tool: null })}
            aria-label={historyCopy.removeToolFilter}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3 text-[13px] font-semibold text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring"
          >
            {historyCopy.toolFilter(getWorkspaceTool(filter.tool).shortName)}
            <X className="size-3.5" aria-hidden />
          </button>
        )}
      </div>
    </div>
  );
}
