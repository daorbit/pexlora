"use client";

import { useCallback, useState } from "react";
import { ZIP_MAX_TOTAL_MB } from "@/config/limits";
import { zipCreateCopy } from "@/content/utility-tools";
import { toast } from "@/lib/toast/store";
import { createZip, downloadBlob } from "@/lib/utils/download";
import { safeFileName } from "@/lib/utils/file-name";
import { vibrate } from "@/lib/utils/haptics";
import { wait } from "@/lib/utils/wait";
import { workspacePhase } from "@/lib/workspace/phase";

const MAX_BYTES = ZIP_MAX_TOTAL_MB * 1024 * 1024;
const MIN_ZIP_MS = 900;

export function useZipBuilder() {
  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState("");
  const [zippedCount, setZippedCount] = useState<number | null>(null);
  const [result, setResult] = useState<Blob | null>(null);

  const change = useCallback((update: (current: File[]) => File[]) => {
    setResult(null);
    setFiles(update);
  }, []);

  const add = useCallback((incoming: File[]) => change((current) => [...current, ...incoming]), [change]);
  const removeAt = (index: number) => change((current) => current.filter((_, position) => position !== index));

  const clear = () => {
    const snapshot = files;
    change(() => []);
    toast.undo(zipCreateCopy.cleared(snapshot.length), () => change(() => snapshot));
  };

  const create = async () => {
    setZippedCount(0);
    try {
      const zip = createZip(
        files.map((file) => ({ blob: file, name: file.name })),
        (percent) => setZippedCount(Math.floor((percent / 100) * files.length)),
      );
      const [blob] = await Promise.all([zip, wait(MIN_ZIP_MS)]);
      setResult(blob);
      vibrate("success");
    } catch {
      toast.error(zipCreateCopy.failed);
      vibrate("error");
    } finally {
      setZippedCount(null);
    }
  };

  const fileName = `${safeFileName(name) || zipCreateCopy.namePlaceholder}${zipCreateCopy.extension}`;
  const save = () => {
    if (result) downloadBlob(result, fileName);
  };

  const working = zippedCount !== null;
  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
  const phase = workspacePhase({
    itemCount: files.length,
    readyCount: result ? 0 : files.length,
    doneCount: result ? files.length : 0,
    isProcessing: working,
  });

  return {
    files,
    name,
    setName,
    fileName,
    result,
    phase,
    working,
    zippedCount: zippedCount ?? 0,
    totalBytes,
    tooLarge: totalBytes > MAX_BYTES,
    add,
    removeAt,
    clear,
    create,
    save,
  };
}

export type ZipBuilder = ReturnType<typeof useZipBuilder>;
