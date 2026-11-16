"use client";

import { useEffect, useRef } from "react";
import type { WorkspaceToolSlug } from "@/config/tools";
import { snapshotQueue, type QueueItem, type SavedQueueItem } from "@/hooks/useFileQueue";
import type { MetadataFields } from "@/lib/image/options";
import { clearSession, loadSession, saveSession } from "@/lib/storage/session-store";
import { takeHandedOffFiles } from "@/lib/utils/file-handoff";

type WorkspaceSession = { items: SavedQueueItem[]; metadata?: MetadataFields };

type SessionQueue = {
  items: QueueItem[];
  isProcessing: boolean;
  addFiles: (files: File[]) => void;
  restore: (items: SavedQueueItem[]) => void;
};

type SessionOptions = {
  metadata: MetadataFields;
  restoreMetadata: (metadata: MetadataFields) => void;
  scope?: string;
};

const SAVE_DELAY_MS = 400;

export function useWorkspaceSession(tool: WorkspaceToolSlug, queue: SessionQueue, options: SessionOptions) {
  const key = options.scope ? `workspace:${tool}:${options.scope}` : `workspace:${tool}`;
  const ready = useRef(false);
  const { addFiles, restore } = queue;
  const { restoreMetadata } = options;

  useEffect(() => {
    let cancelled = false;
    const handedOff = takeHandedOffFiles(tool);

    if (handedOff.length) {
      clearSession(key);
      addFiles(handedOff);
      ready.current = true;
      return;
    }

    loadSession<WorkspaceSession>(key).then((session) => {
      if (cancelled) return;
      if (session?.items.length) restore(session.items);
      if (session?.metadata) restoreMetadata(session.metadata);
      ready.current = true;
    });

    return () => {
      cancelled = true;
    };
  }, [key, tool, addFiles, restore, restoreMetadata]);

  useEffect(() => {
    if (!ready.current || queue.isProcessing) return;
    const timer = setTimeout(() => {
      if (!queue.items.length) {
        clearSession(key);
        return;
      }
      saveSession<WorkspaceSession>(key, {
        items: snapshotQueue(queue.items),
        metadata: tool === "edit-metadata" ? options.metadata : undefined,
      });
    }, SAVE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [key, tool, queue.items, queue.isProcessing, options.metadata]);
}
