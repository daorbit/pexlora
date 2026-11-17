"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FileFormat, FileKind } from "@/config/file-formats";
import type { Upsell } from "@/lib/api/upsell";
import { detectFormat, getFileError, hasPreview } from "@/lib/files/detect";
import type { WorkspacePerks } from "@/lib/plan/perks";
import { runPool } from "@/lib/utils/run-pool";
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

export type QueueNotice = { message: string; upsell: Upsell };

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

type Combiner = (files: File[]) => Promise<ProcessedFile>;

export type BatchSummary = { done: number; failed: number };

type QueueOptions = { inspectOnAdd: boolean; accepts: FileKind[]; localCapable: boolean; perks: WorkspacePerks };

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong.";
}

function revoke(item: QueueItem) {
  if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
  if (item.result) URL.revokeObjectURL(item.result.url);
}

export function useFileQueue({ inspectOnAdd, accepts, localCapable, perks }: QueueOptions) {
  const { filesPerBatch, parallelJobs } = perks;
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
    (files: File[], { replace = false }: { replace?: boolean } = {}) => {
      const slots = filesPerBatch - (replace ? 0 : itemsRef.current.length);
      const problems: string[] = [];
      const accepted: QueueItem[] = [];

      files.forEach((file) => {
        const fileError = getFileError(file, accepts, localCapable, perks);
        if (fileError) return problems.push(`${file.name}: ${fileError}`);
        if (accepted.length >= slots) {
          return problems.push(`You can add up to ${filesPerBatch} files at a time.`);
        }
        const format = detectFormat(file)!;
        accepted.push({
          id: crypto.randomUUID(),
          file,
          format,
          previewUrl: hasPreview(format) ? URL.createObjectURL(file) : null,
          status: inspectOnAdd ? "inspecting" : "ready",
        });
      });

      setNotice(problems.length ? { message: problems[0], upsell: null } : null);
      if (!accepted.length) return;
      setItems((current) => {
        if (!replace) return [...current, ...accepted];
        current.forEach(revoke);
        return accepted;
      });
      if (inspectOnAdd) accepted.forEach(inspect);
    },
    [accepts, filesPerBatch, inspect, inspectOnAdd, localCapable, perks],
  );

  const process = useCallback(
    async (run: Runner): Promise<BatchSummary> => {
      const pending = itemsRef.current.filter((item) => item.status === "ready");
      const summary: BatchSummary = { done: 0, failed: 0 };
      let lowestQuota: number | null = null;
      setIsProcessing(true);
      setNotice(null);

      await runPool(pending, parallelJobs, async (item, stop) => {
        update(item.id, { status: "processing", error: undefined });
        try {
          const { quotaRemaining: remaining, ...processed } = await run(item.file);
          update(item.id, {
            status: "done",
            result: { ...processed, url: URL.createObjectURL(processed.blob) },
          });
          summary.done += 1;
          if (remaining !== null) {
            lowestQuota = lowestQuota === null ? remaining : Math.min(lowestQuota, remaining);
            setQuotaRemaining(lowestQuota);
          }
        } catch (error) {
          if (error instanceof ApiRequestError && error.status === 429) {
            update(item.id, { status: "ready" });
            setNotice({ message: error.message, upsell: error.upsell });
            setQuotaRemaining(0);
            stop();
            return;
          }
          update(item.id, { status: "error", error: errorMessage(error) });
          summary.failed += 1;
        }
      });

      setIsProcessing(false);
      return summary;
    },
    [parallelJobs, update],
  );

  const combine = useCallback(async (run: Combiner): Promise<BatchSummary> => {
    const pending = itemsRef.current.filter((item) => item.status === "ready");
    if (!pending.length) return { done: 0, failed: 0 };
    const ids = new Set(pending.map((item) => item.id));
    setIsProcessing(true);
    setNotice(null);
    setItems((current) => current.map((item) => (ids.has(item.id) ? { ...item, status: "processing", error: undefined } : item)));

    try {
      const { quotaRemaining: remaining, ...processed } = await run(pending.map((item) => item.file));
      const file = new File([processed.blob], processed.name, { type: processed.blob.type });
      const format = detectFormat(file);
      const combined: QueueItem | null = format
        ? {
            id: crypto.randomUUID(),
            file,
            format,
            previewUrl: null,
            status: "done",
            result: { ...processed, url: URL.createObjectURL(processed.blob) },
          }
        : null;
      if (remaining !== null) setQuotaRemaining(remaining);
      setItems((current) => {
        current.forEach(revoke);
        return combined ? [combined] : [];
      });
      return { done: 1, failed: 0 };
    } catch (error) {
      if (error instanceof ApiRequestError && error.status === 429) {
        setNotice({ message: error.message, upsell: error.upsell });
        setQuotaRemaining(0);
        setItems((current) => current.map((item) => (ids.has(item.id) ? { ...item, status: "ready" } : item)));
        return { done: 0, failed: 0 };
      }
      setNotice({ message: errorMessage(error), upsell: null });
      setItems((current) => current.map((item) => (ids.has(item.id) ? { ...item, status: "ready" } : item)));
      return { done: 0, failed: 1 };
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const move = useCallback((id: string, offset: number) => {
    setItems((current) => {
      const from = current.findIndex((item) => item.id === id);
      const to = from + offset;
      if (from < 0 || to < 0 || to >= current.length) return current;
      const next = [...current];
      [next[from], next[to]] = [next[to], next[from]];
      return next;
    });
  }, []);

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
            previewUrl: hasPreview(format) ? URL.createObjectURL(entry.file) : null,
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
    canAddMore: items.length < filesPerBatch,
    addFiles,
    process,
    combine,
    move,
    remove,
    reset,
    resetResults,
    restore,
  };
}
