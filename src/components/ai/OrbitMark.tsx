import Image from "next/image";
import { brandAssets } from "@/config/brand";
import { cn } from "@/lib/utils/cn";

type OrbitMarkProps = { size?: number; className?: string };

export function OrbitMark({ size = 20, className }: OrbitMarkProps) {
  const shared = cn("shrink-0 object-contain", className);
  return (
    <>
      <Image src={brandAssets.orbitLight} alt="" aria-hidden width={size} height={size} className={cn("block dark:hidden", shared)} />
      <Image src={brandAssets.orbitDark} alt="" aria-hidden width={size} height={size} className={cn("hidden dark:block", shared)} />
    </>
  );
}
