import Image from "next/image";
import Link from "next/link";
import { brandAssets } from "@/config/brand";
import { routes, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

type Size = "sm" | "md" | "lg";

const sizes: Record<Size, { text: string; mark: string; pixels: number }> = {
  sm: { text: "gap-2 text-[15px]", mark: "size-[22px]", pixels: 22 },
  md: { text: "gap-2 text-[19px] sm:gap-2.5 sm:text-[21px]", mark: "size-7 sm:size-8", pixels: 32 },
  lg: { text: "gap-3 text-[26px]", mark: "size-9", pixels: 36 },
};

export function Logo({ size = "md" }: { size?: Size }) {
  const { text, mark, pixels } = sizes[size];

  return (
    <Link
      href={routes.home}
      className={cn("inline-flex items-center font-display font-semibold tracking-[-0.02em]", text)}
    >
      <Image src={brandAssets.mark} alt="" width={pixels} height={pixels} priority className={mark} />
      {siteConfig.name}
    </Link>
  );
}
