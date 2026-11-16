import { steps, stepsCopy } from "@/content/landing";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";

export function StepsSection() {
  return (
    <Section
      id="how-it-works"
      tone="surface"
      align="left"
      eyebrow={stepsCopy.eyebrow}
      title={stepsCopy.title}
      description={stepsCopy.description}
    >
      <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {steps.map((step) => (
          <li
            key={step.title}
            className={cn(
              "flex min-w-0 flex-col gap-6 rounded-3xl p-6 sm:p-7",
              step.highlight ? "bg-primary text-primary-foreground" : "bg-background",
            )}
          >
            <span
              className={cn(
                "w-fit rounded-full px-3 py-1 font-mono text-[12.5px]",
                step.highlight ? "bg-ink text-primary dark:bg-primary-foreground" : "bg-surface",
              )}
            >
              {step.label}
            </span>
            <ul className="flex flex-col gap-2" aria-hidden>
              {step.rows.map((row) => (
                <li
                  key={row.name}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 font-mono text-[13px]",
                    step.highlight ? "bg-white/60" : "bg-surface",
                  )}
                >
                  <span className="truncate">{row.name}</span>
                  {row.badge ? (
                    <Badge tone={row.badge.tone} className="font-sans font-semibold">
                      {row.badge.label}
                    </Badge>
                  ) : (
                    <span className={step.highlight ? undefined : "text-tertiary"}>{row.meta}</span>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-[19px] font-semibold tracking-[-0.015em]">{step.title}</h3>
              <p className={cn("text-[15px] leading-relaxed", step.highlight ? "opacity-80" : "text-secondary")}>
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
