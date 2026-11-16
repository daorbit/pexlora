import { authCopy } from "@/content/auth";
import { featureBands } from "@/content/landing";
import { cn } from "@/lib/utils/cn";
import { StrikeText } from "@/components/ui/StrikeText";
import { Logo } from "@/components/layout/Logo";
import { MetadataFeedRows } from "@/components/landing/MetadataTicker";

function StageHeadline({ className }: { className?: string }) {
  return (
    <p className={cn("font-extrabold tracking-[-0.05em]", className)}>
      <span className="block">{authCopy.stage.headline}</span>
      <span className="mt-[0.12em] inline-block rounded-[0.18em] bg-primary px-[0.12em] pb-[0.04em] text-primary-foreground">
        {authCopy.stage.highlight}
      </span>
    </p>
  );
}

function StageEyebrow() {
  return <span className="font-mono text-[11px] text-danger lg:text-[13px]">{authCopy.stage.eyebrow}</span>;
}

export function AuthStage() {
  const rowClassName = "py-2.25 text-[13px]";

  return (
    <section className="theme-dark relative hidden flex-col justify-between overflow-hidden rounded-[28px] bg-background p-10 text-foreground lg:flex xl:p-11">
      <Logo size="md" />
      <div className="flex flex-col gap-7">
        <StageEyebrow />
        <StrikeText
          text={featureBands.location.value}
          className="font-mono text-[40px] leading-none tracking-[-0.06em] xl:text-[50px]"
        />
        <StageHeadline className="max-w-130 text-[48px] leading-[0.98] xl:text-[58px]" />
      </div>
      <div className="fade-y relative h-37.5 overflow-hidden font-mono" aria-hidden>
        <div className="motion-safe:animate-ticker-y motion-safe:[animation-duration:18s]">
          <MetadataFeedRows rowClassName={rowClassName} valueClassName="text-secondary" />
          <MetadataFeedRows rowClassName={rowClassName} valueClassName="text-secondary" hidden />
        </div>
      </div>
    </section>
  );
}

export function AuthStageCompact() {
  return (
    <div className="theme-dark flex flex-col gap-2.5 rounded-[20px] bg-background p-4.5 text-foreground lg:hidden">
      <StageEyebrow />
      <StrikeText text={featureBands.location.value} className="font-mono text-[19px] leading-none tracking-[-0.05em]" />
      <StageHeadline className="text-[22px] leading-[1.05] tracking-[-0.04em]" />
    </div>
  );
}
