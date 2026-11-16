import Image from "next/image";
import type { QueueItem } from "@/hooks/useFileQueue";

export function FileThumb({ item }: { item: QueueItem }) {
  if (item.previewUrl) {
    return (
      <Image
        src={item.previewUrl}
        alt=""
        width={88}
        height={88}
        unoptimized
        className="size-16 shrink-0 rounded-xl bg-fill object-cover sm:size-22"
      />
    );
  }

  const Icon = item.format.icon;
  return (
    <span className="inline-flex size-16 shrink-0 items-center justify-center rounded-xl bg-fill text-secondary sm:size-22">
      <Icon className="size-6 sm:size-7" strokeWidth={1.75} aria-hidden />
    </span>
  );
}
