"use client";

import { useCallback, useState } from "react";
import { dropboxChooser } from "@/config/import-sources";
import { dropboxCopy } from "@/content/import-sources";
import { chooseDropboxFiles, downloadDropboxFile, loadDropbox } from "@/lib/dropbox/chooser";
import { acceptedExtensions, collectFiles } from "@/lib/import/collect-files";
import { toast } from "@/lib/toast/store";

const reportFailure = () => toast.error(dropboxCopy.failed);

export function useDropboxImport(onFiles: (files: File[]) => void, accept: string, multiple = true) {
  const [busy, setBusy] = useState(false);

  const prepare = useCallback(() => {
    loadDropbox().catch(() => {});
  }, []);

  const open = useCallback(async () => {
    setBusy(true);
    try {
      const picked = await chooseDropboxFiles({ extensions: acceptedExtensions(accept), multiple });
      await collectFiles(picked.map(downloadDropboxFile), onFiles, reportFailure);
    } catch {
      reportFailure();
    } finally {
      setBusy(false);
    }
  }, [accept, multiple, onFiles]);

  return { enabled: dropboxChooser.enabled, busy, open, prepare };
}
