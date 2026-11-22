import { Zap } from "lucide-react";

type CountProofProps = {
  count: string;
  label: string;
};

export function CountProof({ count, label }: CountProofProps) {
  return (
    <p className="flex items-center gap-1.5">
      <Zap className="size-4 fill-current text-accent-text" strokeWidth={2} aria-hidden />
      <span className="font-semibold text-foreground">{count}</span>
      {label}
    </p>
  );
}
