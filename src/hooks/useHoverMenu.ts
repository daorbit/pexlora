"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type RefObject } from "react";

const CLOSE_DELAY_MS = 140;

export function useHoverMenu(containerRef?: RefObject<HTMLElement | null>) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);

  const show = useCallback(() => {
    cancelClose();
    setOpen(true);
  }, [cancelClose]);

  const hide = useCallback(() => {
    cancelClose();
    setOpen(false);
  }, [cancelClose]);

  const scheduleHide = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }, [cancelClose]);

  const toggle = useCallback(() => (open ? hide() : show()), [open, hide, show]);

  const hoverProps = {
    onPointerEnter: (event: ReactPointerEvent) => event.pointerType === "mouse" && show(),
    onPointerLeave: (event: ReactPointerEvent) => event.pointerType === "mouse" && scheduleHide(),
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && hide();
    const onPointerDown = (event: PointerEvent) => {
      const container = containerRef?.current;
      if (container && !container.contains(event.target as Node)) hide();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, hide, containerRef]);

  useEffect(() => cancelClose, [cancelClose]);

  return { open, show, hide, scheduleHide, toggle, hoverProps };
}
