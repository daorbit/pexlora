"use client";

import { useLinkStatus } from "next/link";
import { Spinner } from "@/components/ui/Spinner";

export function LinkPendingSpinner({ className }: { className?: string }) {
  const { pending } = useLinkStatus();
  return pending ? <Spinner className={className} /> : null;
}
