"use client";

import { useRef } from "react";
import Link from "next/link";
import { LayoutDashboard, Settings, type LucideIcon } from "lucide-react";
import { routes } from "@/config/site";
import { accountMenuCopy } from "@/content/navigation";
import { useHoverMenu } from "@/hooks/useHoverMenu";
import type { ActivePlan } from "@/lib/auth/plan";
import { cn } from "@/lib/utils/cn";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { ProGem } from "@/components/plan/ProGem";
import { SignOutMenuItem } from "@/components/auth/SignOutMenuItem";

type UserMenuProps = { name: string; email: string; avatarUrl?: string; plan: ActivePlan | null };

const MENU_ID = "account-menu";
const itemClass =
  "flex h-10 w-full items-center gap-2.5 rounded-xl px-2.5 text-sm font-medium transition-colors focus-visible:outline-none";

const items: { href: string; label: string; icon: LucideIcon }[] = [
  { href: routes.dashboard, label: accountMenuCopy.dashboard, icon: LayoutDashboard },
  { href: routes.dashboardSettings, label: accountMenuCopy.settings, icon: Settings },
];

export function UserMenu({ name, email, avatarUrl, plan }: UserMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { open, hide, toggle, hoverProps } = useHoverMenu(containerRef);

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {plan && <ProGem plan={plan} />}
      <div ref={containerRef} {...hoverProps} className="relative">
        <button
          type="button"
          aria-label={accountMenuCopy.open}
          aria-expanded={open}
          aria-controls={MENU_ID}
          onClick={toggle}
          className="flex rounded-full outline-ring focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <UserAvatar name={name} avatarUrl={avatarUrl} size="md" />
        </button>
        {open && (
          <div id={MENU_ID} className="absolute top-full right-0 z-50 pt-2">
            <nav
              aria-label={accountMenuCopy.open}
              className="flex w-60 flex-col rounded-2xl border border-separator bg-surface p-1.5 shadow-card motion-safe:animate-pop"
            >
              <div className="flex items-center gap-3 px-2.5 pt-2 pb-3">
                <UserAvatar name={name} avatarUrl={avatarUrl} size="md" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{name}</p>
                  <p className="truncate text-xs text-secondary">{email}</p>
                </div>
              </div>
              <div className="h-px bg-separator" aria-hidden />
              <ul className="flex flex-col gap-0.5 pt-1.5">
                {items.map(({ href, label, icon: Icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={hide}
                      className={cn(itemClass, "text-foreground hover:bg-fill focus-visible:bg-fill")}
                    >
                      <Icon className="size-4 text-secondary" aria-hidden />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="my-1.5 h-px bg-separator" aria-hidden />
              <SignOutMenuItem className={itemClass} confirmClassName="px-2.5 pt-1 pb-1.5" />
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
