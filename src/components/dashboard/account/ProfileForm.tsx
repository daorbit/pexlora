"use client";

import { useActionState } from "react";
import { updateProfile } from "@/actions/account";
import { accountCopy } from "@/content/account";
import { FormField } from "@/components/ui/FormField";
import { FormStatus } from "@/components/dashboard/account/FormStatus";
import { SubmitButton } from "@/components/dashboard/account/SubmitButton";

export function ProfileForm({ name }: { name: string }) {
  const [state, formAction, pending] = useActionState(updateProfile, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-3 px-5 py-4" noValidate>
      <FormStatus state={state} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex-1">
          <FormField
            name="name"
            label={accountCopy.profile.nameLabel}
            autoComplete="name"
            defaultValue={name}
            errors={state?.errors?.name}
            required
          />
        </div>
        <div className="sm:pt-3">
          <SubmitButton pending={pending} label={accountCopy.profile.save} />
        </div>
      </div>
    </form>
  );
}
