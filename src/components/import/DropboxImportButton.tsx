"use client";

import { dropboxCopy } from "@/content/import-sources";
import { useDropboxImport } from "@/hooks/useDropboxImport";
import { DropboxIcon } from "@/components/icons/DropboxIcon";
import { ImportSourceButton, type ImportSourceSize } from "@/components/import/ImportSourceButton";

type DropboxImportButtonProps = {
  onFiles: (files: File[]) => void;
  accept: string;
  multiple?: boolean;
  disabled?: boolean;
  size?: ImportSourceSize;
};

export function DropboxImportButton({ onFiles, accept, multiple = true, disabled, size }: DropboxImportButtonProps) {
  const dropbox = useDropboxImport(onFiles, accept, multiple);
  if (!dropbox.enabled) return null;

  return (
    <ImportSourceButton
      label={dropboxCopy.import}
      icon={<DropboxIcon className="size-4.5" />}
      onClick={dropbox.open}
      onPrepare={dropbox.prepare}
      busy={dropbox.busy}
      disabled={disabled}
      size={size}
    />
  );
}
