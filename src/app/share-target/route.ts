import { NextResponse, type NextRequest } from "next/server";
import { shareTarget } from "@/config/share-target";
import { getWorkspaceTool } from "@/config/tools";

function toolUrl(request: NextRequest, received: boolean) {
  const url = new URL(getWorkspaceTool(shareTarget.tool).href, request.url);
  if (received) url.searchParams.set(shareTarget.sharedParam, "1");
  return url;
}

export function GET(request: NextRequest) {
  return NextResponse.redirect(toolUrl(request, request.nextUrl.searchParams.has("received")), 303);
}

export function POST(request: NextRequest) {
  return NextResponse.redirect(toolUrl(request, false), 303);
}
