"use client";

import { useCallback, useEffect, useRef } from "react";

type AddFiles = (files: File[], options?: { replace?: boolean }) => void;

type AutoRunOptions = {
  enabled: boolean;
  canRun: boolean;
  run: () => void;
};

export function useAutoRun(addFiles: AddFiles, { enabled, canRun, run }: AutoRunOptions) {
  const pending = useRef(false);

  const addAndRun = useCallback<AddFiles>(
    (files, options) => {
      if (enabled) pending.current = true;
      addFiles(files, options);
    },
    [addFiles, enabled],
  );

  useEffect(() => {
    if (!pending.current || !canRun) return;
    pending.current = false;
    run();
  }, [canRun, run]);

  return addAndRun;
}
