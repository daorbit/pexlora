"use client";

import { useCallback, useState } from "react";
import { ZIP_MAX_TOTAL_MB } from "@/config/limits";
import { zipExtractCopy } from "@/content/utility-tools";
import type { ZipEntry } from "@/lib/files/zip/read-zip";
import { vibrate } from "@/lib/utils/haptics";
import { wait } from "@/lib/utils/wait";
import { workspacePhase } from "@/lib/workspace/phase";

const MAX_BYTES = ZIP_MAX_TOTAL_MB * 1024 * 1024;
const MIN_OPEN_MS = 900;
const PROGRESS_UPDATES = 50;

export type Archive = { name: string; size: number; entries: ZipEntry[] };
export type ArchiveOpening = { name: string; done: number; total: number };

function fileError(file: File) {
  if (!/\.zip$/i.test(file.name)) return zipExtractCopy.notZip;
  if (file.size > MAX_BYTES) return zipExtractCopy.tooLarge;
  return null;
}

export function useUnzip(onOpened: (entries: ZipEntry[]) => void) {
  const [archive, setArchive] = useState<Archive | null>(null);
  const [opening, setOpening] = useState<ArchiveOpening | null>(null);
  const [error, setError] = useState<string | null>(null);

  const openZip = useCallback(
    async ([file]: File[]) => {
      const invalid = fileError(file);
      setError(invalid);
      if (invalid) return;

      setArchive(null);
      setOpening({ name: file.name, done: 0, total: 0 });
      const report = (done: number, total: number) => {
        if (done === total || done % Math.ceil(total / PROGRESS_UPDATES) === 0) setOpening({ name: file.name, done, total });
      };

      try {
        const { readZip } = await import("@/lib/files/zip/read-zip");
        const [entries] = await Promise.all([readZip(file, report), wait(MIN_OPEN_MS)]);
        if (entries.length) {
          setArchive({ name: file.name, size: file.size, entries });
          onOpened(entries);
          vibrate("success");
        } else {
          setError(zipExtractCopy.empty);
        }
      } catch {
        setError(zipExtractCopy.unreadable);
        vibrate("error");
      } finally {
        setOpening(null);
      }
    },
    [onOpened],
  );

  const reset = useCallback(() => {
    setArchive(null);
    setError(null);
  }, []);

  const phase = workspacePhase({
    itemCount: archive || opening ? 1 : 0,
    readyCount: 0,
    doneCount: archive ? 1 : 0,
    isProcessing: Boolean(opening),
  });

  return { archive, opening, error, phase, openZip, reset };
}
