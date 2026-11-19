import { GOOGLE_API_SCRIPT, GOOGLE_IDENTITY_SCRIPT, googleDrive } from "@/config/google-drive";
import { DriveError } from "@/lib/google-drive/errors";
import { loadScript } from "@/lib/utils/load-script";

type Waiter = { resolve: (token: string) => void; reject: (error: DriveError) => void };

const EXPIRY_MARGIN_MS = 60_000;

let cached: { token: string; expiresAt: number } | null = null;
let client: GoogleTokenClient | null = null;
let waiter: Waiter | null = null;

export function loadDriveScripts() {
  return Promise.all([
    loadScript(GOOGLE_IDENTITY_SCRIPT, () => Boolean(window.google?.accounts?.oauth2)),
    loadScript(GOOGLE_API_SCRIPT, () => Boolean(window.gapi)),
  ]).catch(() => {
    throw new DriveError("failed");
  });
}

function settle(result: { token: string } | { error: DriveError }) {
  const current = waiter;
  waiter = null;
  if ("token" in result) current?.resolve(result.token);
  else current?.reject(result.error);
}

function tokenClient() {
  const oauth2 = window.google?.accounts?.oauth2;
  if (!oauth2) throw new DriveError("failed");
  client ??= oauth2.initTokenClient({
    client_id: googleDrive.clientId,
    scope: googleDrive.scope,
    callback: (response) => {
      if (!response.access_token) return settle({ error: new DriveError("denied") });
      cached = { token: response.access_token, expiresAt: Date.now() + Number(response.expires_in ?? 0) * 1000 - EXPIRY_MARGIN_MS };
      settle({ token: response.access_token });
    },
    error_callback: (error) => {
      settle({ error: new DriveError(error.type === "popup_failed_to_open" ? "failed" : "cancelled") });
    },
  });
  return client;
}

export async function getDriveToken() {
  if (cached && cached.expiresAt > Date.now()) return cached.token;
  await loadDriveScripts();
  return new Promise<string>((resolve, reject) => {
    settle({ error: new DriveError("cancelled") });
    waiter = { resolve, reject };
    tokenClient().requestAccessToken();
  });
}

export function forgetDriveToken() {
  cached = null;
}
