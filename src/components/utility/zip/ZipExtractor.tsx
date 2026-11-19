"use client";

import { useCallback, useState } from "react";
import { Download } from "lucide-react";
import { ZIP_MAX_TOTAL_MB } from "@/config/limits";
import { zipCopy } from "@/content/utility-tools";
import { useFileInput } from "@/hooks/useFileInput";
import type { ZipEntry } from "@/lib/files/zip/read-zip";
import { downloadEach } from "@/lib/utils/download";
import { formatBytes } from "@/lib/utils/format-bytes";
import { baseName } from "@/lib/utils/file-name";
import { canSaveToPhotos, isGalleryMedia, saveFiles } from "@/lib/utils/save-file";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Dropzone } from "@/components/workspace/Dropzone";
import { SaveToDriveButton } from "@/components/drive/SaveToDriveButton";
import { ZipFileList, ZipFileRow } from "@/components/utility/zip/ZipFileRow";

const BYTES_PER_MB = 1024 * 1024;
const ZIP_ACCEPT = ".zip,application/zip,application/x-zip-compressed";

const dropOverride = { ...zipCopy.extract, samples: false, batch: false };

type Opened = { name: string; entries: ZipEntry[] };

function fileNameOf(path: string) {
  return path.split("/").pop() || path;
}

function savable(entries: ZipEntry[]) {
  return entries.map((entry) => ({ blob: entry.blob, name: fileNameOf(entry.name) }));
}

export function ZipExtractor() {
  const [opened, setOpened] = useState<Opened | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [working, setWorking] = useState(false);

  const openZip = useCallback(async ([file]: File[]) => {
    setError(null);
    if (!/\.zip$/i.test(file.name)) return setError(zipCopy.extract.notZip);
    if (file.size > ZIP_MAX_TOTAL_MB * BYTES_PER_MB) return setError(zipCopy.tooLarge);

    setWorking(true);
    try {
      const { readZip } = await import("@/lib/files/zip/read-zip");
      const entries = await readZip(file);
      if (!entries.length) setError(zipCopy.extract.empty);
      setOpened({ name: baseName(file.name), entries });
    } catch {
      setOpened(null);
      setError(zipCopy.extract.unreadable);
    } finally {
      setWorking(false);
    }
  }, []);

  const { open, inputProps, isDragging, dropProps } = useFileInput(openZip, ZIP_ACCEPT, !working);
  const entries = opened?.entries ?? [];
  const total = entries.reduce((sum, entry) => sum + entry.blob.size, 0);

  const saveAll = () => {
    const files = savable(entries);
    if (canSaveToPhotos() && files.every((file) => isGalleryMedia(file.blob.type))) return saveFiles(files, `${opened?.name}.zip`);
    return downloadEach(files);
  };

  return (
    <div {...dropProps} className="flex flex-col gap-3">
      <input {...inputProps} multiple={false} />
      <Dropzone accepts={[]} localCapable isDragging={isDragging} onBrowse={open} onFiles={openZip} accept={ZIP_ACCEPT} multiple={false} onSample={() => {}} short={entries.length > 0} override={dropOverride} />
      {working && <p className="text-center text-sm text-secondary">{zipCopy.extract.working}</p>}
      {error && <Alert message={error} />}
      {entries.length > 0 && (
        <ZipFileList
          header={
            <>
              <span className="text-sm font-semibold tabular-nums">{zipCopy.files(entries.length, formatBytes(total))}</span>
              <span className="flex items-center gap-1">
                <SaveToDriveButton files={savable(entries)} size="sm" />
                <Button size="sm" onClick={saveAll}>
                  <Download className="size-3.5" aria-hidden />
                  {zipCopy.extract.saveAll}
                </Button>
              </span>
            </>
          }
        >
          {entries.map((entry) => (
            <ZipFileRow
              key={entry.name}
              name={entry.name}
              size={entry.blob.size}
              action={
                <Button
                  variant="secondary"
                  size="sm"
                  aria-label={zipCopy.extract.save(fileNameOf(entry.name))}
                  onClick={() => saveFiles(savable([entry]), `${opened?.name}.zip`)}
                >
                  <Download className="size-3.5" aria-hidden />
                </Button>
              }
            />
          ))}
        </ZipFileList>
      )}
    </div>
  );
}
