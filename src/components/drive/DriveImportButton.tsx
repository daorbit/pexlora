"use client";

import { driveCopy } from "@/content/google-drive";
import { useDriveImport } from "@/hooks/useDriveImport";
import { GoogleDriveIcon } from "@/components/icons/GoogleDriveIcon";
import { ImportSourceButton, type ImportSourceSize } from "@/components/import/ImportSourceButton";

type DriveImportButtonProps = {
  onFiles: (files: File[]) => void;
  accept: string;
  multiple?: boolean;
  disabled?: boolean;
  size?: ImportSourceSize;
};

export function DriveImportButton({ onFiles, accept, multiple = true, disabled, size }: DriveImportButtonProps) {
  const drive = useDriveImport(onFiles, accept, multiple);
  if (!drive.enabled) return null;

  return (
    <ImportSourceButton
      label={driveCopy.import}
      shortLabel={driveCopy.short}
      icon={<GoogleDriveIcon className="size-4.5" />}
      onClick={drive.open}
      onPrepare={drive.prepare}
      busy={drive.busy}
      disabled={disabled}
      size={size}
    />
  );
}
