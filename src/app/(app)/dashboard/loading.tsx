import { Skeleton } from "@/components/ui/Skeleton";

export default function DashboardLoading() {
  return (
    <div aria-busy="true" className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-72 rounded-[22px] sm:h-96" />
        <Skeleton className="h-24 rounded-[22px]" />
      </div>
      <Skeleton className="h-80 rounded-[22px]" />
    </div>
  );
}
