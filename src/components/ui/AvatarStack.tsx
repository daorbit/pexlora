import { cn } from "@/lib/utils/cn";
import { PersonAvatar } from "@/components/ui/PersonAvatar";

type AvatarStackProps = {
  srcs: string[];
  size?: "xs" | "sm";
  className?: string;
};

export function AvatarStack({ srcs, size = "sm", className }: AvatarStackProps) {
  return (
    <span aria-hidden className={cn("flex shrink-0 items-center", className)}>
      {srcs.map((src) => (
        <PersonAvatar
          key={src}
          src={src}
          size={size}
          className={cn("ring-2 ring-background first:ml-0", size === "xs" ? "-ml-1.5" : "-ml-2")}
        />
      ))}
    </span>
  );
}
