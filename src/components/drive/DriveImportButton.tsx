"use client";

import { LoaderCircle } from "lucide-react";
import { driveCopy } from "@/content/google-drive";
import { useDriveImport } from "@/hooks/useDriveImport";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { GoogleDriveIcon } from "@/components/icons/GoogleDriveIcon";

type DriveImportButtonProps = {
  onFiles: (files: File[]) => void;
  accept: string;
  multiple?: boolean;
  variant?: "chip" | "icon";
  disabled?: boolean;
  className?: string;
};

export function DriveImportButton({ onFiles, accept, multiple = true, variant = "chip", disabled = false, className }: DriveImportButtonProps) {
  const drive = useDriveImport(onFiles, accept, multiple);
  if (!drive.enabled) return null;

  const icon = drive.busy ? (
    <LoaderCircle className="size-4 animate-spin" aria-hidden />
  ) : (
    <GoogleDriveIcon className="size-4 shrink-0" />
  );
  const shared = {
    onClick: drive.open,
    onPointerEnter: drive.prepare,
    onFocus: drive.prepare,
    disabled: disabled || drive.busy,
  };

  if (variant === "icon") {
    return (
      <Button
        variant="secondary"
        size="sm"
        aria-label={driveCopy.import}
        title={driveCopy.import}
        className={cn("w-8 border-transparent bg-fill px-0 hover:bg-fill-strong", className)}
        {...shared}
      >
        {icon}
      </Button>
    );
  }

  return (
    <Button variant="secondary" size="sm" className={cn("bg-surface", className)} {...shared}>
      {icon}
      {driveCopy.import}
    </Button>
  );
}
