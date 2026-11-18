import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Default integrations to seed
const DEFAULT_INTEGRATIONS = [
  { name: "stripe", displayName: "Stripe Payment Gateway" },
  { name: "paymob", displayName: "Paymob (Egypt)" },
  { name: "fawry", displayName: "Fawry (Egypt)" },
  { name: "whatsapp", displayName: "WhatsApp Business API" },
  { name: "shipping", displayName: "Shipping & Fulfillment" },
];

export async function GET() {
  try {
    let integrations = await prisma.apiIntegration.findMany();

    // Seed default integrations if none exist
    if (integrations.length === 0) {
      await prisma.apiIntegration.createMany({
        data: DEFAULT_INTEGRATIONS,
      });
      integrations = await prisma.apiIntegration.findMany();
    }

    return NextResponse.json({ integrations });
  } catch (error) {
    console.error("Failed to fetch integrations:", error);
    return NextResponse.json({ error: "Failed to fetch integrations" }, { status: 500 });
  }
}
