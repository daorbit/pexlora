import { routes } from "@/config/site";
import { navCopy } from "@/content/navigation";
import { getCurrentUser } from "@/lib/auth/dal";
import { ButtonLink } from "@/components/ui/Button";
import { UserMenu } from "@/components/layout/UserMenu";
import { Skeleton } from "@/components/ui/Skeleton";

export async function HeaderAuth() {
  const user = await getCurrentUser().catch(() => null);

  if (user) return <UserMenu name={user.name} email={user.email} avatarUrl={user.avatarUrl} plan={user.plan} />;

  return (
    <ButtonLink href={routes.signUp} variant="ink" size="md" className="h-9 rounded-lg px-3.5 text-[13px]">
      {navCopy.getStarted}
    </ButtonLink>
  );
}

export function HeaderAuthFallback() {
  return <Skeleton className="h-9 w-24 rounded-lg" />;
}
