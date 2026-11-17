import { fileFormats } from "@/config/file-formats";

export const shareTarget = {
  action: "/share-target",
  field: "files",
  cacheName: "pexlora-share",
  sharedParam: "shared",
  tool: "remove-metadata",
} as const;

export const shareTargetAccept = [...new Set(fileFormats.flatMap((format) => format.mimeTypes))];
