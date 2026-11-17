"use client";

import { useId, useState } from "react";
import { Ellipsis } from "lucide-react";
import { getWorkspaceTool } from "@/config/tools";
import { historyCopy } from "@/content/dashboard";
import { SESSION_MAX_AGE_MS } from "@/lib/storage/session-store";
import type { RecentResult } from "@/lib/storage/workspace-sessions";
import { cn } from "@/lib/utils/cn";
import { formatBytes } from "@/lib/utils/format-bytes";
import { formatTimeAgo } from "@/lib/utils/format-date";
import { SaveFileButton } from "@/components/workspace/SaveFileButton";
import { HistoryRowActions } from "@/components/dashboard/history/HistoryRowActions";
import { HistoryThumb } from "@/components/dashboard/history/HistoryThumb";

type HistoryRowProps = { result: RecentResult; onRemove: (result: RecentResult) => void };

export function HistoryRow({ result, onRemove }: HistoryRowProps) {
  const [open, setOpen] = useState(false);
  const actionsId = useId();
  const tool = getWorkspaceTool(result.tool);

  return (
    <li className={cn("transition-colors", open && "bg-subtle")}>
      <div className="flex items-center gap-3 p-3 sm:gap-4 sm:px-4">
        <HistoryThumb result={result} />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p translate="no" className="notranslate truncate text-[14px] font-medium">
            {result.name}
          </p>
          <p className="truncate text-[12.5px] text-secondary">
            {tool.shortName} · {formatBytes(result.blob.size)} · {historyCopy.savedAt(formatTimeAgo(result.savedAt))}
          </p>
          <p className="hidden text-[12px] text-tertiary sm:block">
            {historyCopy.expires(formatTimeAgo(result.savedAt + SESSION_MAX_AGE_MS))}
          </p>
        </div>
        <SaveFileButton file={result} />
        <button
          type="button"
          aria-label={historyCopy.moreActions(result.name)}
          aria-expanded={open}
          aria-controls={actionsId}
          onClick={() => setOpen((value) => !value)}
          className={cn(
            "inline-flex size-8 shrink-0 items-center justify-center rounded-xl text-secondary transition-colors hover:bg-fill hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring",
            open && "bg-fill text-foreground",
          )}
        >
          <Ellipsis className="size-4" aria-hidden />
        </button>
      </div>
      {open && <HistoryRowActions id={actionsId} result={result} onRemove={() => onRemove(result)} />}
    </li>
  );
}
