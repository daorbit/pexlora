"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  disabled?: boolean;
  className?: string;
};

export function SearchInput({ value, onChange, label, disabled, className }: SearchInputProps) {
  return (
    <label
      className={cn(
        "flex h-10 min-w-0 items-center gap-2 rounded-xl border border-separator bg-surface px-3 focus-within:outline-2 focus-within:outline-ring",
        disabled && "opacity-60",
        className,
      )}
    >
      <Search className="size-4 shrink-0 text-tertiary" aria-hidden />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={label}
        aria-label={label}
        disabled={disabled}
        className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-tertiary"
      />
    </label>
  );
}
