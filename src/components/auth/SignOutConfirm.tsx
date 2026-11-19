"use client";

import { LoaderCircle, LogOut } from "lucide-react";
import { accountCopy } from "@/content/account";
import { cn } from "@/lib/utils/cn";

type SignOutConfirmProps = {
  pending: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
};

const action =
  "inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-xl px-3 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-60";

export function SignOutConfirm({ pending, onConfirm, onCancel, className }: SignOutConfirmProps) {
  return (
    <div role="alertdialog" aria-label={accountCopy.signOut} className={cn("flex flex-col gap-2.5 motion-safe:animate-fade-in", className)}>
      <p className="text-[13px] leading-snug wrap-break-word whitespace-normal text-secondary">{accountCopy.signOutWarning}</p>
      <div className="flex gap-2">
        <button type="button" onClick={onCancel} disabled={pending} className={cn(action, "bg-fill hover:bg-fill-strong")} autoFocus>
          {accountCopy.cancel}
        </button>
        <button type="button" onClick={onConfirm} disabled={pending} className={cn(action, "bg-danger text-white hover:opacity-90")}>
          {pending ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : <LogOut className="size-4" aria-hidden />}
          {accountCopy.signOut}
        </button>
      </div>
    </div>
  );
}
