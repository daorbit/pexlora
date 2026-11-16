import { ArrowRight } from "lucide-react";
import type { Conversion } from "@/config/conversions";
import { optionsCopy } from "@/content/workspace";
import { OptionGroup } from "@/components/workspace/options/OptionsBar";

export function ConversionSummary({ conversion }: { conversion: Conversion }) {
  return (
    <OptionGroup label={optionsCopy.conversion}>
      <div className="flex items-center gap-2.5 rounded-2xl bg-primary px-4 py-3.5 text-primary-foreground">
        <span className="text-base font-bold">{conversion.from}</span>
        <ArrowRight className="size-4" aria-hidden />
        <span className="text-base font-bold">{conversion.toLabel}</span>
      </div>
    </OptionGroup>
  );
}
