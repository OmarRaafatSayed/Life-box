import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const integration = await prisma.apiIntegration.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ integration });
  } catch (error) {
    console.error("Failed to update integration:", error);
    return NextResponse.json({ error: "Failed to update integration" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const integration = await prisma.apiIntegration.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ integration });
  } catch (error) {
    console.error("Failed to update integration:", error);
    return NextResponse.json({ error: "Failed to update integration" }, { status: 500 });
  }
}
