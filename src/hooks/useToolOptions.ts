"use client";

import { useCallback, useMemo, useState } from "react";
import type { WorkspaceToolSlug } from "@/config/tools";
import { useLocationSearch } from "@/hooks/useLocationSearch";
import { DEFAULT_TOOL_OPTIONS, type ToolOptions } from "@/lib/image/options";
import { replaceSearchParams } from "@/lib/url/search-params";
import { optionsFromParams, optionsToParams } from "@/lib/url/tool-params";

export function useToolOptions(tool: WorkspaceToolSlug, initialOptions?: Partial<ToolOptions>) {
  const [base] = useState<ToolOptions>(() => ({ ...DEFAULT_TOOL_OPTIONS, ...initialOptions }));
  const [local, setLocal] = useState<ToolOptions>(base);
  const params = useLocationSearch();

  const options = useMemo(() => optionsFromParams(tool, params, local), [tool, params, local]);

  const setOptions = useCallback(
    (next: ToolOptions) => {
      setLocal(next);
      replaceSearchParams(optionsToParams(tool, next));
    },
    [tool],
  );

  const patchOptions = useCallback((patch: Partial<ToolOptions>) => {
    setLocal((current) => ({ ...current, ...patch }));
  }, []);

  return [options, setOptions, patchOptions] as const;
}
