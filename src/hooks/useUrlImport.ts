"use client";

import { useCallback, useState } from "react";
import { urlImportCopy } from "@/content/import-sources";
import { UrlImportError } from "@/lib/url-import/errors";
import { fetchUrlFile } from "@/lib/url-import/fetch-url-file";

export function useUrlImport(onFiles: (files: File[]) => void) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (raw: string) => {
      setBusy(true);
      setError(null);
      try {
        onFiles([await fetchUrlFile(raw)]);
        return true;
      } catch (failure) {
        setError(failure instanceof UrlImportError ? failure.message : urlImportCopy.failed);
        return false;
      } finally {
        setBusy(false);
      }
    },
    [onFiles],
  );

  const reset = useCallback(() => setError(null), []);

  return { busy, error, submit, reset };
}
