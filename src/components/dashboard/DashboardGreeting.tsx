import { ArrowRight } from "lucide-react";
import { routes } from "@/config/site";
import { memberCopy } from "@/content/pricing";
import { requireUser } from "@/lib/auth/dal";
import { ButtonLink } from "@/components/ui/Button";
import { Highlight } from "@/components/ui/Highlight";
import { DayGreeting } from "@/components/dashboard/DayGreeting";
import { ProBadge } from "@/components/plan/ProBadge";

export async function DashboardGreeting() {
  const user = await requireUser();
  const firstName = user.name.split(" ")[0];

  return (
    <section className="theme-dark flex h-full flex-col justify-between gap-4 rounded-[22px] bg-brand-surface p-4 text-brand-foreground sm:gap-8 sm:rounded-3xl sm:p-8">
      <div className="flex flex-col gap-2.5 sm:gap-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <p className="flex items-center gap-3 text-[10.5px] font-medium tracking-[0.2em] text-secondary uppercase sm:text-xs sm:tracking-[0.24em]">
            <DayGreeting />
            <span className="h-px w-10 bg-accent max-sm:hidden" aria-hidden />
          </p>
          {user.plan && (
            <ProBadge plan={user.plan} label={memberCopy.member} href={routes.pricing} className="px-1.5 py-0.5 text-[11px] sm:px-2 sm:py-1 sm:text-xs" />
          )}
        </div>
        <h2 className="max-w-lg text-[21px] leading-[1.15] font-bold tracking-[-0.03em] sm:text-[38px] sm:leading-[1.1] sm:tracking-[-0.035em]">
          What are we cleaning today, <Highlight>{firstName}?</Highlight>
        </h2>
      </div>
      <ButtonLink href={routes.dashboardCleaner} size="lg" className="self-start max-sm:h-9 max-sm:gap-1.5 max-sm:rounded-lg max-sm:px-3.5 max-sm:text-[13px]">
        Clean an Image
        <ArrowRight className="size-3.5 sm:size-4" aria-hidden />
      </ButtonLink>
    </section>
  );
}
