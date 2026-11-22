import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { changelogCopy, type ChangelogEntry, type ChangeType } from "@/content/changelog";
import { cn } from "@/lib/utils/cn";
import { formatDate } from "@/lib/utils/format-date";
import { Badge } from "@/components/ui/Badge";
import { textLinkClass } from "@/components/ui/text-link-styles";

const typeTones: Record<ChangeType, "accent" | "neutral" | "success"> = {
  new: "accent",
  improved: "neutral",
  fixed: "success",
};

export function ChangelogEntryCard({ entry }: { entry: ChangelogEntry }) {
  return (
    <article
      id={entry.date}
      className="grid scroll-mt-24 grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-10"
    >
      <time dateTime={entry.date} className="pt-1 font-mono text-[13px] text-tertiary lg:sticky lg:top-24 lg:self-start">
        {formatDate(entry.date, "long")}
      </time>
      <div className="flex flex-col gap-4 rounded-3xl border border-separator bg-surface p-5 sm:p-6">
        <h2 className="text-lg font-semibold tracking-[-0.015em] sm:text-xl">{entry.title}</h2>
        <ul className="flex flex-col gap-3">
          {entry.changes.map((change) => (
            <li key={change.text} className="flex flex-col items-start gap-2 sm:flex-row sm:gap-3">
              <Badge tone={typeTones[change.type]} className="mt-0.5 w-20 shrink-0 justify-center">
                {changelogCopy.types[change.type]}
              </Badge>
              <p className="text-[14.5px] leading-relaxed text-secondary sm:text-[15px]">
                {change.text}
                {change.href && (
                  <>
                    {" "}
                    <Link
                      href={change.href}
                      aria-label={`${changelogCopy.open}: ${change.text}`}
                      className={cn(textLinkClass, "gap-1 text-[14px]")}
                    >
                      {changelogCopy.open}
                      <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  </>
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
