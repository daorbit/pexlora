"use client";

import { useCallback, useState } from "react";
import { X } from "lucide-react";
import { ZIP_MAX_TOTAL_MB } from "@/config/limits";
import { zipCopy } from "@/content/utility-tools";
import { useFileInput } from "@/hooks/useFileInput";
import { toast } from "@/lib/toast/store";
import { createZip, downloadBlob } from "@/lib/utils/download";
import { cn } from "@/lib/utils/cn";
import { formatBytes } from "@/lib/utils/format-bytes";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Dropzone } from "@/components/workspace/Dropzone";
import { optionFieldInput, optionFieldShell } from "@/components/workspace/options/styles";
import { ZipFileList, ZipFileRow } from "@/components/utility/zip/ZipFileRow";

const BYTES_PER_MB = 1024 * 1024;
const UNSAFE_NAME = /[\\/:*?"<>|]+/g;

const dropOverride = { ...zipCopy.create, samples: false, batch: false };

export function ZipCreator() {
  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState("");
  const [working, setWorking] = useState(false);
  const add = useCallback((incoming: File[]) => setFiles((current) => [...current, ...incoming]), []);
  const { open, inputProps, isDragging, dropProps } = useFileInput(add, "", !working);

  const total = files.reduce((sum, file) => sum + file.size, 0);
  const tooLarge = total > ZIP_MAX_TOTAL_MB * BYTES_PER_MB;

  const create = async () => {
    setWorking(true);
    try {
      const zip = await createZip(files.map((file) => ({ blob: file, name: file.name })));
      const fileName = name.replace(UNSAFE_NAME, "").trim() || zipCopy.create.namePlaceholder;
      downloadBlob(zip, `${fileName}.zip`);
      toast.success(zipCopy.create.done(files.length));
    } finally {
      setWorking(false);
    }
  };

  return (
    <div {...dropProps} className="flex flex-col gap-3">
      <input {...inputProps} />
      <Dropzone accepts={[]} localCapable isDragging={isDragging} onBrowse={open} onFiles={add} onSample={() => {}} short={files.length > 0} override={dropOverride} />
      {files.length > 0 && (
        <>
          <ZipFileList
            header={
              <>
                <span className="text-sm font-semibold tabular-nums">{zipCopy.files(files.length, formatBytes(total))}</span>
                <Button variant="plain" onClick={() => setFiles([])} disabled={working}>
                  {zipCopy.clear}
                </Button>
              </>
            }
          >
            {files.map((file, index) => (
              <ZipFileRow
                key={`${file.name}-${index}`}
                name={file.name}
                size={file.size}
                action={
                  <Button
                    variant="icon"
                    size="sm"
                    aria-label={zipCopy.remove(file.name)}
                    disabled={working}
                    onClick={() => setFiles((current) => current.filter((_, position) => position !== index))}
                  >
                    <X className="size-4" aria-hidden />
                  </Button>
                }
              />
            ))}
          </ZipFileList>
          {tooLarge && <Alert message={zipCopy.tooLarge} />}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className={cn(optionFieldShell, "flex flex-1 items-center gap-1 px-3")}>
              <span className="sr-only">{zipCopy.create.nameLabel}</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={zipCopy.create.namePlaceholder}
                className={cn(optionFieldInput, "min-w-0 flex-1")}
              />
              <span className="text-sm text-tertiary">.zip</span>
            </label>
            <Button size="lg" onClick={create} disabled={working || tooLarge} className="max-sm:w-full">
              {working ? zipCopy.create.working : zipCopy.create.action}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
