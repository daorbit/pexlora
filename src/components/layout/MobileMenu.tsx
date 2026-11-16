"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { infoLinks, routes } from "@/config/site";
import { menuGroups } from "@/config/tool-hub";
import { navCopy } from "@/content/navigation";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { MenuGroupLabel, ToolMenuLink } from "@/components/layout/ToolMenuLink";

const linkClass = "flex h-12 items-center gap-3 rounded-2xl px-3 text-[16px] font-semibold active:bg-fill";

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
        aria-label={open ? navCopy.closeMenu : navCopy.openMenu}
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
            className="fixed inset-x-0 top-14 bottom-0 z-40 flex flex-col gap-5 overflow-y-auto border-t border-separator bg-surface px-4 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-foreground md:hidden"
          >
            {menuGroups.map((group) => (
              <div key={group.id} className="flex flex-col">
                <MenuGroupLabel>{group.label}</MenuGroupLabel>
                {group.items.map((item) => (
                  <ToolMenuLink key={item.key} item={item} onSelect={close} size="md" />
                ))}
              </div>
            ))}
            <div className="flex flex-col border-t border-separator pt-3">
              {infoLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={close} className={linkClass}>
                  {link.label}
                </Link>
              ))}
              <Link href={routes.signIn} onClick={close} className={cn(linkClass, "text-secondary")}>
                {navCopy.signIn}
              </Link>
            </div>
            <div className="mt-auto flex items-center justify-between border-t border-separator px-3 pt-5">
              <span className="text-[15px] font-semibold text-secondary">{navCopy.theme}</span>
              <ThemeSwitcher />
            </div>
          </nav>,
          document.body,
        )}
    </div>
  );
}
