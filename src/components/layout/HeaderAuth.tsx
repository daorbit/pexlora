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
    <div className="flex items-center gap-1 sm:gap-2">
      <ButtonLink href={routes.signIn} variant="nav" className="hidden px-3 sm:inline-flex">
        {navCopy.signIn}
      </ButtonLink>
      <ButtonLink href={routes.signUp} variant="ink" size="md">
        {navCopy.getStarted}
      </ButtonLink>
    </div>
  );
}

export function HeaderAuthFallback() {
  return <Skeleton className="h-8 w-36 rounded-xl" />;
}
