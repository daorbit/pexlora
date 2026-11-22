"use client";

import { useActionState, type FormEvent, type ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import { useNextPath } from "@/hooks/useNextPath";
import { NEXT_PARAM } from "@/lib/url/next-path";
import type { AuthFieldName, AuthFormState } from "@/lib/validations/auth";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { cn } from "@/lib/utils/cn";

export type AuthField = {
  name: AuthFieldName;
  label: string;
  type: "text" | "email" | "password";
  autoComplete?: string;
  placeholder?: string;
  inputMode?: "numeric" | "email" | "text";
  maxLength?: number;
  className?: string;
};

type AuthFormProps = {
  action: (state: AuthFormState, formData: FormData) => Promise<AuthFormState>;
  fields: AuthField[];
  submitLabel: string;
  hiddenFields?: Record<string, string>;
  beforeFields?: ReactNode;
  afterFields?: ReactNode;
  defaultValues?: Partial<Record<AuthFieldName, string>>;
  onValueChange?: (name: string, value: string) => void;
};

export function AuthForm({
  action,
  fields,
  submitLabel,
  hiddenFields,
  beforeFields,
  afterFields,
  defaultValues,
  onValueChange,
}: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const next = useNextPath();
  const shown = new Set<string>(fields.map((field) => field.name));
  const offscreenError = Object.entries(state?.errors ?? {}).find(([name]) => !shown.has(name))?.[1]?.[0];

  const handleChange = (event: FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.name) onValueChange?.(target.name, target.value);
  };

  return (
    <form action={formAction} onChange={onValueChange ? handleChange : undefined} className="flex flex-col gap-2.5 lg:gap-3" noValidate>
      {next && <input type="hidden" name={NEXT_PARAM} value={next} />}
      {hiddenFields &&
        Object.entries(hiddenFields).map(([name, value]) => <input key={name} type="hidden" name={name} value={value} />)}
      {state?.message && <Alert message={state.message} />}
      {state?.success && <Alert message={state.success} tone="success" />}
      {offscreenError && <Alert message={offscreenError} />}
      {beforeFields}
      {fields.map((field) => (
        <FormField
          key={field.name}
          name={field.name}
          label={field.label}
          type={field.type}
          autoComplete={field.autoComplete}
          placeholder={field.placeholder}
          inputMode={field.inputMode}
          maxLength={field.maxLength}
          labelPosition="above"
          defaultValue={
            field.name === "name" || field.name === "email"
              ? (state?.values?.[field.name] ?? defaultValues?.[field.name])
              : undefined
          }
          errors={state?.errors?.[field.name]}
          className={cn("border-border-strong focus:ring-accent-soft sm:h-12.5", field.className)}
          required
        />
      ))}
      {afterFields}
      <Button
        type="submit"
        size="xl"
        arrow={!pending}
        disabled={pending}
        className="mt-1 h-12 w-full sm:h-12.5"
      >
        {pending ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : null}
        {submitLabel}
      </Button>
    </form>
  );
}
