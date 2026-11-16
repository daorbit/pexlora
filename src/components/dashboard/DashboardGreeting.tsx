import { ArrowRight } from "lucide-react";
import { routes } from "@/config/site";
import { requireUser } from "@/lib/auth/dal";
import { ButtonLink } from "@/components/ui/Button";
import { Highlight } from "@/components/ui/Highlight";
import { DayGreeting } from "@/components/dashboard/DayGreeting";

export async function DashboardGreeting() {
  const user = await requireUser();
  const firstName = user.name.split(" ")[0];

  return (
    <section className="theme-dark flex flex-col items-start justify-between gap-6 rounded-3xl bg-brand-surface p-7 text-brand-foreground sm:flex-row sm:items-end sm:p-10">
      <div className="flex flex-col gap-4">
        <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.24em] text-secondary">
          <DayGreeting />
          <span className="h-px w-10 bg-accent" aria-hidden />
        </p>
        <h2 className="max-w-md text-[32px] font-bold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
          What are we cleaning today, <Highlight>{firstName}?</Highlight>
        </h2>
      </div>
      <ButtonLink href={routes.dashboardCleaner} size="lg">
        Clean an Image
        <ArrowRight className="size-4" aria-hidden />
      </ButtonLink>
    </section>
  );
}
