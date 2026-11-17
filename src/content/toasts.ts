export const FLASH_COOKIE = "pexlora_flash";

export const flashMessages = {
  "signed-in": "Signed in. Welcome back.",
  "signed-out": "You've been signed out.",
  "account-created": "Welcome to Pexlora. Your account is ready.",
  "password-reset": "Password updated. Other devices were signed out.",
  "session-expired": "Your session ended. Please sign in again.",
} as const;

export type FlashKey = keyof typeof flashMessages;

export function isFlashKey(value: string): value is FlashKey {
  return value in flashMessages;
}

export const connectionCopy = {
  offline: "You're offline. Tools that run in your browser still work.",
  online: "You're back online.",
  requestOffline: "You're offline. This tool needs a connection, so try again once you're back online.",
  network: "Network error. Check your connection and try again.",
};

export const toastCopy = {
  dismiss: "Dismiss notification",
  region: "Notifications",
  filesDone: (count: number, doneLabel: string) =>
    `${count} ${count === 1 ? "file" : "files"} ${doneLabel.toLowerCase()}.`,
  filesFailed: (count: number) => `${count} ${count === 1 ? "file" : "files"} couldn't be processed.`,
};
