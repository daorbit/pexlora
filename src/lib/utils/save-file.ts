import { downloadBlob, downloadZip } from "@/lib/utils/download";

type SavableFile = { blob: Blob; name: string };

export function isAppleMobile() {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

export function isGalleryMedia(type: string) {
  return type.startsWith("image/") || type.startsWith("video/");
}

export function canSaveToPhotos() {
  return isAppleMobile() && typeof navigator.canShare === "function";
}

function photoShareFiles(files: SavableFile[]) {
  if (!canSaveToPhotos() || !files.every((file) => isGalleryMedia(file.blob.type))) return null;
  const shareable = files.map((file) => new File([file.blob], file.name, { type: file.blob.type }));
  return navigator.canShare({ files: shareable }) ? shareable : null;
}

export async function saveFiles(files: SavableFile[], zipName: string) {
  const shareable = photoShareFiles(files);
  if (shareable) {
    try {
      await navigator.share({ files: shareable });
      return;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
    }
  }
  if (files.length === 1) downloadBlob(files[0].blob, files[0].name);
  else await downloadZip(files, zipName);
}
