import type { WorkspaceToolSlug } from "@/config/tools";

let pending: { tool: WorkspaceToolSlug; files: File[] } | null = null;

export function handOffFiles(tool: WorkspaceToolSlug, files: File[]) {
  pending = { tool, files };
}

export function takeHandedOffFiles(tool: WorkspaceToolSlug) {
  if (pending?.tool !== tool) return [];
  const { files } = pending;
  pending = null;
  return files;
}
