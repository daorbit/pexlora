"use client";

import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";

type MobileNavProps = {
  children: ReactNode;
  renderTrigger: (state: { open: boolean; openMenu: () => void }) => ReactNode;
};

export function MobileNav({ children, renderTrigger }: MobileNavProps) {
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  return (
    <>
      {renderTrigger({ open, openMenu: () => setOpenOn(pathname) })}
      {open && createPortal(
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/50 motion-safe:animate-fade-in"
            onClick={() => setOpenOn(null)}
          />
          <div className="relative h-full w-80 max-w-[90%] p-2 motion-safe:animate-fade-in">
            <div className="theme-dark absolute top-5 right-5 z-10">
              <Button variant="icon" size="sm" aria-label="Close menu" onClick={() => setOpenOn(null)}>
                <X className="size-4" aria-hidden />
              </Button>
            </div>
            {children}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
