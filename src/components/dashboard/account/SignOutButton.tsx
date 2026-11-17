"use client";

import { LoaderCircle, LogOut } from "lucide-react";
import { accountCopy } from "@/content/account";
import { useSignOut } from "@/hooks/useSignOut";
import { Button } from "@/components/ui/Button";
import { SignOutConfirm } from "@/components/auth/SignOutConfirm";

export function SignOutButton() {
  const { request, confirm, cancel, confirming, pending } = useSignOut();

  if (confirming) {
    return <SignOutConfirm pending={pending} onConfirm={confirm} onCancel={cancel} className="max-w-xs" />;
  }

  return (
    <Button type="button" variant="secondary" size="sm" disabled={pending} onClick={request}>
      {pending ? <LoaderCircle className="size-3.5 animate-spin" aria-hidden /> : <LogOut className="size-3.5" aria-hidden />}
      {accountCopy.signOut}
    </Button>
  );
}
