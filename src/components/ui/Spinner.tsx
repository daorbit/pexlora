import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function Spinner({ className }: { className?: string }) {
  return <LoaderCircle className={cn("size-4 shrink-0 motion-safe:animate-spin", className)} aria-hidden />;
}
