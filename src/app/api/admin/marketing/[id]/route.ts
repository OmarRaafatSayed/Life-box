import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const content = await prisma.marketingContent.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Failed to update marketing content:", error);
    return NextResponse.json({ error: "Failed to update marketing content" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.marketingContent.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete marketing content:", error);
    return NextResponse.json({ error: "Failed to delete marketing content" }, { status: 500 });
  }
}
