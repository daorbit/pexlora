import { Skeleton } from "@/components/ui/Skeleton";
import { postGridClass } from "@/components/blog/PostGrid";

export function BlogIndexSkeleton() {
  return (
    <div aria-hidden className="flex flex-col gap-8 sm:gap-12">
      <div className="flex flex-col gap-3 sm:gap-6">
        <Skeleton className="aspect-[16/9] w-full rounded-2xl sm:rounded-3xl" />
        <Skeleton className="h-8 w-3/4 rounded-xl sm:h-10 lg:w-1/2" />
      </div>
      <div className={postGridClass}>
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="flex flex-col gap-2 sm:gap-3">
            <Skeleton className="aspect-[40/21] rounded-xl sm:rounded-[14px]" />
            <Skeleton className="h-4 w-4/5 sm:h-5" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PostSkeleton() {
  return (
    <div aria-hidden className="flex flex-col gap-8 py-8 sm:gap-12 sm:py-14">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 px-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-10 w-2/3 rounded-xl" />
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Skeleton className="aspect-[16/9] w-full rounded-3xl" />
      </div>
    </div>
  );
}
