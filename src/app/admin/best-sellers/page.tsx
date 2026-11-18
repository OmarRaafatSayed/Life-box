"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Package, AlertTriangle } from "lucide-react";
import { PageHeader, Card, LoadingSpinner } from "@/components/admin/AdminComponents";

interface ProductPerformance {
  id: string;
  name: string;
  image: string;
  totalSales: number;
  totalRevenue: number;
  totalOrders: number;
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
  const [period, setPeriod] = useState("30");

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/best-sellers?days=${period}`)
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [period]);

  if (loading || !data) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <PageHeader
        title="الأكثر مبيعًا وأداء المنتجات"
        description="تحليل أداء المنتجات ورؤى المخزون"
        action={
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-3 border-2 border-gray-300 rounded-2xl font-semibold text-right"
            style={{ direction: "rtl" }}
          >
            <option value="7">آخر 7 أيام</option>
            <option value="30">آخر 30 يومًا</option>
            <option value="90">آخر 90 يومًا</option>
            <option value="365">السنة الماضية</option>
          </select>
        }
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl" style={{ background: "#E8FFF3" }}>
              <TrendingUp size={24} className="text-green-600" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600">إجمالي حجم المبيعات</p>
              <p className="text-2xl font-black text-gray-900">
                {data.totalSalesVolume.toLocaleString("ar-EG")}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl" style={{ background: "#E0F7FA" }}>
              <Package size={24} style={{ color: "#00BCD4" }} />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600">معدل دوران المخزون</p>
              <p className="text-2xl font-black text-gray-900">
                {data.inventoryTurnover.toFixed(1)}x
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-red-100">
              <AlertTriangle size={24} className="text-red-600" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600">منتجات مخزون منخفض</p>
              <p className="text-2xl font-black text-gray-900">{data.lowStock.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Best Sellers */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-black text-gray-900 mb-6 text-right">
          أفضل المنتجات أداءً
        </h2>
        {data.bestSellers.length === 0 ? (
          <p className="text-center text-gray-400 py-8">
            لا توجد مبيعات في هذه الفترة بعد
          </p>
        ) : (
          <div className="space-y-4">
            {data.bestSellers.map((product, idx) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl"
              >
                <div className="text-right flex-1">
                  <h3 className="font-bold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600">
                    {product.totalOrders} طلب • {product.totalSales} وحدة مباعة
                  </p>
                </div>
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-xl"
                  />
                )}
                <div className="text-left flex-shrink-0">
                  <p className="text-xl font-black text-gray-900">
                    {product.totalRevenue.toLocaleString("ar-EG")} جنيه
                  </p>
                  <p className="text-sm text-gray-600">الإيرادات</p>
                </div>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black flex-shrink-0"
                  style={{ background: "#3D1A6E" }}
                >
                  {idx + 1}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Slow Moving */}
      {data.slowMoving.length > 0 && (
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-black text-gray-900 mb-6 text-right">
            منتجات بطيئة الحركة
          </h2>
          <div className="space-y-4">
            {data.slowMoving.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-4 rounded-2xl"
                style={{ background: "#FFFBEB" }}
              >
                <div className="text-right flex-1">
                  <h3 className="font-bold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600">لا توجد مبيعات في هذه الفترة</p>
                </div>
                <div className="text-left flex-shrink-0">
                  <p className="text-sm text-gray-600">{product.stock} في المخزون</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Low Stock */}
      {data.lowStock.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-red-100 rounded-2xl">
              <AlertTriangle size={24} className="text-red-600" />
            </div>
            <div className="text-right">
              <h2 className="text-xl font-black text-gray-900">تنبيه مخزون منخفض</h2>
              <p className="text-sm text-gray-600">منتجات تحتاج إعادة تخزين</p>
            </div>
          </div>
          <div className="space-y-3">
            {data.lowStock.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 bg-red-50 rounded-2xl"
              >
                <a
                  href={`/admin/products`}
                  className="px-4 py-2 text-white rounded-xl font-semibold text-sm hover:opacity-90"
                  style={{ background: "#E91E8C" }}
                >
                  إعادة التخزين
                </a>
                <div className="text-right">
                  <h3 className="font-bold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-red-600">
                    {product.stock} وحدة فقط متبقية
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
