"use client";

import { useEffect } from "react";
import type { WorkspaceToolSlug } from "@/config/tools";
import { takeHandedOffFiles } from "@/lib/utils/file-handoff";

export function useHandedOffFiles(tool: WorkspaceToolSlug, addFiles: (files: File[]) => void) {
  useEffect(() => {
    const files = takeHandedOffFiles(tool);
    if (files.length) addFiles(files);
  }, [tool, addFiles]);
}
