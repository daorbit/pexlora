"use client";

import { cn } from "@/lib/utils/cn";
import { DriveImportButton } from "@/components/drive/DriveImportButton";
import { DropboxImportButton } from "@/components/import/DropboxImportButton";
import type { ImportSourceSize } from "@/components/import/ImportSourceButton";
import { UrlImportButton } from "@/components/import/UrlImportButton";

type ImportSourcesProps = {
  onFiles: (files: File[]) => void;
  accept: string;
  multiple?: boolean;
  disabled?: boolean;
  size?: ImportSourceSize;
  className?: string;
};

export function ImportSources({ onFiles, accept, multiple = true, disabled, size = "md", className }: ImportSourcesProps) {
  const shared = { onFiles, disabled, size };

  return (
    <div className={cn("flex items-center", size === "md" ? "gap-2" : "gap-1", className)}>
      <DriveImportButton {...shared} accept={accept} multiple={multiple} />
      <DropboxImportButton {...shared} accept={accept} multiple={multiple} />
      <UrlImportButton {...shared} />
    </div>
  );
}
