import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get("period") || "30d";

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    
    switch (period) {
      case "7d":
        startDate.setDate(endDate.getDate() - 7);
        break;
      case "30d":
        startDate.setDate(endDate.getDate() - 30);
        break;
      case "90d":
        startDate.setDate(endDate.getDate() - 90);
        break;
      case "1y":
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
    }

    // Fetch orders and customers
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const allCustomers = await prisma.customer.findMany();
    const totalCustomers = allCustomers.length;

    // Calculate metrics
    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total), 0);
    const totalOrders = orders.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Mock conversion rate (in production, track website visits)
    const conversionRate = 3.5 + Math.random() * 2;
    const cartAbandonment = 68 + Math.random() * 10;

    // Calculate customer retention
    const repeatCustomers = allCustomers.filter((c) => c.orderCount > 1).length;
    const customerRetentionRate = totalCustomers > 0 ? (repeatCustomers / totalCustomers) * 100 : 0;

    // Calculate customer lifetime value
    const totalCustomerSpent = allCustomers.reduce((sum, c) => sum + Number(c.totalSpent), 0);
    const customerLifetimeValue = totalCustomers > 0 ? totalCustomerSpent / totalCustomers : 0;

    const repeatCustomerRate = totalCustomers > 0 ? (repeatCustomers / totalCustomers) * 100 : 0;

    // Peak shopping hours (aggregate by hour)
    const peakShoppingHours = Array.from({ length: 24 }, (_, hour) => {
      const ordersInHour = orders.filter((o) => new Date(o.createdAt).getHours() === hour).length;
      return { hour, orders: ordersInHour };
    });

    // Regional demand (mock data - in production, extract from addresses)
    const regionalDemand = [
      { region: "Cairo", orders: Math.floor(totalOrders * 0.4), revenue: totalRevenue * 0.4 },
      { region: "Alexandria", orders: Math.floor(totalOrders * 0.25), revenue: totalRevenue * 0.25 },
      { region: "Giza", orders: Math.floor(totalOrders * 0.2), revenue: totalRevenue * 0.2 },
      { region: "Other", orders: Math.floor(totalOrders * 0.15), revenue: totalRevenue * 0.15 },
    ];

    // Traffic sources (mock data)
    const topTrafficSources = [
      { source: "Direct", visits: 4500 },
      { source: "Google Search", visits: 3200 },
      { source: "Facebook", visits: 2800 },
      { source: "Instagram", visits: 2100 },
      { source: "Email", visits: 1500 },
    ];

    return NextResponse.json({
      totalRevenue,
      totalOrders,
      totalCustomers,
      conversionRate,
      cartAbandonment,
      customerRetentionRate,
      avgOrderValue,
      customerLifetimeValue,
      repeatCustomerRate,
      peakShoppingHours,
      regionalDemand,
      topTrafficSources,
    });
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
