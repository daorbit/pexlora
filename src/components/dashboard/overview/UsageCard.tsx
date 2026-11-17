import { overviewCopy } from "@/content/dashboard";
import { requireUser } from "@/lib/auth/dal";
import { getUserUsageAll } from "@/lib/auth/usage";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProBadge } from "@/components/plan/ProBadge";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { UsageBar } from "@/components/dashboard/UsageBar";
import { UsageRing } from "@/components/dashboard/UsageRing";

const copy = overviewCopy.usage;

export async function UsageCard() {
  const user = await requireUser();
  const { files, ai } = await getUserUsageAll(user);

  return (
    <Card className="flex h-full flex-col gap-5 p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-semibold">{copy.title}</h2>
        {user.plan ? <ProBadge plan={user.plan} /> : <Badge tone="success">{copy.plan}</Badge>}
      </div>
      <div className="flex items-center gap-4">
        <UsageRing used={files.used} limit={files.limit} className="size-16" />
        <div className="flex flex-col">
          <p className="text-[28px] leading-none font-semibold tracking-[-0.02em] tabular-nums">
            {files.used}
            <span className="text-lg font-medium text-tertiary"> / {files.limit}</span>
          </p>
          <p className="mt-1.5 text-[13px] text-secondary">
            {copy.files} · {copy.left(files.remaining)}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t border-separator pt-4">
        <div className="flex items-center justify-between text-[13px]">
          <span className="text-secondary">{copy.ai}</span>
          <span className="font-semibold tabular-nums">
            {ai.used} <span className="font-normal text-tertiary">/ {ai.limit}</span>
          </span>
        </div>
        <UsageBar used={ai.used} limit={ai.limit} />
      </div>
      <p className="mt-auto text-xs text-tertiary">{copy.resets}</p>
    </Card>
  );
}

export function UsageCardFallback() {
  return <SkeletonCard lines={4} className="h-full min-h-60" />;
}
