import { Gauge } from "lucide-react";
import { requireUser } from "@/lib/auth/dal";
import { getUserUsage } from "@/lib/auth/usage";

export async function UsagePill() {
  const user = await requireUser();
  const usage = await getUserUsage(user.id);

  return (
    <span className="hidden items-center gap-2 rounded-lg border border-separator px-3 py-1.5 text-[13px] sm:inline-flex">
      <Gauge className="size-3.5 text-secondary" aria-hidden />
      <span className="tabular-nums">
        {usage.used}
        <span className="text-secondary"> / {usage.limit} today</span>
      </span>
    </span>
  );
}
