"use client";

import { useState, useEffect } from "react";
import { DollarSign, TrendingUp, ShoppingCart, Percent, Download } from "lucide-react";
import { PageHeader, Card, LoadingSpinner } from "@/components/admin/AdminComponents";

interface FinancialData {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  totalProfit: number;
  totalTax: number;
  totalShipping: number;
  totalDiscounts: number;
  revenueByMonth: { month: string; revenue: number }[];
  revenueByCategory: { category: string; revenue: number }[];
  profitMargin: number;
}

export default function FinancialsPage() {
  const [data, setData] = useState<FinancialData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("30");

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/financials?days=${dateRange}`)
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [dateRange]);

  if (loading || !data) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <PageHeader
        title="المالية وتحليل المبيعات"
        description="تقارير مالية تفصيلية وتتبع الإيرادات"
        action={
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-3 border-2 border-gray-300 rounded-2xl font-semibold text-right"
              style={{ direction: "rtl" }}
            >
              <option value="7">آخر 7 أيام</option>
              <option value="30">آخر 30 يومًا</option>
              <option value="90">آخر 90 يومًا</option>
              <option value="365">السنة الماضية</option>
              <option value="9999">كل الوقت</option>
            </select>
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-semibold hover:opacity-90"
              style={{ background: "#3D1A6E" }}
              onClick={() => {
                const csv = [
                  ["الشهر", "الإيرادات"],
                  ...data.revenueByMonth.map((m) => [m.month, m.revenue]),
                ]
                  .map((r) => r.join(","))
                  .join("\n");
                const a = document.createElement("a");
                a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
                a.download = `financial-report-${dateRange}d.csv`;
                a.click();
              }}
            >
              <Download size={20} />
              تصدير
            </button>
          </div>
        }
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="إجمالي الإيرادات"
          value={`${data.totalRevenue.toLocaleString("ar-EG")} جنيه`}
          icon={<DollarSign size={24} />}
          color="#3D1A6E"
        />
        <MetricCard
          title="إجمالي الأرباح (تقديري)"
          value={`${data.totalProfit.toLocaleString("ar-EG")} جنيه`}
          icon={<TrendingUp size={24} />}
          color="#00BCD4"
        />
        <MetricCard
          title="متوسط قيمة الطلب"
          value={`${data.avgOrderValue.toFixed(0)} جنيه`}
          icon={<ShoppingCart size={24} />}
          color="#E91E8C"
        />
        <MetricCard
          title="هامش الربح"
          value={`${data.profitMargin.toFixed(1)}%`}
          icon={<Percent size={24} />}
          color="#FF6B35"
        />
      </div>

      {/* Breakdown + Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h2 className="text-xl font-black text-gray-900 mb-4 text-right">
            تفصيل الإيرادات
          </h2>
          {data.totalOrders === 0 ? (
            <p className="text-center text-gray-400 py-8">لا توجد طلبات في هذه الفترة</p>
          ) : (
            <div className="space-y-3">
              <BreakdownItem
                label="الإيرادات الإجمالية"
                value={data.totalRevenue}
                total={data.totalRevenue}
              />
              <BreakdownItem
                label="رسوم الشحن"
                value={data.totalShipping}
                total={data.totalRevenue}
                isPositive
              />
              <BreakdownItem
                label="الخصومات"
                value={data.totalDiscounts}
                total={data.totalRevenue}
              />
              <BreakdownItem
                label="الضريبة المحصلة"
                value={data.totalTax}
                total={data.totalRevenue}
                isPositive
              />
              <div className="border-t-2 border-gray-200 pt-3 mt-3">
                <BreakdownItem
                  label="صافي الإيرادات"
                  value={
                    data.totalRevenue + data.totalShipping - data.totalDiscounts
                  }
                  total={data.totalRevenue}
                  isHighlight
                />
              </div>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-black text-gray-900 mb-4 text-right">
            الإيرادات حسب الفئة
          </h2>
          {data.revenueByCategory.length === 0 ? (
            <p className="text-center text-gray-400 py-8">لا توجد بيانات</p>
          ) : (
            <div className="space-y-3">
              {data.revenueByCategory.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="font-black text-gray-900">
                    {item.revenue.toLocaleString("ar-EG")} جنيه
                  </span>
                  <span className="font-semibold text-gray-700">{item.category}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Monthly Trend */}
      <Card className="p-6">
        <h2 className="text-xl font-black text-gray-900 mb-6 text-right">
          الإيرادات الشهرية
        </h2>
        {data.revenueByMonth.length === 0 ? (
          <p className="text-center text-gray-400 py-8">لا توجد بيانات شهرية</p>
        ) : (
          <div className="h-64 flex items-end gap-4">
            {data.revenueByMonth.map((item, idx) => {
              const maxRevenue = Math.max(
                ...data.revenueByMonth.map((m) => m.revenue)
              );
              const height =
                maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 10;
              return (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div
                    className="w-full rounded-t-2xl relative group cursor-pointer"
                    style={{
                      height: `${height}%`,
                      background: "#3D1A6E",
                      minHeight: "20px",
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {item.revenue.toLocaleString("ar-EG")} جنيه
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-gray-600">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}

function MetricCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-2xl" style={{ background: `${color}15` }}>
          <div style={{ color }}>{icon}</div>
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1 text-right">{title}</h3>
      <p className="text-2xl font-black text-gray-900 text-right">{value}</p>
    </Card>
  );
}

function BreakdownItem({
  label,
  value,
  total,
  isPositive = false,
  isHighlight = false,
}: {
  label: string;
  value: number;
  total: number;
  isPositive?: boolean;
  isHighlight?: boolean;
}) {
  const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : "0.0";
  return (
    <div
      className={`flex items-center justify-between ${isHighlight ? "font-black" : ""}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">{percentage}%</span>
        <span className={isHighlight ? "text-xl" : ""}>
          {isPositive ? "+" : ""}
          {value.toLocaleString("ar-EG")} جنيه
        </span>
      </div>
      <span className="text-gray-700">{label}</span>
    </div>
  );
}
