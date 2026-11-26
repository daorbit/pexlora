"use client";

import { Checkbox } from "@/components/ui/Checkbox";

type CheckboxOptionProps = {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
};

export function CheckboxOption(props: CheckboxOptionProps) {
  return <Checkbox {...props} />;
}
