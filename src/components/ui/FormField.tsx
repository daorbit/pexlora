"use client";

import { useState, type ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

type FormFieldProps = Omit<ComponentProps<"input">, "placeholder"> & {
  label: string;
  name: string;
  errors?: string[];
  labelPosition?: "inside" | "above";
  placeholder?: string;
};

export function FormField({
  label,
  name,
  errors,
  type = "text",
  labelPosition = "inside",
  placeholder,
  className,
  ...props
}: FormFieldProps) {
  const [revealed, setRevealed] = useState(false);
  const errorId = `${name}-error`;
  const hasError = Boolean(errors?.length);
  const isPassword = type === "password";
  const above = labelPosition === "above";

  return (
    <div className={cn("flex flex-col", above ? "gap-1 lg:gap-1.5" : "gap-1.5")}>
      {above && (
        <label htmlFor={name} className="text-xs font-semibold lg:text-[13px]">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={name}
          name={name}
          type={isPassword && revealed ? "text" : type}
          placeholder={above ? placeholder : " "}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={cn(
            "peer w-full rounded-xl border border-separator bg-surface outline-none transition-shadow placeholder:text-tertiary hover:border-border-strong focus:border-foreground focus:ring-4 focus:ring-foreground/10",
            above ? "h-11 px-3.5 text-[15px] lg:h-12" : "h-[58px] px-4 pt-[22px] pb-2 text-[15.5px]",
            isPassword && "pr-16",
            hasError && "border-danger focus:border-danger focus:ring-danger/15",
            className,
          )}
          {...props}
        />
        {!above && (
          <label
            htmlFor={name}
            className="pointer-events-none absolute top-[17px] left-[17px] -translate-y-1/2 text-[12px] text-secondary transition-all duration-150 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-[15.5px] peer-focus:top-[17px] peer-focus:text-[12px]"
          >
            {label}
          </label>
        )}
        {isPassword && (
          <button
            type="button"
            onClick={() => setRevealed((value) => !value)}
            aria-label={revealed ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-lg px-2 py-1.5 text-[12.5px] font-medium text-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            {revealed ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {hasError && (
        <ul id={errorId} className="flex flex-col gap-0.5 px-1 text-xs text-danger">
          {errors!.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
