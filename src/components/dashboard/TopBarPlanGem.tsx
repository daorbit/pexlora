import { requireUser } from "@/lib/auth/dal";
import { ProGem } from "@/components/plan/ProGem";

export async function TopBarPlanGem() {
  const user = await requireUser();
  return user.plan ? <ProGem plan={user.plan} /> : null;
}
