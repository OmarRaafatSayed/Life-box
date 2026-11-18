import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json({ banners });
  } catch (error) {
    console.error("Failed to fetch banners:", error);
    return NextResponse.json({ error: "Failed to fetch banners" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Get the highest display order
    const maxOrder = await prisma.banner.findMany({
      orderBy: { displayOrder: "desc" },
      take: 1,
    });

    const displayOrder = maxOrder.length > 0 ? maxOrder[0].displayOrder + 1 : 0;

    const banner = await prisma.banner.create({
      data: {
        ...body,
        displayOrder,
      },
    });

    return NextResponse.json({ banner }, { status: 201 });
  } catch (error) {
    console.error("Failed to create banner:", error);
    return NextResponse.json({ error: "Failed to create banner" }, { status: 500 });
  }
}
