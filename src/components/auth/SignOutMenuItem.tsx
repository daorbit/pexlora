"use client";

import { LoaderCircle, LogOut } from "lucide-react";
import { accountCopy } from "@/content/account";
import { useSignOut } from "@/hooks/useSignOut";
import { cn } from "@/lib/utils/cn";
import { SignOutConfirm } from "@/components/auth/SignOutConfirm";

export function SignOutMenuItem({ className, confirmClassName }: { className: string; confirmClassName?: string }) {
  const { request, confirm, cancel, confirming, pending } = useSignOut();

  if (confirming) return <SignOutConfirm pending={pending} onConfirm={confirm} onCancel={cancel} className={confirmClassName} />;

  return (
    <button
      type="button"
      onClick={request}
      disabled={pending}
      className={cn(className, "text-danger hover:bg-danger-soft focus-visible:bg-danger-soft disabled:opacity-60")}
    >
      {pending ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : <LogOut className="size-4" aria-hidden />}
      {accountCopy.signOut}
    </button>
  );
}
