"use client";

import { useSyncExternalStore } from "react";
import { canSaveToPhotos } from "@/lib/utils/save-file";

const subscribe = () => () => undefined;

export function useCanSaveToPhotos() {
  return useSyncExternalStore(subscribe, canSaveToPhotos, () => false);
}
