import { LogOut } from "lucide-react";
import { signOut } from "@/actions/auth";
import { requireUser } from "@/lib/auth/dal";
import { Button } from "@/components/ui/Button";
import { UserAvatar } from "@/components/ui/UserAvatar";

export async function SidebarUser() {
  const user = await requireUser();

  return (
    <div className="flex items-center gap-3 rounded-lg px-2 py-1.5">
      <UserAvatar name={user.name} avatarUrl={user.avatarUrl} size="md" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{user.name}</p>
        <p className="truncate text-xs text-secondary">{user.email}</p>
      </div>
      <form action={signOut}>
        <Button type="submit" variant="icon" size="sm" aria-label="Sign out" title="Sign out">
          <LogOut className="size-4" aria-hidden />
        </Button>
      </form>
    </div>
  );
}

export function SidebarUserFallback() {
  return (
    <div className="flex items-center gap-3 px-2 py-1.5">
      <div className="size-9 animate-pulse rounded-full bg-fill" />
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="h-3 w-24 animate-pulse rounded bg-fill" />
        <div className="h-3 w-32 animate-pulse rounded bg-fill" />
      </div>
    </div>
  );
}
