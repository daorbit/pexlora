import { ArrowRight } from "lucide-react";
import type { Conversion } from "@/config/conversions";

export function ConversionPair({ conversion }: { conversion: Conversion }) {
  return (
    <span
      translate="no"
      className="notranslate inline-flex items-center gap-2 rounded-xl bg-primary px-3.5 py-1.5 text-[15px] font-bold text-primary-foreground"
    >
      {conversion.from}
      <ArrowRight className="size-4" aria-label="to" />
      {conversion.toLabel}
    </span>
  );
}
