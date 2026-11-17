"use client";

import { useEffect } from "react";

export function useOverlayLock(open: boolean, onClose: () => void, closeAtQuery?: string) {
  useEffect(() => {
    if (!open) return;
    const media = closeAtQuery ? window.matchMedia(closeAtQuery) : null;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    const onResize = () => media?.matches && onClose();
    document.addEventListener("keydown", onKey);
    media?.addEventListener("change", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      media?.removeEventListener("change", onResize);
      document.body.style.overflow = "";
    };
  }, [open, onClose, closeAtQuery]);
}
