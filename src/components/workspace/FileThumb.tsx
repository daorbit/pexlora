import Image from "next/image";
import type { QueueItem } from "@/hooks/useFileQueue";

export function FileThumb({ item }: { item: QueueItem }) {
  if (item.previewUrl) {
    return (
      <Image
        src={item.previewUrl}
        alt=""
        width={44}
        height={44}
        unoptimized
        className="size-11 shrink-0 rounded-lg bg-fill object-cover"
      />
    );
  }

  const Icon = item.format.icon;
  return (
    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-fill text-secondary">
      <Icon className="size-5" strokeWidth={1.75} aria-hidden />
    </span>
  );
}
