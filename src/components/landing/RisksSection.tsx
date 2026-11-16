import { risks, risksCopy } from "@/content/landing";
import { cn } from "@/lib/utils/cn";
import { Section } from "@/components/ui/Section";

const chipTones: Record<string, string> = {
  location: "bg-danger-soft text-danger",
  ai: "bg-warning-soft text-warning",
};

export function RisksSection() {
  return (
    <Section id="why" align="left" eyebrow={risksCopy.eyebrow} title={risksCopy.title} description={risksCopy.description}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {risks.map((risk) => (
          <article key={risk.id} className="flex min-w-0 flex-col gap-5 rounded-3xl border border-separator bg-surface p-6 sm:p-7">
            <span
              className={cn(
                "w-fit max-w-full rounded-[10px] px-3 py-1.5 font-mono text-[12.5px] break-words",
                chipTones[risk.id] ?? "bg-background text-foreground",
              )}
            >
              {risk.sample.label} {risk.sample.value}
            </span>
            <h3 className="text-lg leading-snug font-semibold tracking-[-0.015em]">{risk.title}</h3>
            <p className="text-[15px] leading-relaxed text-secondary">{risk.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
