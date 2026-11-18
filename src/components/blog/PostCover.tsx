import Image from "next/image";
import { brandAssets } from "@/config/brand";
import { cn } from "@/lib/utils/cn";
import type { CmsImage } from "@/lib/blog/types";

type PostCoverProps = {
  image: CmsImage;
  title: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function PostCover({ image, title, sizes, priority, className }: PostCoverProps) {
  return (
    <div className={cn("relative overflow-hidden bg-fill", className)}>
      {image.url ? (
        <Image
          src={image.url}
          alt={image.alt || title}
          fill
          unoptimized
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div aria-hidden className="tone-lime tile-tint flex size-full items-center justify-center">
          <Image src={brandAssets.mark} alt="" width={44} height={44} className="opacity-80" />
        </div>
      )}
    </div>
  );
}
