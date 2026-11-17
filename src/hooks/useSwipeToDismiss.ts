"use client";

import { useCallback, useRef, type PointerEvent } from "react";

const LOCK_DISTANCE = 10;
const DISMISS_RATIO = 0.35;

type Gesture = { x: number; y: number; locked: boolean; offset: number };

export function useSwipeToDismiss<T extends HTMLElement>(onDismiss: () => void, enabled: boolean) {
  const ref = useRef<T>(null);
  const gesture = useRef<Gesture | null>(null);

  const move = useCallback((offset: number, animate: boolean) => {
    const element = ref.current;
    if (!element) return;
    element.style.transition = animate ? "translate 0.25s ease, opacity 0.25s ease" : "none";
    element.style.translate = offset ? `${offset}px 0` : "";
    element.style.opacity = offset ? String(Math.max(0.3, 1 - Math.abs(offset) / element.offsetWidth)) : "";
  }, []);

  const onPointerDown = useCallback(
    (event: PointerEvent<T>) => {
      if (!enabled || event.pointerType !== "touch") return;
      gesture.current = { x: event.clientX, y: event.clientY, locked: false, offset: 0 };
    },
    [enabled],
  );

  const onPointerMove = useCallback(
    (event: PointerEvent<T>) => {
      const current = gesture.current;
      if (!current) return;
      const dx = event.clientX - current.x;
      const dy = event.clientY - current.y;
      if (!current.locked) {
        if (Math.abs(dy) > LOCK_DISTANCE && Math.abs(dy) > Math.abs(dx)) {
          gesture.current = null;
          return;
        }
        if (Math.abs(dx) < LOCK_DISTANCE) return;
        current.locked = true;
        event.currentTarget.setPointerCapture(event.pointerId);
      }
      current.offset = Math.min(0, dx);
      move(current.offset, false);
    },
    [move],
  );

  const onPointerEnd = useCallback(() => {
    const current = gesture.current;
    gesture.current = null;
    const element = ref.current;
    if (!current?.locked || !element) return;
    if (Math.abs(current.offset) > element.offsetWidth * DISMISS_RATIO) {
      move(-element.offsetWidth, true);
      window.setTimeout(onDismiss, 220);
      return;
    }
    move(0, true);
  }, [move, onDismiss]);

  return {
    ref,
    swipeProps: { onPointerDown, onPointerMove, onPointerUp: onPointerEnd, onPointerCancel: onPointerEnd },
  };
}
