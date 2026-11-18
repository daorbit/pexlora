import { blogCopy } from "@/content/blog";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Highlight } from "@/components/ui/Highlight";

export function BlogHeader() {
  return (
    <header className="flex flex-col gap-3 sm:gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
      <div className="flex flex-col items-start gap-3 sm:gap-4">
        <Eyebrow>{blogCopy.eyebrow}</Eyebrow>
        <h1 className="max-w-3xl text-[30px] leading-[1.08] font-bold tracking-[-0.035em] motion-safe:animate-fade-up sm:text-[56px] sm:leading-[1.05]">
          {blogCopy.headline} <Highlight>{blogCopy.headlineMarker}</Highlight>
        </h1>
      </div>
      <p className="max-w-sm text-[15px] leading-relaxed text-secondary motion-safe:animate-fade-up motion-safe:[animation-delay:80ms] max-sm:hidden sm:text-base">
        {blogCopy.lead}
      </p>
    </header>
  );
}
