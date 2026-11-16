import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

/**
 * POST /api/revalidate?tag=fundamental:gold
 * Header: Authorization: Bearer <REVALIDATE_SECRET>
 *
 * Lets the CMS (or whoever publishes the 13.00 / 18.00 WIB analysis) refresh the
 * cached article immediately instead of waiting for the cache to expire.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ ok: false }, { status: 401 });
  }
  const tag = request.nextUrl.searchParams.get("tag");
  if (!tag?.startsWith("fundamental:")) {
    return Response.json({ ok: false, error: "tag must be fundamental:<asset>" }, { status: 400 });
  }
  revalidateTag(tag, "max");
  return Response.json({ ok: true, tag });
}
