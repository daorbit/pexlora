"use client";

import { useMemo } from "react";
import { historyCopy } from "@/content/dashboard";
import { useHistoryFilter } from "@/hooks/useHistoryFilter";
import { useRecentResults } from "@/hooks/useRecentResults";
import { filterHistory, summarizeHistory } from "@/lib/history/history-filter";
import { toast } from "@/lib/toast/store";
import { Skeleton } from "@/components/ui/Skeleton";
import { DownloadGateProvider } from "@/components/workspace/DownloadGate";
import { HistoryEmpty } from "@/components/dashboard/history/HistoryEmpty";
import { HistoryList } from "@/components/dashboard/history/HistoryList";
import { HistorySummaryPanel } from "@/components/dashboard/history/HistorySummaryPanel";
import { HistoryToolbar } from "@/components/dashboard/history/HistoryToolbar";

const layout = "grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_320px]";

export function HistoryView() {
  const { results, clear } = useRecentResults();
  const { filter, patch, reset } = useHistoryFilter();
  const summary = useMemo(() => summarizeHistory(results ?? []), [results]);
  const visible = useMemo(() => filterHistory(results ?? [], filter), [results, filter]);

  if (!results) {
    return (
      <div className={layout}>
        <div className="flex flex-col gap-3">
          <Skeleton className="h-28 rounded-[22px]" />
          <Skeleton className="h-72 rounded-[22px]" />
        </div>
        <Skeleton className="h-96 rounded-[22px]" />
      </div>
    );
  }

  if (!results.length) return <HistoryEmpty />;

  const clearHistory = async () => {
    await clear();
    reset();
    toast.info(historyCopy.cleared);
  };

  return (
    <DownloadGateProvider>
      <div className={layout}>
        <div className="flex min-w-0 flex-col gap-3">
          <HistoryToolbar filter={filter} summary={summary} onChange={patch} />
          <HistoryList results={visible} total={results.length} onReset={reset} />
        </div>
        <HistorySummaryPanel
          summary={summary}
          visible={visible}
          activeTool={filter.tool}
          onToolSelect={(tool) => patch({ tool, category: "all" })}
          onClear={clearHistory}
        />
      </div>
    </DownloadGateProvider>
  );
}
