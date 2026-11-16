import { accountCopy } from "@/content/account";
import { requireUser } from "@/lib/auth/dal";
import { Badge } from "@/components/ui/Badge";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { GoogleLinkNotice } from "@/components/dashboard/account/GoogleLinkNotice";
import { GoogleSettings } from "@/components/dashboard/account/GoogleSettings";
import { PasswordSettings } from "@/components/dashboard/account/PasswordSettings";
import { ProfileForm } from "@/components/dashboard/account/ProfileForm";
import { SignOutButton } from "@/components/dashboard/account/SignOutButton";
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
      <GoogleLinkNotice />

      <SettingsPanel title={accountCopy.profile.title} description={accountCopy.profile.description}>
        <div className="flex items-center gap-4 px-5 py-5">
          <UserAvatar name={user.name} avatarUrl={user.avatarUrl} size="lg" />
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold">{user.name}</p>
            <p className="truncate text-sm text-secondary">{user.email}</p>
          </div>
        </div>
        <ProfileForm name={user.name} />
        <SettingsRow label="Member since">
          <span className="text-secondary">{memberSince}</span>
        </SettingsRow>
      </SettingsPanel>

      <SettingsPanel title={accountCopy.security.title} description={accountCopy.security.description}>
        <GoogleSettings connected={user.hasGoogle} />
        <PasswordSettings hasPassword={user.hasPassword} />
      </SettingsPanel>

      <SettingsPanel title="Plan & usage">
        <SettingsRow label="Current plan" description="All tools included.">
          <Badge tone="success">Free</Badge>
        </SettingsRow>
        <SettingsRow label="Daily limit" description="Resets every day at midnight UTC.">
          <span className="font-medium tabular-nums">{user.limits.files} files</span>
        </SettingsRow>
      </SettingsPanel>

      <SettingsPanel title="Preferences">
        <SettingsRow label="Theme" description="Choose light or dark mode.">
          <ThemeSwitcher />
        </SettingsRow>
      </SettingsPanel>

      <SettingsPanel title="Session">
        <SettingsRow label="Sign out" description="End your session on this device.">
          <SignOutButton />
        </SettingsRow>
      </SettingsPanel>
    </div>
  );
}
