"use client";

import { createPortal } from "react-dom";
import type { WorkspaceToolSlug } from "@/config/tools";
import { useDownloadedSinceMount } from "@/hooks/useDownloadedSinceMount";
import { RateTool } from "@/components/reviews/RateTool";

export function RatePrompt({ tool }: { tool: WorkspaceToolSlug }) {
  const downloaded = useDownloadedSinceMount();
  if (!downloaded) return null;

  return createPortal(
    <div className="fixed inset-x-3 bottom-[calc(var(--bottom-bar,0px)+max(0.75rem,env(safe-area-inset-bottom)))] z-40 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[22rem]">
      <RateTool tool={tool} className="bg-surface p-4 text-foreground shadow-card ring-1 ring-fill-strong" />
    </div>,
    document.body,
  );
}
