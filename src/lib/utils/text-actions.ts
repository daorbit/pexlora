import { downloadBlob } from "@/lib/utils/download";

export async function readClipboardText() {
  if (!navigator.clipboard?.readText) return null;
  try {
    return await navigator.clipboard.readText();
  } catch {
    return null;
  }
}

export function downloadText(text: string, fileName: string) {
  downloadBlob(new Blob([text], { type: "text/plain;charset=utf-8" }), fileName);
}

export async function shareText(title: string, text: string) {
  if (navigator.share) {
    try {
      await navigator.share({ title, text });
      return "shared";
    } catch {
      return "cancelled";
    }
  }
  await navigator.clipboard.writeText(text);
  return "copied";
}
