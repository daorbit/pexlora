"use client";

type CheckboxOptionProps = {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
};

export function CheckboxOption({ label, checked, disabled, onChange }: CheckboxOptionProps) {
  return (
    <label className="inline-flex items-center gap-2 text-[13px] font-medium text-secondary">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 cursor-pointer accent-foreground disabled:cursor-not-allowed"
      />
      {label}
    </label>
  );
}
