"use client";

import { useCallback, useRef, useState, type FocusEvent, type MouseEvent } from "react";

export type RailTip = { label: string; isNew: boolean };

const GAP = 14;

export function useRailTooltip(enabled: boolean) {
  const tipRef = useRef<HTMLSpanElement>(null);
  const [tip, setTip] = useState<RailTip | null>(null);

  const showFor = useCallback(
    (target: EventTarget) => {
      const anchor = enabled && target instanceof Element ? target.closest<HTMLElement>("[data-tooltip]") : null;
      if (!anchor) return setTip(null);
      const rect = anchor.getBoundingClientRect();
      tipRef.current?.style.setProperty("--tip-top", `${rect.top + rect.height / 2}px`);
      tipRef.current?.style.setProperty("--tip-left", `${rect.right + GAP}px`);
      setTip({ label: anchor.dataset.tooltip ?? "", isNew: anchor.dataset.tooltipNew !== undefined });
    },
    [enabled],
  );

  const onMouseOver = useCallback((event: MouseEvent) => showFor(event.target), [showFor]);
  const onFocus = useCallback((event: FocusEvent) => showFor(event.target), [showFor]);
  const hide = useCallback(() => setTip(null), []);

  return { tip: enabled ? tip : null, tipRef, onMouseOver, onFocus, hide };
}
