import { connectionCopy } from "@/content/toasts";
import { parseUpsell, type Upsell } from "@/lib/api/upsell";

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public status: number,
    public upsell: Upsell = null,
  ) {
    super(message);
  }
}

export async function apiRequest(path: string, init: RequestInit) {
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    throw new ApiRequestError(connectionCopy.requestOffline, 0);
  }

  const response = await fetch(path, init).catch(() => {
    throw new ApiRequestError(navigator.onLine ? connectionCopy.network : connectionCopy.requestOffline, 0);
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new ApiRequestError(data?.error ?? "Something went wrong.", response.status, parseUpsell(data?.upsell));
  }

  return response;
}
