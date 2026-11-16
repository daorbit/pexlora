"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { navLinks, routes } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia("(min-width: 768px)");
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    const onResize = () => desktop.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <Button
        variant="icon"
        size="sm"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
      </Button>
      {open &&
        createPortal(
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="fixed inset-x-0 top-14 bottom-0 z-40 flex flex-col gap-1 overflow-y-auto border-t border-separator bg-surface px-4 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-foreground md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              className="flex h-13 items-center rounded-2xl px-4 text-[17px] font-semibold active:bg-fill"
            >
              {link.label}
            </a>
          ))}
          <Link
            href={routes.signIn}
            onClick={close}
            className="flex h-13 items-center rounded-2xl px-4 text-[17px] font-semibold text-secondary active:bg-fill"
          >
            Sign In
          </Link>
          <div className="mt-auto flex items-center justify-between border-t border-separator px-4 pt-5">
            <span className="text-[15px] font-semibold text-secondary">Theme</span>
            <ThemeSwitcher />
          </div>
        </nav>,
          document.body,
        )}
    </div>
  );
}
