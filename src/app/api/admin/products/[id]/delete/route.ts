import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    await supabase.from("Product").delete().eq("id", id);
    return NextResponse.redirect(new URL("/admin/products", _req.url));
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
