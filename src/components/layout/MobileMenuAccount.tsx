"use client";

import Link from "next/link";
import { LayoutDashboard, LogIn, Settings } from "lucide-react";
import { routes } from "@/config/site";
import { accountMenuCopy, navCopy } from "@/content/navigation";
import { useSignedIn } from "@/hooks/useSignedIn";
import { cn } from "@/lib/utils/cn";
import { ButtonLink } from "@/components/ui/Button";
import { SignOutMenuItem } from "@/components/auth/SignOutMenuItem";

type MobileMenuAccountProps = { linkClass: string; onSelect: () => void };

export function MobileMenuAccount({ linkClass, onSelect }: MobileMenuAccountProps) {
  const signedIn = useSignedIn();

  if (!signedIn) {
    return (
      <div className="flex flex-col gap-2 border-t border-separator pt-3">
        <Link href={routes.signIn} onClick={onSelect} className={linkClass}>
          <LogIn className="size-5 text-secondary" aria-hidden />
          {navCopy.signIn}
        </Link>
        <ButtonLink href={routes.signUp} onClick={onSelect} variant="ink" size="lg" className="w-full">
          {navCopy.getStarted}
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="flex flex-col border-t border-separator pt-3">
      <Link href={routes.dashboard} onClick={onSelect} className={linkClass}>
        <LayoutDashboard className="size-5 text-secondary" aria-hidden />
        {accountMenuCopy.dashboard}
      </Link>
      <Link href={routes.dashboardSettings} onClick={onSelect} className={linkClass}>
        <Settings className="size-5 text-secondary" aria-hidden />
        {accountMenuCopy.settings}
      </Link>
      <SignOutMenuItem className={cn(linkClass, "w-full")} confirmClassName="px-3 pt-2" />
    </div>
  );
}
