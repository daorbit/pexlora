"use client";

import { useTransition } from "react";
import { LoaderCircle, LogOut } from "lucide-react";
import { signOut } from "@/actions/auth";
import { routes } from "@/config/site";
import { accountCopy } from "@/content/account";
import { clearAllSessions } from "@/lib/storage/session-store";
import { Button } from "@/components/ui/Button";

export function SignOutButton() {
  const [pending, startTransition] = useTransition();

  const onSignOut = () =>
    startTransition(async () => {
      await clearAllSessions();
      await signOut();
      window.location.assign(routes.home);
    });

  return (
    <Button type="button" variant="secondary" size="sm" disabled={pending} onClick={onSignOut}>
      {pending ? <LoaderCircle className="size-3.5 animate-spin" aria-hidden /> : <LogOut className="size-3.5" aria-hidden />}
      {accountCopy.signOut}
    </Button>
  );
}
