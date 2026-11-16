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
    <section className="theme-dark flex h-full flex-col justify-between gap-8 rounded-3xl bg-brand-surface p-6 text-brand-foreground sm:p-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.24em] text-secondary">
            <DayGreeting />
            <span className="h-px w-10 bg-accent" aria-hidden />
          </p>
          {user.plan && <ProBadge plan={user.plan} label={memberCopy.member} className="px-2 py-1 text-xs" />}
        </div>
        <h2 className="max-w-lg text-[28px] font-bold leading-[1.1] tracking-[-0.035em] sm:text-[38px]">
          What are we cleaning today, <Highlight>{firstName}?</Highlight>
        </h2>
      </div>
      <ButtonLink href={routes.dashboardCleaner} size="lg" className="self-start">
        Clean an Image
        <ArrowRight className="size-4" aria-hidden />
      </ButtonLink>
    </section>
  );
}
