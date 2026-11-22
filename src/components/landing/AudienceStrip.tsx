import { testimonialsCopy } from "@/content/social-proof";

export function AudienceStrip() {
  return (
    <div className="flex flex-col gap-3 border-t border-border-strong pt-5 sm:flex-row sm:items-center sm:gap-5 sm:pt-8">
      <p className="font-mono text-xs text-tertiary sm:text-[13px]">{testimonialsCopy.audienceLabel}</p>
      <ul className="flex flex-wrap gap-2">
        {testimonialsCopy.audience.map((group) => (
          <li key={group} className="rounded-md bg-surface px-3 py-1.5 text-[13px] font-semibold sm:px-3.5 sm:py-2 sm:text-sm">
            {group}
          </li>
        ))}
      </ul>
    </div>
  );
}
