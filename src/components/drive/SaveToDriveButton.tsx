"use client";

import { LoaderCircle } from "lucide-react";
import { driveCopy } from "@/content/google-drive";
import { useSaveToDrive } from "@/hooks/useSaveToDrive";
import type { SavableFile } from "@/lib/utils/save-file";
import { Button, type ButtonStyleProps } from "@/components/ui/Button";
import { GoogleDriveIcon } from "@/components/icons/GoogleDriveIcon";
import { useDownloadGate } from "@/components/workspace/DownloadGate";

type SaveToDriveButtonProps = {
  files: SavableFile[];
  size?: ButtonStyleProps["size"];
  className?: string;
};

export function SaveToDriveButton({ files, size = "sm", className }: SaveToDriveButtonProps) {
  const drive = useSaveToDrive();
  const guardDownload = useDownloadGate();
  if (!drive.enabled || !files.length) return null;

  return (
    <Button
      variant="secondary"
      size={size}
      onClick={() => guardDownload(() => drive.save(files), files.length)}
      onPointerEnter={drive.prepare}
      onFocus={drive.prepare}
      disabled={drive.saving}
      className={className}
    >
      {drive.saving ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : <GoogleDriveIcon className="size-4 shrink-0" />}
      {drive.saving ? driveCopy.saving : driveCopy.saveAll(files.length)}
    </Button>
  );
}
