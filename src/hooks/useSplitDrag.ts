"use client";

import { useCallback, useEffect, useRef } from "react";

export type SplitDragFrom = "anywhere" | "handle";

const HANDLE_HIT_PX = 32;

function clampPercent(value: number) {
  return Math.min(100, Math.max(0, value));
}

export function useSplitDrag(dragFrom: SplitDragFrom) {
  const frameRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const setSplit = useCallback((value: number) => {
    const percent = clampPercent(value);
    frameRef.current?.style.setProperty("--split", `${percent}%`);
    if (inputRef.current) inputRef.current.value = String(Math.round(percent));
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let dragging = false;

    const percentAt = (clientX: number) => {
      const rect = frame.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    };

    const nearHandle = (clientX: number) => {
      const rect = frame.getBoundingClientRect();
      const split = Number(inputRef.current?.value ?? 50);
      return Math.abs(clientX - (rect.left + (rect.width * split) / 100)) <= HANDLE_HIT_PX;
    };

    const onDown = (event: PointerEvent) => {
      if (dragFrom === "handle" && event.pointerType !== "mouse" && !nearHandle(event.clientX)) return;
      dragging = true;
      event.stopPropagation();
      frame.setPointerCapture(event.pointerId);
      setSplit(percentAt(event.clientX));
    };
    const onMove = (event: PointerEvent) => {
      if (dragging) setSplit(percentAt(event.clientX));
    };
    const onUp = () => {
      dragging = false;
    };

    frame.addEventListener("pointerdown", onDown);
    frame.addEventListener("pointermove", onMove);
    frame.addEventListener("pointerup", onUp);
    frame.addEventListener("pointercancel", onUp);
    return () => {
      frame.removeEventListener("pointerdown", onDown);
      frame.removeEventListener("pointermove", onMove);
      frame.removeEventListener("pointerup", onUp);
      frame.removeEventListener("pointercancel", onUp);
    };
  }, [dragFrom, setSplit]);

  return { frameRef, inputRef, setSplit };
}
