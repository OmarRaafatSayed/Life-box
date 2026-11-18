import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const contents = await prisma.marketingContent.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ contents });
  } catch (error) {
    console.error("Failed to fetch marketing content:", error);
    return NextResponse.json({ error: "Failed to fetch marketing content" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const content = await prisma.marketingContent.create({
      data: body,
    });

    return NextResponse.json({ content }, { status: 201 });
  } catch (error) {
    console.error("Failed to create marketing content:", error);
    return NextResponse.json({ error: "Failed to create marketing content" }, { status: 500 });
  }
}
