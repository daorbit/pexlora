import { ALL_KINDS, formatsOfKinds } from "@/config/file-formats";

export const shareTarget = {
  action: "/share-target",
  field: "files",
  cacheName: "pexlora-share",
  sharedParam: "shared",
  tool: "remove-metadata",
} as const;

export const shareTargetAccept = [...new Set(formatsOfKinds(ALL_KINDS).flatMap((format) => format.mimeTypes))];
