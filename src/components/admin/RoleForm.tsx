"use client";

import { useActionState, useState } from "react";
import { updateUserRole } from "@/actions/admin";
import { ROLE_LABELS, USER_ROLES, type UserRole } from "@/config/roles";
import { adminCopy } from "@/content/admin";
import { Segmented } from "@/components/ui/Segmented";
import { FormStatus } from "@/components/dashboard/account/FormStatus";
import { SubmitButton } from "@/components/dashboard/account/SubmitButton";

type RoleFormProps = { userId: string; role: UserRole; lockedReason?: string };

const options = USER_ROLES.map((value) => ({ value, label: ROLE_LABELS[value] }));

export function RoleForm({ userId, role, lockedReason }: RoleFormProps) {
  const [state, formAction, pending] = useActionState(updateUserRole.bind(null, userId), undefined);
  const [selected, setSelected] = useState<UserRole>(role);

  return (
    <form action={formAction} className="flex flex-col gap-3 px-5 py-4">
      <FormStatus state={state} />
      <input type="hidden" name="role" value={selected} />
      <Segmented
        label={adminCopy.role.title}
        value={selected}
        options={options}
        onChange={setSelected}
        disabled={Boolean(lockedReason) || pending}
        size="sm"
        className="w-full"
      />
      {!lockedReason && (
        <div className="flex justify-end">
          <SubmitButton pending={pending} label={adminCopy.role.save} />
        </div>
      )}
      {lockedReason && <p className="text-[13px] text-secondary">{lockedReason}</p>}
    </form>
  );
}
