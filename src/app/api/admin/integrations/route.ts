import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("ApiIntegration").select("id, name, displayName, isEnabled, apiKey, apiSecret, webhookUrl").order("name", { ascending: true });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ integrations: data ?? [] });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
