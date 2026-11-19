"use client";

import { Download, Share } from "lucide-react";
import { saveCopy } from "@/content/workspace";
import { useCanSaveToPhotos } from "@/hooks/useCanSaveToPhotos";
import { isGalleryMedia, saveFiles } from "@/lib/utils/save-file";
import { Button } from "@/components/ui/Button";
import { SaveToDriveButton } from "@/components/drive/SaveToDriveButton";
import { useDownloadGate } from "@/components/workspace/DownloadGate";

export function SaveFileButton({ file }: { file: { blob: Blob; name: string } }) {
  const toPhotos = useCanSaveToPhotos() && isGalleryMedia(file.blob.type);
  const guardDownload = useDownloadGate();
  const Icon = toPhotos ? Share : Download;

  return (
    <span className="flex shrink-0 items-center gap-1">
      <SaveToDriveButton files={[file]} />
      <Button size="sm" onClick={() => guardDownload(() => saveFiles([file], file.name))}>
        <Icon className="size-3.5" aria-hidden />
        {toPhotos ? saveCopy.photos : saveCopy.download}
      </Button>
    </span>
  );
}
