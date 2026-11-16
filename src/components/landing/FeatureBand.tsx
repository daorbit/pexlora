import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { Band } from "@/components/ui/Band";
import { BandEyebrow } from "@/components/landing/BandEyebrow";
import { BandText } from "@/components/landing/BandText";
import { BandTitle } from "@/components/landing/BandTitle";

type FeatureBandProps = Pick<ComponentProps<typeof Band>, "id" | "tone"> & {
  eyebrow: string;
  eyebrowClassName: string;
  visual: ReactNode;
  title: string;
  description: string;
  link: { label: string; href: string };
};

export function FeatureBand({ id, tone, eyebrow, eyebrowClassName, visual, title, description, link }: FeatureBandProps) {
  return (
    <Band id={id} tone={tone} containerClassName="flex flex-col gap-6 sm:gap-10 lg:gap-14">
      <BandEyebrow className={eyebrowClassName}>{eyebrow}</BandEyebrow>
      {visual}
      <div className="grid grid-cols-1 items-end gap-3 sm:gap-6 lg:grid-cols-2 lg:gap-12">
        <BandTitle size="md">{title}</BandTitle>
        <div className="flex flex-col items-start gap-3 sm:gap-4.5">
          <BandText>{description}</BandText>
          <Link
            href={link.href}
            className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-accent-text underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:text-base"
          >
            {link.label}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} aria-hidden />
          </Link>
        </div>
      </div>
    </Band>
  );
}
