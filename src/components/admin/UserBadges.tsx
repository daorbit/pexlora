import { ROLE_LABELS, type UserRole } from "@/config/roles";
import { adminCopy } from "@/content/admin";
import type { ActivePlan } from "@/lib/auth/plan";
import { Badge } from "@/components/ui/Badge";
import { ProBadge } from "@/components/plan/ProBadge";

export function PlanBadge({ plan, lapsed }: { plan: ActivePlan | null; lapsed: boolean }) {
  if (plan) return <ProBadge plan={plan} />;
  return <Badge>{lapsed ? adminCopy.plan.lapsed : adminCopy.plan.free}</Badge>;
}

export function RoleBadge({ role, owner }: { role: UserRole; owner?: boolean }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-1">
      <Badge tone={role === "super_admin" ? "accent" : "neutral"}>{ROLE_LABELS[role]}</Badge>
      {owner && <Badge tone="warning">{adminCopy.owner}</Badge>}
    </span>
  );
}

export function SignInMethods({ hasGoogle, hasPassword }: { hasGoogle: boolean; hasPassword: boolean }) {
  return (
    <span className="inline-flex flex-wrap gap-1">
      {hasGoogle && <Badge>{adminCopy.signIn.google}</Badge>}
      {hasPassword && <Badge>{adminCopy.signIn.email}</Badge>}
    </span>
  );
}

export function UsageCount({ used, limit }: { used: number; limit: number }) {
  return (
    <span className={used >= limit ? "font-semibold text-danger tabular-nums" : "tabular-nums"}>
      {used} <span className="text-tertiary">/ {limit}</span>
    </span>
  );
}
