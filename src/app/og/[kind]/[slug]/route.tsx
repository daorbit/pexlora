import { getOgCard, ogCardParams } from "@/lib/seo/og-cards";
import { renderOgImage } from "@/lib/seo/og-image";

export function generateStaticParams() {
  return ogCardParams();
}

export async function GET(_request: Request, { params }: RouteContext<"/og/[kind]/[slug]">) {
  const { kind, slug } = await params;
  const card = getOgCard(kind, slug);
  if (!card) return new Response(null, { status: 404 });
  return renderOgImage(card);
}
