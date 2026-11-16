"use client";

import { useCallback, useEffect, useState } from "react";
import type { WorkspaceToolSlug } from "@/config/tools";
import { DEFAULT_TOOL_OPTIONS, type ToolOptions } from "@/lib/image/options";
import { readSearchParams, replaceSearchParams } from "@/lib/url/search-params";
import { optionsFromParams, optionsToParams } from "@/lib/url/tool-params";

export function useToolOptions(tool: WorkspaceToolSlug, initialOptions?: Partial<ToolOptions>) {
  const [base] = useState<ToolOptions>(() => ({ ...DEFAULT_TOOL_OPTIONS, ...initialOptions }));
  const [options, setOptionsState] = useState<ToolOptions>(base);

  useEffect(() => {
    setOptionsState(optionsFromParams(tool, readSearchParams(), base));
  }, [tool, base]);

  const setOptions = useCallback(
    (next: ToolOptions) => {
      setOptionsState(next);
      replaceSearchParams(optionsToParams(tool, next, base));
    },
    [tool, base],
  );

  return [options, setOptions] as const;
}
