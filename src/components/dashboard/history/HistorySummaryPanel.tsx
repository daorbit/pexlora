"use client";

import { Download, ShieldCheck, Trash2 } from "lucide-react";
import { getWorkspaceTool, toolIconSrc, type WorkspaceToolSlug } from "@/config/tools";
import { historyCopy } from "@/content/dashboard";
import { saveCopy } from "@/content/workspace";
import { useCanSaveToPhotos } from "@/hooks/useCanSaveToPhotos";
import type { HistorySummary } from "@/lib/history/history-filter";
import type { RecentResult } from "@/lib/storage/workspace-sessions";
import { cn } from "@/lib/utils/cn";
import { formatBytes } from "@/lib/utils/format-bytes";
import { isGalleryMedia, saveFiles } from "@/lib/utils/save-file";
import { Button } from "@/components/ui/Button";
import { HubItemIcon } from "@/components/tools/HubItemIcon";
import { SaveToDriveButton } from "@/components/drive/SaveToDriveButton";
import { useDownloadGate } from "@/components/workspace/DownloadGate";
import { HistoryStat } from "@/components/dashboard/history/HistoryStat";

type HistorySummaryPanelProps = {
  summary: HistorySummary;
  visible: RecentResult[];
  activeTool: WorkspaceToolSlug | null;
  onToolSelect: (tool: WorkspaceToolSlug | null) => void;
  onClear: () => void;
};

export function HistorySummaryPanel({ summary, visible, activeTool, onToolSelect, onClear }: HistorySummaryPanelProps) {
  const guardDownload = useDownloadGate();
  const toPhotos = useCanSaveToPhotos() && visible.every((result) => isGalleryMedia(result.blob.type));
  const saveAll = () => guardDownload(() => saveFiles(visible, historyCopy.zipName), visible.length);

  return (
    <aside className="flex flex-col gap-5 rounded-[22px] bg-surface p-4 shadow-card sm:p-5 lg:sticky lg:top-(--panel-top,5rem)">
      <h2 className="text-[15px] font-semibold">{historyCopy.summaryTitle}</h2>
      <dl className="grid grid-cols-3 gap-2">
        <HistoryStat label={historyCopy.stats.files} value={String(summary.count)} />
        <HistoryStat label={historyCopy.stats.size} value={formatBytes(summary.bytes)} />
        <HistoryStat label={historyCopy.stats.tools} value={String(summary.tools.length)} />
      </dl>

      <div className="flex flex-col gap-1.5">
        <h3 className="px-1 text-[11.5px] font-semibold tracking-[0.06em] text-tertiary uppercase">{historyCopy.byTool}</h3>
        <ul className="flex flex-col gap-0.5">
          {summary.tools.map(({ tool, count }) => {
            const active = tool === activeTool;
            return (
              <li key={tool}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => onToolSelect(active ? null : tool)}
                  className={cn(
                    "flex h-11 w-full items-center gap-3 rounded-xl px-2 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-ring",
                    active ? "bg-fill font-semibold" : "font-medium hover:bg-fill",
                  )}
                >
                  <HubItemIcon src={toolIconSrc(tool)} size="xs" />
                  <span className="min-w-0 flex-1 truncate">{getWorkspaceTool(tool).shortName}</span>
                  <span className="text-[13px] text-secondary tabular-nums">{count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <Button variant="ink" size="lg" onClick={saveAll} disabled={!visible.length} className="w-full">
          <Download className="size-4" aria-hidden />
          {saveCopy.label(visible.length, toPhotos)}
        </Button>
        <SaveToDriveButton files={visible} variant="full" size="lg" className="w-full" />
        <Button
          variant="secondary"
          size="lg"
          onClick={onClear}
          className="w-full text-danger hover:bg-danger-soft"
        >
          <Trash2 className="size-4" aria-hidden />
          {historyCopy.clear}
        </Button>
      </div>

      <p className="flex items-start gap-2 text-[12.5px] leading-snug text-secondary">
        <ShieldCheck className="mt-px size-4 shrink-0 text-success" aria-hidden />
        {historyCopy.privacy}
      </p>
    </aside>
  );
}
