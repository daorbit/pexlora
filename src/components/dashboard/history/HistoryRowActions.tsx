"use client";

import { Trash2 } from "lucide-react";
import { getWorkspaceTool, nextStepTools, toolIconSrc } from "@/config/tools";
import { historyCopy } from "@/content/dashboard";
import { useSendToTool } from "@/hooks/useSendToTool";
import type { RecentResult } from "@/lib/storage/workspace-sessions";
import { cn } from "@/lib/utils/cn";
import { isGalleryMedia } from "@/lib/utils/save-file";
import { HubItemIcon } from "@/components/tools/HubItemIcon";

type HistoryRowActionsProps = { id: string; result: RecentResult; onRemove: () => void };

const chip =
  "inline-flex h-9 items-center gap-2 rounded-xl px-2.5 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-ring";

export function HistoryRowActions({ id, result, onRemove }: HistoryRowActionsProps) {
  const sendToTool = useSendToTool();
  const sendable = isGalleryMedia(result.blob.type) && result.blob.type.startsWith("image/");
  const tools = sendable ? nextStepTools.filter((slug) => slug !== result.tool) : [];

  return (
    <div id={id} className="flex flex-col gap-2 px-3 pb-3 motion-safe:animate-fade-in sm:px-4 sm:pl-[5.5rem]">
      {tools.length > 0 && (
        <>
          <p className="text-[12px] font-semibold text-tertiary">{historyCopy.useIn}</p>
          <div className="flex flex-wrap gap-1.5">
            {tools.map((slug) => (
              <button key={slug} type="button" onClick={() => sendToTool(slug, [result])} className={cn(chip, "bg-fill hover:bg-fill-strong")}>
                <HubItemIcon src={toolIconSrc(slug)} size="xs" className="size-5" />
                {getWorkspaceTool(slug).shortName}
              </button>
            ))}
          </div>
        </>
      )}
      <button type="button" onClick={onRemove} className={cn(chip, "self-start text-danger hover:bg-danger-soft")}>
        <Trash2 className="size-4" aria-hidden />
        {historyCopy.remove}
      </button>
    </div>
  );
}
