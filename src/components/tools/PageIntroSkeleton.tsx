import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export function PageIntroSkeleton() {
  return (
    <section aria-hidden className="py-12 sm:py-16">
      <Container size="narrow" className="flex flex-col items-center gap-10">
        <div className="flex w-full flex-col items-center gap-4">
          <Skeleton className="size-16 rounded-2xl" />
          <Skeleton className="h-10 w-3/4 max-w-lg rounded-xl" />
          <Skeleton className="h-5 w-2/3 max-w-md" />
        </div>
        <Skeleton className="h-80 w-full rounded-3xl" />
      </Container>
    </section>
  );
}
