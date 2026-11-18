import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: cats, error } = await supabase
      .from("ProductCategory")
      .select("id, nameEn, nameAr, slug, isActive, displayOrder")
      .order("displayOrder", { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const { data: productCounts } = await supabase.from("Product").select("categoryId");
    const countMap = new Map<string, number>();
    (productCounts ?? []).forEach((p) => {
      countMap.set(p.categoryId, (countMap.get(p.categoryId) ?? 0) + 1);
    });

    return NextResponse.json({
      categories: (cats ?? []).map((c) => ({ ...c, productCount: countMap.get(c.id) ?? 0 })),
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { data, error } = await supabase
      .from("ProductCategory")
      .insert({ ...body, displayOrder: 999 })
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ category: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
