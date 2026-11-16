"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";
import { navCopy } from "@/content/navigation";
import { cn } from "@/lib/utils/cn";
import { MegaMenuPanel } from "@/components/layout/MegaMenuPanel";

const MENU_ID = "tools-menu";
const CLOSE_DELAY_MS = 140;

export function ToolsMenu() {
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

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && hide();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, hide]);

  useEffect(() => cancelClose, [cancelClose]);

  return (
    <>
      <div onPointerEnter={show} onPointerLeave={scheduleHide}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={MENU_ID}
          onClick={() => (open ? hide() : show())}
          className="inline-flex h-14 items-center gap-1 text-sm font-semibold text-foreground"
        >
          {navCopy.allTools}
          <ChevronDown className={cn("size-4 transition-transform duration-300", open && "rotate-180")} aria-hidden />
        </button>
        {open && <MegaMenuPanel id={MENU_ID} onNavigate={hide} />}
      </div>
      {open &&
        createPortal(
          <div
            aria-hidden
            onPointerEnter={scheduleHide}
            onClick={hide}
            className="fixed inset-x-0 top-14 bottom-0 z-40 bg-black/25 backdrop-blur-md motion-safe:animate-fade-in"
          />,
          document.body,
        )}
    </>
  );
}
