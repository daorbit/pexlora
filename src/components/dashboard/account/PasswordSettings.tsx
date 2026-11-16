"use client";

import { useActionState, useState } from "react";
import { KeyRound } from "lucide-react";
import { updatePassword } from "@/actions/account";
import { accountCopy } from "@/content/account";
import type { AccountFormState, PasswordField } from "@/lib/validations/account";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { FormStatus } from "@/components/dashboard/account/FormStatus";
import { SubmitButton } from "@/components/dashboard/account/SubmitButton";
import { SettingsRow } from "@/components/dashboard/SettingsRow";

const copy = accountCopy.password;

function passwordFields(hasPassword: boolean): { name: PasswordField; autoComplete: string }[] {
  return [
    ...(hasPassword ? [{ name: "currentPassword" as const, autoComplete: "current-password" }] : []),
    { name: "newPassword", autoComplete: "new-password" },
    { name: "confirmPassword", autoComplete: "new-password" },
  ];
}

export function PasswordSettings({ hasPassword }: { hasPassword: boolean }) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(
    async (previous: AccountFormState<PasswordField>, formData: FormData) => {
      const next = await updatePassword(previous, formData);
      if (next?.status === "success") setOpen(false);
      return next;
    },
    undefined,
  );
  const actionLabel = hasPassword ? copy.change : copy.set;

  return (
    <div>
      <SettingsRow label={copy.label} description={hasPassword ? copy.description.set : copy.description.unset}>
        {!open && (
          <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
            <KeyRound className="size-3.5" aria-hidden />
            {actionLabel}
          </Button>
        )}
      </SettingsRow>

      {!open && state?.status === "success" && (
        <div className="px-5 pb-4">
          <FormStatus state={state} />
        </div>
      )}

      {open && (
        <form action={formAction} className="flex flex-col gap-3 px-5 pb-5" noValidate>
          {state?.status === "error" && <FormStatus state={state} />}
          {passwordFields(hasPassword).map((field) => (
            <FormField
              key={field.name}
              name={field.name}
              type="password"
              label={copy.fields[field.name]}
              autoComplete={field.autoComplete}
              errors={state?.errors?.[field.name]}
              required
            />
          ))}
          <div className="flex items-center gap-2 pt-1">
            <SubmitButton pending={pending} label={actionLabel} />
            <Button type="button" variant="plain" size="sm" onClick={() => setOpen(false)} disabled={pending}>
              {copy.cancel}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
