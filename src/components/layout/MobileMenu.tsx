"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { infoLinks } from "@/config/site";
import { menuGroups } from "@/config/tool-hub";
import { navCopy } from "@/content/navigation";
import { useOverlayLock } from "@/hooks/useOverlayLock";
import { Button } from "@/components/ui/Button";
import { MenuGroupLabel, ToolMenuLink } from "@/components/layout/ToolMenuLink";
import { MobileMenuAccount } from "@/components/layout/MobileMenuAccount";

const linkClass = "flex h-12 items-center gap-3 rounded-2xl px-3 text-[16px] font-semibold active:bg-fill";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  useOverlayLock(open, close, "(min-width: 768px)");

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
            </div>
            <MobileMenuAccount linkClass={linkClass} onSelect={close} />
          </nav>,
          document.body,
        )}
    </div>
  );
}
