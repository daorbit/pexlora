"use client";

import { useEffect, useRef } from "react";
import type { WorkspaceToolSlug } from "@/config/tools";
import { snapshotQueue, type QueueItem, type SavedQueueItem } from "@/hooks/useFileQueue";
import { workspaceSessionKey, type WorkspaceSession } from "@/lib/storage/workspace-sessions";
import type { MetadataFields } from "@/lib/image/options";
import { clearSession, loadSession, saveSession } from "@/lib/storage/session-store";
import { takeHandedOffFiles } from "@/lib/utils/file-handoff";
import { takeSharedFiles } from "@/lib/utils/share-target";

type SessionQueue = {
  items: QueueItem[];
  isProcessing: boolean;
  addFiles: (files: File[], options?: { replace?: boolean }) => void;
  restore: (items: SavedQueueItem[]) => void;
  reset: () => void;
};

type SessionOptions = {
  metadata: MetadataFields;
  restoreMetadata: (metadata: MetadataFields) => void;
  scope?: string;
};

const SAVE_DELAY_MS = 400;

export function useWorkspaceSession(tool: WorkspaceToolSlug, queue: SessionQueue, options: SessionOptions) {
  const key = workspaceSessionKey(tool, options.scope);
  const ready = useRef(false);
  const pendingSave = useRef<(() => void) | null>(null);
  const { addFiles, restore, reset } = queue;
  const { restoreMetadata } = options;

  useEffect(() => {
    let cancelled = false;
    ready.current = false;
    const handedOff = takeHandedOffFiles(tool);

    if (handedOff.length) {
      clearSession(key);
      addFiles(handedOff, { replace: true });
      ready.current = true;
      return;
    }

    const restoreSaved = () =>
      loadSession<WorkspaceSession>(key).then((session) => {
        if (cancelled) return;
        if (session?.items.length) restore(session.items);
        else reset();
        if (session?.metadata) restoreMetadata(session.metadata);
        ready.current = true;
      });

    takeSharedFiles().then((shared) => {
      if (cancelled) return;
      if (!shared.length) return restoreSaved();
      clearSession(key);
      addFiles(shared, { replace: true });
      ready.current = true;
    });

    return () => {
      cancelled = true;
    };
  }, [key, tool, addFiles, restore, reset, restoreMetadata]);

  useEffect(() => {
    if (!ready.current || queue.isProcessing) return;
    const write = () => {
      pendingSave.current = null;
      if (!queue.items.length) return clearSession(key);
      saveSession<WorkspaceSession>(key, {
        items: snapshotQueue(queue.items),
        metadata: tool === "edit-metadata" ? options.metadata : undefined,
      });
    };
    pendingSave.current = write;
    const timer = setTimeout(write, SAVE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [key, tool, queue.items, queue.isProcessing, options.metadata]);

  useEffect(() => () => pendingSave.current?.(), []);
}
