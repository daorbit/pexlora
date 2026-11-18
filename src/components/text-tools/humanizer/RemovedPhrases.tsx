import { humanizerCopy } from "@/content/ai";
import { cn } from "@/lib/utils/cn";

const delays = ["", "motion-safe:[animation-delay:120ms]", "motion-safe:[animation-delay:240ms]", "motion-safe:[animation-delay:360ms]"];

export function RemovedPhrases({ phrases }: { phrases: string[] }) {
  if (!phrases.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold">{humanizerCopy.removedTitle}</p>
      <ul className="flex flex-wrap gap-1.5">
        {phrases.map((phrase, index) => (
          <li key={phrase} className="rounded-md bg-warning-soft px-2 py-1 text-[13px] text-warning">
            <span className="relative">
              {phrase}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 top-1/2 h-0.5 origin-left rounded-full bg-warning motion-safe:animate-strike-in",
                  delays[index % delays.length],
                )}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
