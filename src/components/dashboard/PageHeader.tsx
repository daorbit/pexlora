import { Skeleton } from "@/components/ui/Skeleton";

export function PageHeaderFallback() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-8 w-56" />
      <Skeleton className="h-5 w-80 max-w-full" />
    </div>
  );
}
