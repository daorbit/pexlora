"use client";

import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function MobileNav({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  return (
    <>
      <Button
        variant="icon"
        size="md"
        className="lg:hidden"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpenOn(pathname)}
      >
        <Menu className="size-5" aria-hidden />
      </Button>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/50 motion-safe:animate-fade-in"
            onClick={() => setOpenOn(null)}
          />
          <div className="relative h-full w-72 max-w-[85%] p-2">
            <div className="theme-dark absolute top-5 right-5 z-10">
              <Button variant="icon" size="sm" aria-label="Close menu" onClick={() => setOpenOn(null)}>
                <X className="size-4" aria-hidden />
              </Button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
