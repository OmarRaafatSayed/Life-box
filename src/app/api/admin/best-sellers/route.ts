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

    // Fetch order items with product details
    const orderItems = await prisma.orderItem.findMany({
      where: {
        order: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      },
      include: {
        product: true,
        order: true,
      },
    });

    // Aggregate product performance
    const productPerformance: Record<string, any> = {};

    orderItems.forEach((item) => {
      const productId = item.product.id;
      
      if (!productPerformance[productId]) {
        productPerformance[productId] = {
          id: item.product.id,
          name: item.product.nameEn,
          image: item.product.images[0] || "",
          totalSales: 0,
          totalRevenue: 0,
          totalOrders: new Set(),
          avgPrice: 0,
          stock: item.product.stock,
        };
      }

      productPerformance[productId].totalSales += item.quantity;
      productPerformance[productId].totalRevenue += Number(item.price) * item.quantity;
      productPerformance[productId].totalOrders.add(item.orderId);
    });

    // Convert to array and calculate metrics
    const products = Object.values(productPerformance).map((p: any) => ({
      ...p,
      totalOrders: p.totalOrders.size,
      avgPrice: p.totalRevenue / p.totalSales,
      trend: p.totalSales > 50 ? "up" : p.totalSales < 10 ? "down" : "stable",
    }));

    // Sort by sales
    const bestSellers = products.sort((a, b) => b.totalSales - a.totalSales).slice(0, 10);
    const slowMoving = products.sort((a, b) => a.totalSales - b.totalSales).slice(0, 10);
    const lowStock = products.filter((p) => p.stock < 10 && p.stock > 0).slice(0, 10);

    const totalSalesVolume = products.reduce((sum, p) => sum + p.totalSales, 0);
    const inventoryTurnover = totalSalesVolume / Math.max(products.length, 1);

    return NextResponse.json({
      bestSellers,
      slowMoving,
      lowStock,
      totalSalesVolume,
      inventoryTurnover,
    });
  } catch (error) {
    console.error("Failed to fetch best sellers:", error);
    return NextResponse.json({ error: "Failed to fetch best sellers" }, { status: 500 });
  }
}
