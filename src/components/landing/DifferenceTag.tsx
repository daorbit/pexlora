import type { ComponentType, SVGProps } from "react";
import { CalendarDays, Camera, Hash, MapPin, MessageSquareText, Smartphone, UserRound } from "lucide-react";
import type { DifferenceTagIcon, FeedTone } from "@/content/landing";
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

const iconTones: Record<FeedTone, string> = {
  location: "text-danger",
  ai: "text-warning",
  plain: "text-white/70",
};

export const photoChipClass =
  "inline-flex max-w-full items-center gap-1.5 rounded-md bg-black/55 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm";

export function DifferenceTag({ icon, value, tone }: { icon: DifferenceTagIcon; value: string; tone: FeedTone }) {
  const Icon = icons[icon];
  return (
    <li className={photoChipClass}>
      <Icon className={cn("size-3.5 shrink-0", iconTones[tone])} aria-hidden />
      <span className="truncate font-mono" translate="no">
        {value}
      </span>
    </li>
  );
}
