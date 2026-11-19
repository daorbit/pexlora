"use client";

import { useState } from "react";
import { Link2 } from "lucide-react";
import { urlImportCopy } from "@/content/import-sources";
import { ImportSourceButton, type ImportSourceSize } from "@/components/import/ImportSourceButton";
import { UrlImportDialog } from "@/components/import/UrlImportDialog";

type UrlImportButtonProps = {
  onFiles: (files: File[]) => void;
  disabled?: boolean;
  size?: ImportSourceSize;
};

export function UrlImportButton({ onFiles, disabled, size }: UrlImportButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ImportSourceButton
        label={urlImportCopy.open}
        icon={<Link2 className="size-4.5" aria-hidden />}
        onClick={() => setOpen(true)}
        disabled={disabled}
        size={size}
      />
      {open && <UrlImportDialog onFiles={onFiles} onClose={() => setOpen(false)} />}
    </>
  );
}
