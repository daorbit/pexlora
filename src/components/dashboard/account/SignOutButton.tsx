"use client";

import { LoaderCircle, LogOut } from "lucide-react";
import { accountCopy } from "@/content/account";
import { useSignOut } from "@/hooks/useSignOut";
import { Button } from "@/components/ui/Button";

export function SignOutButton() {
  const { signOut, pending } = useSignOut();

  return (
    <Button type="button" variant="secondary" size="sm" disabled={pending} onClick={signOut}>
      {pending ? <LoaderCircle className="size-3.5 animate-spin" aria-hidden /> : <LogOut className="size-3.5" aria-hidden />}
      {accountCopy.signOut}
    </Button>
  );
}
