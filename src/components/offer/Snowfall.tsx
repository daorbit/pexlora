import { Snowflake } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const flakes = [
  "left-[3%] [--snow-delay:-1s] [--snow-time:7s]",
  "left-[9%] [--snow-delay:-5s] [--snow-time:9s] [--snow-drift:-10px]",
  "left-[16%] [--snow-delay:-3s] [--snow-time:6s] max-sm:hidden",
  "left-[23%] [--snow-delay:-7s] [--snow-time:8s]",
  "left-[30%] [--snow-delay:-2s] [--snow-time:10s] [--snow-drift:-12px] max-sm:hidden",
  "left-[37%] [--snow-delay:-6s] [--snow-time:7s]",
  "left-[44%] [--snow-delay:-4s] [--snow-time:9s] max-sm:hidden",
  "left-[51%] [--snow-delay:-8s] [--snow-time:8s] [--snow-drift:-8px]",
  "left-[58%] [--snow-delay:-1.5s] [--snow-time:6.5s] max-sm:hidden",
  "left-[65%] [--snow-delay:-5.5s] [--snow-time:9.5s]",
  "left-[72%] [--snow-delay:-3.5s] [--snow-time:7.5s] [--snow-drift:-10px] max-sm:hidden",
  "left-[79%] [--snow-delay:-7.5s] [--snow-time:8.5s]",
  "left-[86%] [--snow-delay:-2.5s] [--snow-time:6.5s] max-sm:hidden",
  "left-[93%] [--snow-delay:-6.5s] [--snow-time:9s] [--snow-drift:-12px]",
];

const flakeSizes = {
  small: ["size-1", "size-0.5", "size-0.75"],
  large: ["size-2", "size-1.5", "size-2.5"],
};

const LARGE_CRYSTAL_EVERY = 3;

type SnowfallProps = { size?: keyof typeof flakeSizes; className?: string };

export function Snowfall({ size = "small", className }: SnowfallProps) {
  const sizes = flakeSizes[size];

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {flakes.map((flake, index) => (
        <span key={flake} className={cn("absolute inset-y-0 motion-safe:animate-snow-fall motion-reduce:hidden", flake)}>
          {size === "large" && index % LARGE_CRYSTAL_EVERY === 0 ? (
            <Snowflake className="size-5" strokeWidth={2} />
          ) : (
            <span className={cn("block rounded-full bg-current", sizes[index % sizes.length])} />
          )}
        </span>
      ))}
    </div>
  );
}
