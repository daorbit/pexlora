"use client";

import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";
import { navCopy } from "@/content/navigation";
import { useHoverMenu } from "@/hooks/useHoverMenu";
import { cn } from "@/lib/utils/cn";
import { MegaMenuPanel } from "@/components/layout/MegaMenuPanel";

const MENU_ID = "tools-menu";

export function ToolsMenu() {
  const { open, hide, scheduleHide, toggle, hoverProps } = useHoverMenu();

  return (
    <>
      <div {...hoverProps}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={MENU_ID}
          onClick={toggle}
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
