"use client";

import { useActionState } from "react";
import { LoaderCircle, RotateCcw } from "lucide-react";
import { resetUserUsage } from "@/actions/admin";
import { adminCopy } from "@/content/admin";
import { Button } from "@/components/ui/Button";
import { FormStatus } from "@/components/dashboard/account/FormStatus";

export function ResetUsageForm({ userId }: { userId: string }) {
  const [state, formAction, pending] = useActionState(resetUserUsage.bind(null, userId), undefined);

  return (
    <form action={formAction} className="flex flex-col gap-3 px-5 py-4">
      <FormStatus state={state} />
      <Button type="submit" variant="secondary" size="sm" disabled={pending} className="self-start">
        {pending ? <LoaderCircle className="size-3.5 animate-spin" aria-hidden /> : <RotateCcw className="size-3.5" aria-hidden />}
        {adminCopy.usage.reset}
      </Button>
    </form>
  );
}
