"use client";

import { useFormStatus } from "react-dom";
import { Spinner } from "@/components/ui/Spinner";

export function FormPendingSpinner({ className }: { className?: string }) {
  const { pending } = useFormStatus();
  return pending ? <Spinner className={className} /> : null;
}
