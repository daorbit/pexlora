import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { initials } from "@/lib/utils/initials";

type Size = "xs" | "sm" | "md" | "lg";

const sizes: Record<Size, { pixels: number; className: string }> = {
  xs: { pixels: 28, className: "size-7 text-[11px]" },
  sm: { pixels: 32, className: "size-8 text-xs" },
  md: { pixels: 36, className: "size-9 text-xs" },
  lg: { pixels: 64, className: "size-16 text-lg" },
};

type UserAvatarProps = {
  name: string;
  avatarUrl?: string;
  size?: Size;
  className?: string;
};

export function UserAvatar({ name, avatarUrl, size = "sm", className }: UserAvatarProps) {
  const { pixels, className: sizeClass } = sizes[size];
  const classes = cn("shrink-0 rounded-full border border-separator", sizeClass, className);

  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt={name}
        width={pixels}
        height={pixels}
        unoptimized
        referrerPolicy="no-referrer"
        className={classes}
      />
    );
  }

  return (
    <span title={name} className={cn(classes, "inline-flex items-center justify-center bg-fill font-semibold")}>
      {initials(name)}
    </span>
  );
}
