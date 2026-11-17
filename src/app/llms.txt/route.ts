import { buildLlmsText } from "@/lib/seo/llms-text";

export function GET() {
  return new Response(`${buildLlmsText()}\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
