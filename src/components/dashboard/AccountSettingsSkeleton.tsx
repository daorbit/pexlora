import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

function RowSkeleton() {
  return (
    <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3.5 w-28" />
        <Skeleton className="h-3 w-44" />
      </div>
      <Skeleton className="h-8 w-24 rounded-xl" />
    </div>
  );
}

function PanelSkeleton({ rows, profile = false }: { rows: number; profile?: boolean }) {
  return (
    <Card aria-hidden className="overflow-hidden">
      <div className="flex flex-col gap-2 border-b border-separator px-5 py-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-52" />
      </div>
      <div className="divide-y divide-separator">
        {profile && (
          <div className="flex items-center gap-4 px-5 py-5">
            <Skeleton className="size-16 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
        )}
        {Array.from({ length: rows }, (_, index) => (
          <RowSkeleton key={index} />
        ))}
      </div>
    </Card>
  );
}

export function AccountSettingsSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <PanelSkeleton profile rows={2} />
      <PanelSkeleton rows={2} />
      <PanelSkeleton rows={3} />
      <PanelSkeleton rows={1} />
      <PanelSkeleton rows={1} />
    </div>
  );
}
