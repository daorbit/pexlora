import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/ui/Container";

type Tone = "ink" | "pearl";

const tones: Record<Tone, string> = {
  ink: "theme-dark",
  pearl: "theme-light",
};

type BandProps = ComponentProps<"section"> & {
  tone: Tone;
  containerClassName?: string;
  after?: ReactNode;
};

export function Band({ tone, className, containerClassName, after, children, ...props }: BandProps) {
  return (
    <section
      className={cn(tones[tone], "scroll-mt-16 bg-background py-20 text-foreground lg:py-35", className)}
      {...props}
    >
      <Container size="stage" className={cn("reveal", containerClassName)}>
        {children}
      </Container>
      {after}
    </section>
  );
}
