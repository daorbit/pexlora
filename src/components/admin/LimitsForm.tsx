"use client";

import { useActionState } from "react";
import { updateUserLimits } from "@/actions/admin";
import { AI_DAILY_LIMITS, DAILY_LIMITS } from "@/config/limits";
import { MAX_CUSTOM_LIMIT } from "@/config/roles";
import { adminCopy } from "@/content/admin";
import type { CustomLimits } from "@/lib/auth/roles";
import { FormField } from "@/components/ui/FormField";
import { FormStatus } from "@/components/dashboard/account/FormStatus";
import { SubmitButton } from "@/components/dashboard/account/SubmitButton";

type LimitsFormProps = { userId: string; custom: CustomLimits };

const fields = [
  { name: "files", label: adminCopy.limits.files, fallback: DAILY_LIMITS.user },
  { name: "ai", label: adminCopy.limits.ai, fallback: AI_DAILY_LIMITS.user },
] as const;

export function LimitsForm({ userId, custom }: LimitsFormProps) {
  const [state, formAction, pending] = useActionState(updateUserLimits.bind(null, userId), undefined);

  return (
    <form action={formAction} className="flex flex-col gap-3 px-5 py-4" noValidate>
      <FormStatus state={state} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {fields.map((field) => (
          <FormField
            key={field.name}
            name={field.name}
            label={field.label}
            labelPosition="above"
            type="number"
            inputMode="numeric"
            min={0}
            max={MAX_CUSTOM_LIMIT}
            step={1}
            placeholder={`${adminCopy.limits.default}: ${field.fallback}`}
            defaultValue={custom[field.name] ?? ""}
            errors={state?.errors?.[field.name]}
          />
        ))}
      </div>
      <div className="flex justify-end">
        <SubmitButton pending={pending} label={adminCopy.limits.save} />
      </div>
    </form>
  );
}
