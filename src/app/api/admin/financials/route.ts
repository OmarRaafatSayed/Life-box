import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const range = searchParams.get("range") || "30d";

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    
    switch (range) {
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
      default:
        startDate.setFullYear(2000); // All time
    }

    // Fetch orders in date range
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });

    // Calculate financials
    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.subtotal), 0);
    const totalTax = orders.reduce((sum, order) => sum + Number(order.tax), 0);
    const totalShipping = orders.reduce((sum, order) => sum + Number(order.shipping), 0);
    const totalDiscounts = orders.reduce((sum, order) => sum + Number(order.discount), 0);
    
    // Calculate profit (assuming cost is available)
    const totalCost = orders.reduce((sum, order) => {
      return sum + order.items.reduce((itemSum, item) => {
        return itemSum + Number(item.product.cost || 0) * item.quantity;
      }, 0);
    }, 0);
    
    const totalProfit = totalRevenue - totalCost;
    const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
    const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

    // Revenue by month
    const revenueByMonth = generateMonthlyData(orders);

    // Revenue by category
    const categoryRevenue: Record<string, number> = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const categoryName = item.product.category.nameEn;
        categoryRevenue[categoryName] = (categoryRevenue[categoryName] || 0) + Number(item.price) * item.quantity;
      });
    });

    const revenueByCategory = Object.entries(categoryRevenue).map(([category, revenue]) => ({
      category,
      revenue,
    }));

    return NextResponse.json({
      totalRevenue,
      totalOrders: orders.length,
      avgOrderValue,
      totalProfit,
      totalTax,
      totalShipping,
      totalDiscounts,
      profitMargin,
      revenueByMonth,
      revenueByCategory,
    });
  } catch (error) {
    console.error("Failed to fetch financials:", error);
    return NextResponse.json({ error: "Failed to fetch financials" }, { status: 500 });
  }
}

function generateMonthlyData(orders: any[]) {
  const monthlyData: Record<string, number> = {};
  
  orders.forEach((order) => {
    const month = new Date(order.createdAt).toLocaleDateString("en-US", { month: "short" });
    monthlyData[month] = (monthlyData[month] || 0) + Number(order.subtotal);
  });

  return Object.entries(monthlyData).map(([month, revenue]) => ({
    month,
    revenue,
  }));
}
