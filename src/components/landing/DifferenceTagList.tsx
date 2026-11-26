import type { DifferenceTagData } from "@/content/landing";
import { cn } from "@/lib/utils/cn";
import { DifferenceTag } from "@/components/landing/DifferenceTag";

type DifferenceTagListProps = {
  title: string;
  tags: DifferenceTagData[];
  removed?: boolean;
  className?: string;
};

export function DifferenceTagList({ title, tags, removed, className }: DifferenceTagListProps) {
  return (
    <div className={cn("flex w-full flex-col gap-2.5", className)}>
      <p className="font-mono text-xs text-tertiary">{title}</p>
      <ul className="flex flex-col gap-2 sm:gap-2.5">
        {tags.map((tag) => (
          <DifferenceTag key={tag.label} tag={tag} removed={removed} />
        ))}
      </ul>
    </div>
  );
}
