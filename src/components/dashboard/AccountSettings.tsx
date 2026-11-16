import { LogOut } from "lucide-react";
import { signOut } from "@/actions/auth";
import { DAILY_LIMITS } from "@/config/limits";
import { requireUser } from "@/lib/auth/dal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { GoogleIcon } from "@/components/auth/GoogleIcon";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { SettingsPanel } from "@/components/dashboard/SettingsPanel";
import { SettingsRow } from "@/components/dashboard/SettingsRow";

export async function AccountSettings() {
  const user = await requireUser();
  const memberSince = new Date(user.memberSince).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-6">
      <SettingsPanel title="Profile" description="Your account details.">
        <div className="flex items-center gap-4 px-5 py-5">
          <UserAvatar name={user.name} avatarUrl={user.avatarUrl} size="lg" />
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold">{user.name}</p>
            <p className="truncate text-sm text-secondary">{user.email}</p>
          </div>
        </div>
        <SettingsRow label="Member since">
          <span className="text-secondary">{memberSince}</span>
        </SettingsRow>
        <SettingsRow label="Sign-in method" description="How you access Pexlora.">
          {user.hasGoogle ? (
            <Badge className="gap-1.5">
              <GoogleIcon className="size-3.5" />
              Google
            </Badge>
          ) : (
            <Badge>Email and password</Badge>
          )}
        </SettingsRow>
      </SettingsPanel>

      <SettingsPanel title="Plan & usage">
        <SettingsRow label="Current plan" description="All tools included.">
          <Badge tone="success">Free</Badge>
        </SettingsRow>
        <SettingsRow label="Daily limit" description="Resets every day at midnight UTC.">
          <span className="font-medium tabular-nums">{DAILY_LIMITS.user} files</span>
        </SettingsRow>
      </SettingsPanel>

      <SettingsPanel title="Preferences">
        <SettingsRow label="Theme" description="Choose light or dark mode.">
          <ThemeSwitcher />
        </SettingsRow>
      </SettingsPanel>

      <SettingsPanel title="Session">
        <SettingsRow label="Sign out" description="End your session on this device.">
          <form action={signOut}>
            <Button type="submit" variant="secondary" size="sm">
              <LogOut className="size-3.5" aria-hidden />
              Sign Out
            </Button>
          </form>
        </SettingsRow>
      </SettingsPanel>
    </div>
  );
}
