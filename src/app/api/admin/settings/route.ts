import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: "site_settings" },
    });

    // Create default settings if they don't exist
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: { id: "site_settings" },
      });
    }

    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const settings = await prisma.siteSettings.upsert({
      where: { id: "site_settings" },
      update: body,
      create: { id: "site_settings", ...body },
    });

    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Failed to update settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
