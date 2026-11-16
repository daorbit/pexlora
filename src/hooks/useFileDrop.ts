"use client";

import { useCallback, useEffect, useRef, useState, type DragEvent } from "react";

export function useFileDrop(onFiles: (files: File[]) => void, enabled = true) {
  const [isDragging, setIsDragging] = useState(false);
  const depth = useRef(0);

  const onDragEnter = useCallback(
    (event: DragEvent) => {
      if (!enabled || !event.dataTransfer.types.includes("Files")) return;
      event.preventDefault();
      depth.current += 1;
      setIsDragging(true);
    },
    [enabled],
  );

  const onDragLeave = useCallback(() => {
    depth.current = Math.max(0, depth.current - 1);
    if (depth.current === 0) setIsDragging(false);
  }, []);

  const onDragOver = useCallback((event: DragEvent) => event.preventDefault(), []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      depth.current = 0;
      setIsDragging(false);
      if (!enabled) return;
      const files = Array.from(event.dataTransfer.files);
      if (files.length) onFiles(files);
    },
    [enabled, onFiles],
  );

  useEffect(() => {
    if (!enabled) return;
    const onPaste = (event: ClipboardEvent) => {
      const files = Array.from(event.clipboardData?.files ?? []);
      if (files.length) onFiles(files);
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [enabled, onFiles]);

  return { isDragging, dropProps: { onDragEnter, onDragLeave, onDragOver, onDrop } };
}
