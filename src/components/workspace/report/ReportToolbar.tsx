"use client";

import { Download, Search } from "lucide-react";
import { reportCopy } from "@/content/workspace";
import { REPORT_FILTERS, type ReportFilter } from "@/lib/metadata/report-filter";
import { Button } from "@/components/ui/Button";
import { Segmented } from "@/components/ui/Segmented";

type ReportToolbarProps = {
  search: string;
  onSearch: (value: string) => void;
  filter: ReportFilter;
  onFilter: (value: ReportFilter) => void;
  counts: Record<ReportFilter, number>;
  onExport: () => void;
};

export function ReportToolbar({ search, onSearch, filter, onFilter, counts, onExport }: ReportToolbarProps) {
  const options = REPORT_FILTERS.map((value) => ({ value, label: reportCopy.filters[value](counts[value]) }));

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2">
        <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-xl border border-separator bg-surface px-3 focus-within:outline-2 focus-within:outline-ring">
          <Search className="size-4 shrink-0 text-tertiary" aria-hidden />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder={reportCopy.search}
            aria-label={reportCopy.search}
            className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-tertiary"
          />
        </label>
        <Button variant="secondary" size="md" onClick={onExport} className="shrink-0 gap-1.5 px-3 text-[13px]">
          <Download className="size-4" aria-hidden />
          <span className="max-sm:sr-only">{reportCopy.exportJson}</span>
        </Button>
      </div>
      <Segmented label={reportCopy.filterLabel} value={filter} options={options} onChange={onFilter} size="sm" />
    </div>
  );
}
