import { Suspense } from "react";
import { getCurrentUser } from "@/lib/auth/dal";
import { hasProPerks } from "@/lib/auth/roles";
import { PlanPerksSync } from "@/components/plan/PlanPerksSync";

async function LoadPerks() {
  const user = await getCurrentUser().catch(() => null);
  return <PlanPerksSync pro={Boolean(user && hasProPerks(user))} />;
}

export function PlanPerksLoader() {
  return (
    <Suspense fallback={null}>
      <LoadPerks />
    </Suspense>
  );
}
