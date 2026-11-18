import Image from "next/image";
import { brandAssets } from "@/config/brand";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";
import { UserAvatar } from "@/components/ui/UserAvatar";

type PostAuthorAvatarProps = { name: string; size?: "sm" | "md" };

const brandSizes = {
  sm: { box: "size-8", mark: 20 },
  md: { box: "size-9", mark: 22 },
};

export function PostAuthorAvatar({ name, size = "sm" }: PostAuthorAvatarProps) {
  if (name !== siteConfig.name) return <UserAvatar name={name} size={size} />;

  const { box, mark } = brandSizes[size];
  return (
    <span className={cn("inline-flex shrink-0 items-center justify-center rounded-full border border-separator bg-surface", box)}>
      <Image src={brandAssets.mark} alt={siteConfig.name} width={mark} height={mark} />
    </span>
  );
}
