import { NextRequest, NextResponse } from "next/server";
import { getFinancialsData } from "@/lib/actions/admin";

export async function GET(req: NextRequest) {
  try {
    const days = parseInt(req.nextUrl.searchParams.get("days") ?? "30", 10);
    const data = await getFinancialsData(days);
    return NextResponse.json(data);
  } catch (error) {
    console.error("financials API error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
