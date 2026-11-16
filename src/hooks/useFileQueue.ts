"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FileFormat, FileKind } from "@/config/file-formats";
import { MAX_FILES_PER_BATCH } from "@/config/limits";
import { detectFormat, getFileError } from "@/lib/files/detect";
import type { MetadataReport, ProcessedFile } from "@/lib/metadata/types";
import { ApiRequestError } from "@/services/api-client";
import { inspectFile } from "@/services/file-service";

export type QueueStatus = "ready" | "inspecting" | "processing" | "done" | "error";

export type QueueResult = Omit<ProcessedFile, "quotaRemaining"> & {
  url: string;
};

export type QueueItem = {
  id: string;
  file: File;
  format: FileFormat;
  previewUrl: string | null;
  status: QueueStatus;
  report?: MetadataReport;
  result?: QueueResult;
  error?: string;
};

export type QueueNotice = { message: string; upsell: boolean };

export type SavedQueueItem = {
  file: File;
  status: "ready" | "done" | "error";
  report?: MetadataReport;
  result?: Omit<QueueResult, "url">;
  error?: string;
};

export function snapshotQueue(items: QueueItem[]): SavedQueueItem[] {
  return items.map(({ file, status, report, result, error }) => ({
    file,
    status: status === "done" || status === "error" ? status : "ready",
    report,
    result:
      result && status === "done"
        ? {
            blob: result.blob,
            name: result.name,
            leftoverTags: result.leftoverTags,
            dimensions: result.dimensions,
            target: result.target,
            insights: result.insights,
          }
        : undefined,
    error,
  }));
}

type Runner = (file: File) => Promise<ProcessedFile>;

type QueueOptions = { inspectOnAdd: boolean; accepts: FileKind[] };

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong.";
}

function revoke(item: QueueItem) {
  if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
  if (item.result) URL.revokeObjectURL(item.result.url);
}

export function useFileQueue({ inspectOnAdd, accepts }: QueueOptions) {
  const [items, setItems] = useState<QueueItem[]>([]);
  const [notice, setNotice] = useState<QueueNotice | null>(null);
  const [quotaRemaining, setQuotaRemaining] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const itemsRef = useRef<QueueItem[]>([]);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => () => itemsRef.current.forEach(revoke), []);

  const update = useCallback((id: string, patch: Partial<QueueItem>) => {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  }, []);

  const inspect = useCallback(
    async (item: QueueItem) => {
      update(item.id, { status: "inspecting" });
      try {
        update(item.id, { status: "ready", report: await inspectFile(item.file) });
      } catch (error) {
        update(item.id, { status: "error", error: errorMessage(error) });
      }
    },
    [update],
  );

  const addFiles = useCallback(
    (files: File[]) => {
      const slots = MAX_FILES_PER_BATCH - itemsRef.current.length;
      const problems: string[] = [];
      const accepted: QueueItem[] = [];

      files.forEach((file) => {
        const fileError = getFileError(file, accepts);
        if (fileError) return problems.push(`${file.name}: ${fileError}`);
        if (accepted.length >= slots) {
          return problems.push(`You can add up to ${MAX_FILES_PER_BATCH} files at a time.`);
        }
        const format = detectFormat(file)!;
        accepted.push({
          id: crypto.randomUUID(),
          file,
          format,
          previewUrl: format.kind === "image" ? URL.createObjectURL(file) : null,
          status: inspectOnAdd ? "inspecting" : "ready",
        });
      });

      setNotice(problems.length ? { message: problems[0], upsell: false } : null);
      if (!accepted.length) return;
      setItems((current) => [...current, ...accepted]);
      if (inspectOnAdd) accepted.forEach(inspect);
    },
    [accepts, inspect, inspectOnAdd],
  );

  const process = useCallback(
    async (run: Runner) => {
      const pending = itemsRef.current.filter((item) => item.status === "ready");
      setIsProcessing(true);
      setNotice(null);

      for (const item of pending) {
        update(item.id, { status: "processing", error: undefined });
        try {
          const { quotaRemaining: remaining, ...processed } = await run(item.file);
          update(item.id, {
            status: "done",
            result: { ...processed, url: URL.createObjectURL(processed.blob) },
          });
          if (remaining !== null) setQuotaRemaining(remaining);
        } catch (error) {
          if (error instanceof ApiRequestError && error.status === 429) {
            update(item.id, { status: "ready" });
            setNotice({ message: error.message, upsell: error.upsell });
            setQuotaRemaining(0);
            break;
          }
          update(item.id, { status: "error", error: errorMessage(error) });
        }
      }

      setIsProcessing(false);
    },
    [update],
  );

  const remove = useCallback((id: string) => {
    setItems((current) => {
      const target = current.find((item) => item.id === id);
      if (target) revoke(target);
      return current.filter((item) => item.id !== id);
    });
  }, []);

  const reset = useCallback(() => {
    setItems((current) => {
      current.forEach(revoke);
      return [];
    });
    setNotice(null);
  }, []);

  const restore = useCallback(
    (saved: SavedQueueItem[]) => {
      const restored: QueueItem[] = saved.flatMap((entry) => {
        const format = detectFormat(entry.file);
        if (!format) return [];
        return [
          {
            id: crypto.randomUUID(),
            file: entry.file,
            format,
            previewUrl: format.kind === "image" ? URL.createObjectURL(entry.file) : null,
            status: entry.status,
            report: entry.report,
            error: entry.error,
            result: entry.result ? { ...entry.result, url: URL.createObjectURL(entry.result.blob) } : undefined,
          },
        ];
      });

      setItems((current) => {
        current.forEach(revoke);
        return restored;
      });
      if (inspectOnAdd) restored.filter((item) => item.status === "ready" && !item.report).forEach(inspect);
    },
    [inspect, inspectOnAdd],
  );

  const resetResults = useCallback(() => {
    setItems((current) =>
      current.map((item) => {
        if (item.status !== "done" || !item.result) return item;
        URL.revokeObjectURL(item.result.url);
        return { ...item, status: "ready", result: undefined };
      }),
    );
  }, []);

  return {
    items,
    notice,
    quotaRemaining,
    isProcessing,
    readyCount: items.filter((item) => item.status === "ready").length,
    doneItems: items.filter((item) => item.status === "done"),
    canAddMore: items.length < MAX_FILES_PER_BATCH,
    addFiles,
    process,
    remove,
    reset,
    resetResults,
    restore,
  };
}
