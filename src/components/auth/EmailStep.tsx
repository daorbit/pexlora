"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { authCopy } from "@/content/auth";
import { emailSchema } from "@/lib/validations/auth";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";

type EmailStepProps = { defaultEmail: string; onContinue: (email: string) => void };

export function EmailStep({ defaultEmail, onContinue }: EmailStepProps) {
  const [error, setError] = useState<string | null>(null);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = emailSchema.safeParse(String(new FormData(event.currentTarget).get("email") ?? ""));
    if (!parsed.success) return setError(authCopy.entry.invalidEmail);
    setError(null);
    onContinue(parsed.data);
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-2.5" noValidate>
      <FormField
        name="email"
        type="email"
        label={authCopy.entry.emailLabel}
        labelPosition="above"
        autoComplete="email"
        placeholder="you@example.com"
        defaultValue={defaultEmail}
        errors={error ? [error] : undefined}
        className="border-border-strong focus:ring-accent-soft sm:h-12.5"
        autoFocus={Boolean(defaultEmail)}
        required
      />
      <Button type="submit" size="xl" className="h-12 w-full sm:h-12.5">
        {authCopy.entry.continue}
        <ArrowRight className="size-4.5" aria-hidden />
      </Button>
    </form>
  );
}
