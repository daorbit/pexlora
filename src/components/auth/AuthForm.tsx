"use client";

import { useActionState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { useNextPath } from "@/hooks/useNextPath";
import { NEXT_PARAM } from "@/lib/url/next-path";
import type { AuthFormState } from "@/lib/validations/auth";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";

export type AuthField = {
  name: "name" | "email" | "password";
  label: string;
  type: "text" | "email" | "password";
  autoComplete?: string;
};

type AuthFormProps = {
  action: (state: AuthFormState, formData: FormData) => Promise<AuthFormState>;
  fields: AuthField[];
  submitLabel: string;
};

export function AuthForm({ action, fields, submitLabel }: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const next = useNextPath();

  return (
    <form action={formAction} className="flex flex-col gap-3" noValidate>
      {next && <input type="hidden" name={NEXT_PARAM} value={next} />}
      {state?.message && <Alert message={state.message} />}
      {fields.map((field) => (
        <FormField
          key={field.name}
          name={field.name}
          label={field.label}
          type={field.type}
          autoComplete={field.autoComplete}
          defaultValue={field.name === "password" ? undefined : state?.values?.[field.name]}
          errors={state?.errors?.[field.name]}
          required
        />
      ))}
      <Button type="submit" size="xl" disabled={pending} className="mt-3 w-full">
        {pending ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : null}
        {submitLabel}
        {!pending && <ArrowRight className="size-4" aria-hidden />}
      </Button>
    </form>
  );
}
