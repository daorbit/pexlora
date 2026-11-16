import "server-only";
import { cookies } from "next/headers";
import { FLASH_COOKIE, type FlashKey } from "@/content/toasts";

const FLASH_TTL_SECONDS = 60;

export async function setFlash(key: FlashKey) {
  (await cookies()).set(FLASH_COOKIE, key, { path: "/", sameSite: "lax", maxAge: FLASH_TTL_SECONDS });
}
