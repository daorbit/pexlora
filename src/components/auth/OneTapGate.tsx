import { getCurrentUser } from "@/lib/auth/dal";
import { env } from "@/lib/env";
import { GoogleOneTap } from "@/components/auth/GoogleOneTap";

export async function OneTapGate() {
  const clientId = env.googleClientId;
  if (!clientId) return null;

  const user = await getCurrentUser().catch(() => null);
  if (user) return null;

  return <GoogleOneTap clientId={clientId} />;
}
