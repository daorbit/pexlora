"use client";

import { useCallback, useEffect } from "react";
import { analyticsEvents } from "@/config/analytics";
import { track } from "@/lib/analytics/track";

type AddFiles = (files: File[], options?: { replace?: boolean }) => void;

export function useToolTracking(tool: string, addFiles: AddFiles) {
  useEffect(() => {
    track(analyticsEvents.toolOpen, { tool });
  }, [tool]);

  return useCallback<AddFiles>(
    (files, options) => {
      if (files.length) track(analyticsEvents.filesAdded, { tool, count: files.length });
      addFiles(files, options);
    },
    [addFiles, tool],
  );
}
