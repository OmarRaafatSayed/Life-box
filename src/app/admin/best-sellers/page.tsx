"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Package, DollarSign, AlertTriangle } from "lucide-react";
import { PageHeader, Card, LoadingSpinner } from "@/components/admin/AdminComponents";

interface ProductPerformance {
  id: string;
  name: string;
  image: string;
  totalSales: number;
  totalRevenue: number;
  totalOrders: number;
  avgPrice: number;
  stock: number;
  trend: "up" | "down" | "stable";
}

interface PerformanceData {
  bestSellers: ProductPerformance[];
  slowMoving: ProductPerformance[];
  lowStock: ProductPerformance[];
  totalSalesVolume: number;
  inventoryTurnover: number;
}

export default function BestSellersPage() {
  const [data, setData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("30d");

  useEffect(() => {
    fetchData();
  }, [period]);

  async function fetchData() {
    try {
      const res = await fetch(`/api/admin/best-sellers?period=${period}`);
      const responseData = await res.json();
      setData(responseData);
    } catch (error) {
      console.error("Failed to fetch best sellers:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading || !data) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <PageHeader
        title="Best Sellers & Product Performance"
        description="Analyze top-performing products and inventory insights"
        action={
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-3 border-2 border-gray-300 rounded-2xl font-semibold"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
        }
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-2xl">
              <TrendingUp size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sales Volume</p>
              <p className="text-2xl font-black text-gray-900">{data.totalSalesVolume.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <Package size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Inventory Turnover</p>
              <p className="text-2xl font-black text-gray-900">{data.inventoryTurnover.toFixed(1)}x</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-2xl">
              <AlertTriangle size={24} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock Products</p>
              <p className="text-2xl font-black text-gray-900">{data.lowStock.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Best Sellers */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-black text-gray-900 mb-6">Top Performing Products</h2>
        <div className="space-y-4">
          {data.bestSellers.map((product, idx) => (
            <div key={product.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-black">
                {idx + 1}
              </div>
              <img src={product.image || "/placeholder.jpg"} alt={product.name} className="w-16 h-16 object-cover rounded-xl" />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600">
                  {product.totalOrders} orders • {product.totalSales} units sold
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-gray-900">£{product.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Revenue</p>
              </div>
              <TrendIcon trend={product.trend} />
            </div>
          ))}
        </div>
      </Card>

      {/* Slow Moving Products */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-black text-gray-900 mb-6">Slow Moving Products</h2>
        <div className="space-y-4">
          {data.slowMoving.map((product) => (
            <div key={product.id} className="flex items-center gap-4 p-4 bg-yellow-50 rounded-2xl">
              <img src={product.image || "/placeholder.jpg"} alt={product.name} className="w-16 h-16 object-cover rounded-xl" />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600">
                  Only {product.totalOrders} orders • {product.totalSales} units sold
                </p>
              </div>
              <div className="text-right">
                <p className="font-black text-gray-900">£{product.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">{product.stock} in stock</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Low Stock Alert */}
      {data.lowStock.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-red-100 rounded-2xl">
              <AlertTriangle size={24} className="text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900">Low Stock Alert</h2>
              <p className="text-sm text-gray-600">Products that need restocking</p>
            </div>
          </div>
          <div className="space-y-3">
            {data.lowStock.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-red-50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <img src={product.image || "/placeholder.jpg"} alt={product.name} className="w-12 h-12 object-cover rounded-xl" />
                  <div>
                    <h3 className="font-bold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-red-600">Only {product.stock} units left</p>
                  </div>
                </div>
                <a
                  href={`/admin/products?id=${product.id}`}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl font-semibold text-sm hover:bg-red-700"
                >
                  Restock Now
                </a>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

function TrendIcon({ trend }: { trend: "up" | "down" | "stable" }) {
  if (trend === "up") {
    return (
      <div className="flex items-center gap-1 text-green-600">
        <TrendingUp size={20} />
        <span className="text-sm font-semibold">↑</span>
      </div>
    );
  }
  if (trend === "down") {
    return (
      <div className="flex items-center gap-1 text-red-600">
        <TrendingUp size={20} className="rotate-180" />
        <span className="text-sm font-semibold">↓</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1 text-gray-400">
      <span className="text-sm font-semibold">→</span>
    </div>
  );
}
