"use client";

import { useMemo, useState } from "react";
import { reportCopy } from "@/content/workspace";
import { downloadReportJson } from "@/lib/metadata/report-export";
import { filterCounts, filterReport, type ReportFilter } from "@/lib/metadata/report-filter";
import type { MetadataReport as Report } from "@/lib/metadata/types";
import { ReportGroups } from "@/components/workspace/report/ReportGroups";
import { ReportToolbar } from "@/components/workspace/report/ReportToolbar";

const notice = "rounded-xl bg-background px-4 py-3 text-[13px] text-secondary";

type MetadataReportProps = { report: Report; fileName: string; aiNote?: boolean };

export function MetadataReport({ report, fileName, aiNote = false }: MetadataReportProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ReportFilter>("all");
  const counts = useMemo(() => filterCounts(report), [report]);
  const groups = useMemo(() => filterReport(report, filter, search), [report, filter, search]);

  if (!report.groups.length) return <p className={notice}>{reportCopy.empty}</p>;

  return (
    <div className="flex flex-col gap-3">
      <ReportToolbar
        search={search}
        onSearch={setSearch}
        filter={filter}
        onFilter={setFilter}
        counts={counts}
        onExport={() => downloadReportJson(report, fileName)}
      />
      {aiNote && report.aiTags === 0 && <p className={notice}>{reportCopy.aiNote}</p>}
      {groups.length ? <ReportGroups groups={groups} /> : <p className={notice}>{reportCopy.noMatches}</p>}
    </div>
  );
}
