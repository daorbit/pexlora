import { Container } from "@/components/ui/Container";

export function PageIntroSkeleton() {
  return (
    <section aria-hidden className="py-12 sm:py-16">
      <Container size="narrow" className="flex flex-col items-center gap-10">
        <div className="flex w-full flex-col items-center gap-4">
          <span className="size-16 rounded-2xl bg-fill motion-safe:animate-pulse" />
          <span className="h-10 w-3/4 max-w-lg rounded-xl bg-fill motion-safe:animate-pulse" />
          <span className="h-5 w-2/3 max-w-md rounded-lg bg-fill motion-safe:animate-pulse" />
        </div>
        <span className="h-80 w-full rounded-3xl bg-fill motion-safe:animate-pulse" />
      </Container>
    </section>
  );
}
