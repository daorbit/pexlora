"use client";

import { useActionState, useState } from "react";
import { LoaderCircle, Trash2 } from "lucide-react";
import { deleteUser } from "@/actions/admin";
import { adminCopy } from "@/content/admin";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { FormStatus } from "@/components/dashboard/account/FormStatus";

export function DeleteUserForm({ userId, email }: { userId: string; email: string }) {
  const [state, formAction, pending] = useActionState(deleteUser.bind(null, userId), undefined);
  const [confirmation, setConfirmation] = useState("");
  const matches = confirmation.trim().toLowerCase() === email;

  return (
    <form action={formAction} className="flex flex-col gap-3 px-5 py-4" noValidate>
      <FormStatus state={state} />
      <FormField
        name="confirm"
        label={adminCopy.danger.confirmLabel}
        labelPosition="above"
        placeholder={email}
        autoComplete="off"
        value={confirmation}
        onChange={(event) => setConfirmation(event.target.value)}
      />
      <Button
        type="submit"
        variant="secondary"
        size="sm"
        disabled={!matches || pending}
        className="self-start border-danger text-danger hover:bg-danger-soft"
      >
        {pending ? <LoaderCircle className="size-3.5 animate-spin" aria-hidden /> : <Trash2 className="size-3.5" aria-hidden />}
        {adminCopy.danger.delete}
      </Button>
    </form>
  );
}
