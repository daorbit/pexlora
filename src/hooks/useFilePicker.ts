"use client";

import { useCallback, useRef, type ChangeEvent } from "react";

export function useFilePicker(onFiles: (files: File[]) => void, accept: string) {
  const inputRef = useRef<HTMLInputElement>(null);

  const open = useCallback(() => inputRef.current?.click(), []);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files ?? []);
      if (files.length) onFiles(files);
      event.target.value = "";
    },
    [onFiles],
  );

  return {
    open,
    inputProps: {
      ref: inputRef,
      type: "file" as const,
      accept,
      multiple: true,
      hidden: true,
      onChange,
    },
  };
}
