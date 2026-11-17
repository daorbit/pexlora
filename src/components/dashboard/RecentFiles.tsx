"use client";

import { History } from "lucide-react";
import { getWorkspaceTool, toolIconSrc } from "@/config/tools";
import { historyCopy } from "@/content/dashboard";
import { useRecentResults } from "@/hooks/useRecentResults";
import { toast } from "@/lib/toast/store";
import { formatBytes } from "@/lib/utils/format-bytes";
import { formatTimeAgo } from "@/lib/utils/format-date";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { HubItemIcon } from "@/components/tools/HubItemIcon";
import { DownloadGateProvider } from "@/components/workspace/DownloadGate";
import { SaveFileButton } from "@/components/workspace/SaveFileButton";

export function RecentFiles() {
  const { results, clear } = useRecentResults();

  if (!results) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton key={index} className="h-18 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[22px] bg-surface px-6 py-12 text-center shadow-card">
        <History className="size-8 stroke-[1.5] text-tertiary" aria-hidden />
        <p className="max-w-xs text-sm text-secondary">{historyCopy.empty}</p>
      </div>
    );
  }

  const clearHistory = async () => {
    await clear();
    toast.info(historyCopy.cleared);
  };

  return (
    <DownloadGateProvider>
      <div className="flex flex-col gap-3">
        <ul className="flex flex-col gap-2">
          {results.map((result) => (
            <li key={result.id} className="flex items-center gap-3 rounded-2xl bg-surface p-3 shadow-card">
              <HubItemIcon src={toolIconSrc(result.tool)} size="sm" />
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <p className="truncate text-[14px] font-medium">{result.name}</p>
                <p className="truncate text-[12.5px] text-secondary">
                  {getWorkspaceTool(result.tool).shortName} · {formatBytes(result.blob.size)} ·{" "}
                  {historyCopy.savedAt(formatTimeAgo(result.savedAt))}
                </p>
              </div>
              <SaveFileButton file={result} />
            </li>
          ))}
        </ul>
        <Button variant="nav" onClick={clearHistory} className="self-center px-2 text-[13px]">
          {historyCopy.clear}
        </Button>
      </div>
    </DownloadGateProvider>
  );
}
