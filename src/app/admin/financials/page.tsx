"use client";

import { useState, useEffect } from "react";
import { DollarSign, TrendingUp, ShoppingCart, Percent, Calendar, Download } from "lucide-react";
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
  const [dateRange, setDateRange] = useState("30d");

  useEffect(() => {
    fetchFinancials();
  }, [dateRange]);

  async function fetchFinancials() {
    try {
      const res = await fetch(`/api/admin/financials?range=${dateRange}`);
      const responseData = await res.json();
      setData(responseData);
    } catch (error) {
      console.error("Failed to fetch financials:", error);
    } finally {
      setLoading(false);
    }
  }

  async function exportReport() {
    try {
      const res = await fetch(`/api/admin/financials/export?range=${dateRange}`);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `financial-report-${dateRange}.csv`;
      a.click();
    } catch (error) {
      console.error("Failed to export report:", error);
    }
  }

  if (loading || !data) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <PageHeader
        title="Financials & Sales Analytics"
        description="Detailed financial reports and revenue tracking"
        action={
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-3 border-2 border-gray-300 rounded-2xl font-semibold"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
              <option value="all">All Time</option>
            </select>
            <button
              onClick={exportReport}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-semibold"
              style={{ background: "linear-gradient(135deg, #3D1A6E, #E91E8C)" }}
            >
              <Download size={20} />
              Export Report
            </button>
          </div>
        }
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Revenue"
          value={`£${data.totalRevenue.toLocaleString()}`}
          icon={<DollarSign size={24} />}
          color="#10B981"
        />
        <MetricCard
          title="Total Profit"
          value={`£${data.totalProfit.toLocaleString()}`}
          icon={<TrendingUp size={24} />}
          color="#3B82F6"
        />
        <MetricCard
          title="Avg Order Value"
          value={`£${data.avgOrderValue.toFixed(2)}`}
          icon={<ShoppingCart size={24} />}
          color="#8B5CF6"
        />
        <MetricCard
          title="Profit Margin"
          value={`${data.profitMargin.toFixed(1)}%`}
          icon={<Percent size={24} />}
          color="#F59E0B"
        />
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h2 className="text-xl font-black text-gray-900 mb-4">Revenue Breakdown</h2>
          <div className="space-y-3">
            <BreakdownItem label="Gross Revenue" value={data.totalRevenue} total={data.totalRevenue} />
            <BreakdownItem label="Shipping Fees" value={data.totalShipping} total={data.totalRevenue} isPositive />
            <BreakdownItem label="Discounts" value={data.totalDiscounts} total={data.totalRevenue} />
            <BreakdownItem label="Tax Collected" value={data.totalTax} total={data.totalRevenue} isPositive />
            <div className="border-t-2 border-gray-200 pt-3 mt-3">
              <BreakdownItem
                label="Net Revenue"
                value={data.totalRevenue + data.totalShipping - data.totalDiscounts}
                total={data.totalRevenue}
                isHighlight
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-black text-gray-900 mb-4">Revenue by Category</h2>
          <div className="space-y-3">
            {data.revenueByCategory.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="font-semibold text-gray-700">{item.category}</span>
                <span className="font-black text-gray-900">£{item.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Monthly Trend */}
      <Card className="p-6">
        <h2 className="text-xl font-black text-gray-900 mb-6">Monthly Revenue Trend</h2>
        <div className="h-64 flex items-end gap-4">
          {data.revenueByMonth.map((item, idx) => {
            const maxRevenue = Math.max(...data.revenueByMonth.map((m) => m.revenue));
            const height = (item.revenue / maxRevenue) * 100;

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-2xl relative group cursor-pointer"
                  style={{
                    height: `${height}%`,
                    background: "linear-gradient(135deg, #3D1A6E, #E91E8C)",
                    minHeight: "20px",
                  }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    £{item.revenue.toLocaleString()}
                  </div>
                </div>
                <span className="text-xs font-semibold text-gray-600">{item.month}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function MetricCard({ title, value, icon, color }: { title: string; value: string; icon: React.ReactNode; color: string }) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-2xl" style={{ background: `${color}15` }}>
          <div style={{ color }}>{icon}</div>
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-black text-gray-900">{value}</p>
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
  const percentage = ((value / total) * 100).toFixed(1);

  return (
    <div className={`flex items-center justify-between ${isHighlight ? "font-black" : ""}`}>
      <span className="text-gray-700">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">{percentage}%</span>
        <span className={isHighlight ? "text-xl" : ""}>
          {isPositive ? "+" : ""}£{value.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
