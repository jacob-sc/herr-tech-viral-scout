import { NextRequest } from "next/server";
import { MOCK_RESULT } from "@/lib/mock/data";
import { REGIONS, type Region } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const { region } = (await request.json()) as { region?: Region };
  if (!region || !REGIONS.includes(region)) {
    return Response.json({ error: "Invalid region" }, { status: 400 });
  }
  return Response.json({ videos: MOCK_RESULT.videos[region] });
}
