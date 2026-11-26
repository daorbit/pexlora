import { steps } from "@/content/landing";
import { cn } from "@/lib/utils/cn";
import { numeral, outlineNumeralClass } from "@/components/ui/outline-numeral-styles";

export function StepsTrack() {
  const last = steps.length - 1;

  return (
    <ol className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3 md:gap-0">
      {steps.map((step, index) => {
        const current = index === last;
        return (
          <li key={step.title} className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-4 sm:grid-cols-[5rem_minmax(0,1fr)] md:flex md:flex-col md:gap-4">
            <span
              aria-hidden
              className={cn(
                "text-[44px] leading-none font-extrabold tracking-[-0.06em] sm:text-[64px] lg:text-[112px]",
                current ? "text-foreground" : outlineNumeralClass,
              )}
            >
              {numeral(index)}
            </span>
            <span aria-hidden className="hidden items-center md:flex">
              <span
                className={cn(
                  "size-3.5 shrink-0 rounded-full",
                  current ? "bg-primary outline-1 outline-offset-4 outline-foreground" : "bg-foreground",
                )}
              />
              <span className={cn("h-0.5 flex-1", current ? "ml-3 bg-border-strong" : "bg-foreground")} />
            </span>
            <div className="flex min-w-0 flex-col gap-1.5 pt-1 sm:pt-2 md:gap-2 md:pt-0 md:pr-10">
              <h3 className="text-xl font-semibold tracking-[-0.028em] sm:text-2xl lg:text-[28px]">{step.title}</h3>
              <p className="text-[15px] leading-relaxed text-secondary sm:text-base">{step.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
