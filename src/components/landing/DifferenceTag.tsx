import type { ComponentType, SVGProps } from "react";
import { CalendarDays, Camera, Hash, MapPin, MessageSquareText, Smartphone, UserRound } from "lucide-react";
import { differenceCopy, type DifferenceTagData, type DifferenceTagIcon, type FeedTone } from "@/content/landing";
import { cn } from "@/lib/utils/cn";
import { AiTagIcon } from "@/components/icons/AiTagIcon";

const icons: Record<DifferenceTagIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  location: MapPin,
  device: Smartphone,
  camera: Camera,
  date: CalendarDays,
  ai: AiTagIcon,
  prompt: MessageSquareText,
  author: UserRound,
  serial: Hash,
};

const valueTones: Record<FeedTone, string> = {
  location: "text-danger",
  ai: "text-warning",
  plain: "text-foreground",
};

const borderTones: Record<FeedTone, string> = {
  location: "border-danger/35",
  ai: "border-warning/35",
  plain: "border-separator",
};

export function DifferenceTag({ tag, removed }: { tag: DifferenceTagData; removed?: boolean }) {
  const Icon = icons[tag.icon];

  return (
    <li
      className={cn(
        "flex items-center gap-3 rounded-xl border px-3.5 py-2.5 sm:py-3",
        removed ? "border-dashed border-border-strong" : cn("bg-surface", borderTones[tag.tone]),
      )}
    >
      <Icon className={cn("size-4 shrink-0", removed ? "text-tertiary" : valueTones[tag.tone])} aria-hidden />
      <span className="flex min-w-0 flex-col gap-0.5 font-mono">
        <span className={cn("text-[11.5px] text-tertiary", removed && "line-through")}>{tag.label}</span>
        <span translate="no" className={cn("notranslate truncate text-sm", removed ? "text-secondary" : valueTones[tag.tone])}>
          {removed ? differenceCopy.removed : tag.value}
        </span>
      </span>
    </li>
  );
}
