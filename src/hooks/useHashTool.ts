"use client";

import { useCallback, useSyncExternalStore } from "react";
import { workspaceTools, type WorkspaceToolSlug } from "@/config/tools";

function subscribe(listener: () => void) {
  window.addEventListener("hashchange", listener);
  return () => window.removeEventListener("hashchange", listener);
}

const readHash = () => window.location.hash.slice(1);

function toTool(hash: string): WorkspaceToolSlug | null {
  return workspaceTools.some((tool) => tool.slug === hash) ? (hash as WorkspaceToolSlug) : null;
}

export function useHashTool(fallback: WorkspaceToolSlug) {
  const hash = useSyncExternalStore(subscribe, readHash, () => "");
  const fromHash = toTool(hash);

  const select = useCallback((slug: WorkspaceToolSlug) => {
    window.history.replaceState(null, "", `#${slug}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }, []);

  return { tool: fromHash ?? fallback, fromHash: Boolean(fromHash), select };
}
