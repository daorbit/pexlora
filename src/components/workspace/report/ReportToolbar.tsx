"use client";

import { Download } from "lucide-react";
import { reportCopy } from "@/content/workspace";
import { REPORT_FILTERS, type ReportFilter } from "@/lib/metadata/report-filter";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";
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
        <SearchInput value={search} onChange={onSearch} label={reportCopy.search} className="flex-1" />
        <Button variant="secondary" size="md" onClick={onExport} className="shrink-0 gap-1.5 px-3 text-[13px]">
          <Download className="size-4" aria-hidden />
          <span className="max-sm:sr-only">{reportCopy.exportJson}</span>
        </Button>
      </div>
      <Segmented label={reportCopy.filterLabel} value={filter} options={options} onChange={onFilter} size="sm" />
    </div>
  );
}
