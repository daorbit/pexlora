export class ApiRequestError extends Error {
  constructor(
    message: string,
    public status: number,
    public upsell = false,
  ) {
    super(message);
  }
}

export async function apiRequest(path: string, init: RequestInit) {
  const response = await fetch(path, init).catch(() => {
    throw new ApiRequestError("Network error. Check your connection and try again.", 0);
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new ApiRequestError(data?.error ?? "Something went wrong.", response.status, Boolean(data?.upsell));
  }

  return response;
}
