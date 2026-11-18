import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("SiteSettings").select("*").eq("id", "site_settings").single();
    if (error && error.code !== "PGRST116") return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ settings: data });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { data, error } = await supabase.from("SiteSettings").upsert({ ...body, id: "site_settings" }).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ settings: data });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
