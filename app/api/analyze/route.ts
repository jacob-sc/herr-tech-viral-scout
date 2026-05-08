import { NextRequest } from "next/server";
import { MOCK_RESULT } from "@/lib/mock/data";
import { parseHandle } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const { input } = (await request.json()) as { input?: string };
  const parsed = input ? parseHandle(input) : null;
  if (!parsed) {
    return Response.json({ error: "Invalid handle" }, { status: 400 });
  }
  return Response.json({
    source: { ...MOCK_RESULT.source, ...parsed },
    niche: MOCK_RESULT.niche,
  });
}
