"use client";

import { useState, useSyncExternalStore } from "react";
import { getDownloadCount, subscribeDownloads } from "@/lib/downloads/download-signal";

export function useDownloadedSinceMount() {
  const [start] = useState(getDownloadCount);
  const count = useSyncExternalStore(subscribeDownloads, getDownloadCount, () => 0);
  return count > start;
}
