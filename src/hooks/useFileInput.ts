"use client";

import { useFileDrop } from "@/hooks/useFileDrop";
import { useFilePicker } from "@/hooks/useFilePicker";

export function useFileInput(onFiles: (files: File[]) => void, accept = "", enabled = true) {
  const picker = useFilePicker(onFiles, accept);
  const drop = useFileDrop(onFiles, enabled);
  return { ...picker, ...drop };
}
