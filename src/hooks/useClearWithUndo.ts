"use client";

import { useCallback } from "react";
import { queueCopy } from "@/content/workspace";
import { snapshotQueue, type QueueItem, type SavedQueueItem } from "@/hooks/useFileQueue";
import { toast } from "@/lib/toast/store";

type ClearableQueue = {
  items: QueueItem[];
  reset: () => void;
  restore: (items: SavedQueueItem[]) => void;
};

export function useClearWithUndo({ items, reset, restore }: ClearableQueue) {
  return useCallback(() => {
    if (!items.length) return;
    const snapshot = snapshotQueue(items);
    reset();
    toast.undo(queueCopy.cleared(snapshot.length), () => restore(snapshot));
  }, [items, reset, restore]);
}
