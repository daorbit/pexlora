import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type SectionProps = Omit<ComponentProps<"section">, "title"> & {
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  narrow?: boolean;
  align?: "center" | "left";
  tone?: "page" | "surface";
};

export function Section({
  eyebrow,
  title,
  description,
  narrow,
  align = "center",
  tone = "page",
  className,
  children,
  ...props
}: SectionProps) {
  const centered = align === "center";

  return (
    <section
      className={cn(
        "scroll-mt-20 py-16 sm:py-22",
        tone === "surface" &&
          "bg-[linear-gradient(to_bottom,var(--background),var(--surface)_120px,var(--surface)_calc(100%-120px),var(--background))]",
        className,
      )}
      {...props}
    >
      <Container size={narrow ? "narrow" : "wide"} className="reveal flex flex-col gap-12 sm:gap-14">
        {title && (
          <div className={cn("flex flex-wrap items-end justify-between gap-6", centered && "justify-center")}>
            <SectionHeading eyebrow={eyebrow} title={title} centered={centered} description={centered ? description : undefined} />
            {description && !centered && (
              <p className="max-w-sm text-base leading-relaxed text-secondary">{description}</p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
