"use client";

import { useState, useEffect } from "react";
import { LineChart, Users, ShoppingCart, TrendingUp, Clock, MapPin, AlertCircle } from "lucide-react";
import { PageHeader, Card, LoadingSpinner } from "@/components/admin/AdminComponents";

interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  conversionRate: number;
  cartAbandonment: number;
  customerRetentionRate: number;
  avgOrderValue: number;
  peakShoppingHours: { hour: number; orders: number }[];
  regionalDemand: { region: string; orders: number; revenue: number }[];
  customerLifetimeValue: number;
  repeatCustomerRate: number;
  topTrafficSources: { source: string; visits: number }[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("30d");

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  async function fetchAnalytics() {
    try {
      const res = await fetch(`/api/admin/analytics?period=${period}`);
      const responseData = await res.json();
      setData(responseData);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading || !data) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <PageHeader
        title="Advanced Analytics & Business Intelligence"
        description="Data-driven insights for strategic decision making"
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

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Conversion Rate"
          value={`${data.conversionRate.toFixed(1)}%`}
          description="Visitors who made a purchase"
          icon={<TrendingUp size={24} />}
          color="#10B981"
          trend={data.conversionRate > 3 ? "good" : "attention"}
        />
        <KPICard
          title="Cart Abandonment"
          value={`${data.cartAbandonment.toFixed(1)}%`}
          description="Users who abandoned cart"
          icon={<ShoppingCart size={24} />}
          color="#EF4444"
          trend={data.cartAbandonment < 70 ? "good" : "bad"}
        />
        <KPICard
          title="Customer Retention"
          value={`${data.customerRetentionRate.toFixed(1)}%`}
          description="Repeat customer rate"
          icon={<Users size={24} />}
          color="#3B82F6"
          trend={data.customerRetentionRate > 25 ? "good" : "attention"}
        />
        <KPICard
          title="Avg Order Value"
          value={`£${data.avgOrderValue.toFixed(2)}`}
          description="Average transaction size"
          icon={<LineChart size={24} />}
          color="#8B5CF6"
          trend="good"
        />
      </div>

      {/* Customer Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h2 className="text-xl font-black text-gray-900 mb-6">Customer Behavior</h2>
          <div className="space-y-4">
            <InsightRow label="Customer Lifetime Value" value={`£${data.customerLifetimeValue.toFixed(2)}`} />
            <InsightRow label="Repeat Customer Rate" value={`${data.repeatCustomerRate.toFixed(1)}%`} />
            <InsightRow label="Cart Abandonment Rate" value={`${data.cartAbandonment.toFixed(1)}%`} />
            <InsightRow label="Conversion Rate" value={`${data.conversionRate.toFixed(1)}%`} />
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-2xl">
            <p className="text-sm text-blue-900">
              <strong>Insight:</strong> {data.customerRetentionRate > 30 
                ? "Strong customer loyalty! Consider launching a referral program."
                : "Focus on retention strategies like email campaigns and loyalty programs."}
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-black text-gray-900 mb-6">Peak Shopping Hours</h2>
          <div className="h-64 flex items-end gap-2">
            {data.peakShoppingHours.map((item) => {
              const maxOrders = Math.max(...data.peakShoppingHours.map((h) => h.orders));
              const height = (item.orders / maxOrders) * 100;
              const isPeak = item.orders === maxOrders;

              return (
                <div key={item.hour} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`w-full rounded-t-lg relative group cursor-pointer ${
                      isPeak ? "bg-gradient-to-t from-pink-600 to-purple-600" : "bg-gray-300"
                    }`}
                    style={{ height: `${height}%`, minHeight: "10px" }}
                    title={`${item.hour}:00 - ${item.orders} orders`}
                  >
                    {isPeak && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
                        Peak: {item.orders}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-600">{item.hour}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-6 p-4 bg-purple-50 rounded-2xl flex items-start gap-3">
            <Clock size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-purple-900">
              <strong>Recommendation:</strong> Schedule promotions and product launches during peak hours (
              {data.peakShoppingHours.reduce((max, h) => h.orders > max.orders ? h : max, data.peakShoppingHours[0]).hour}:00) for maximum impact.
            </p>
          </div>
        </Card>
      </div>

      {/* Regional Demand */}
      <Card className="p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-green-100 rounded-2xl">
            <MapPin size={24} className="text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900">Regional Demand Breakdown</h2>
            <p className="text-sm text-gray-600">Orders and revenue by geographic location</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.regionalDemand.map((region, idx) => (
            <div key={idx} className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-2">{region.region}</h3>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Orders</span>
                <span className="font-semibold text-gray-900">{region.orders}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Revenue</span>
                <span className="font-black text-purple-600">£{region.revenue.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-green-50 rounded-2xl flex items-start gap-3">
          <MapPin size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-900">
            <strong>Strategic Insight:</strong> {data.regionalDemand[0]?.region} shows the highest demand. 
            Consider targeted marketing campaigns and optimized logistics for this region.
          </p>
        </div>
      </Card>

      {/* Traffic Sources */}
      <Card className="p-6">
        <h2 className="text-xl font-black text-gray-900 mb-6">Top Traffic Sources</h2>
        <div className="space-y-3">
          {data.topTrafficSources.map((source, idx) => {
            const totalVisits = data.topTrafficSources.reduce((sum, s) => sum + s.visits, 0);
            const percentage = ((source.visits / totalVisits) * 100).toFixed(1);

            return (
              <div key={idx} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-900">{source.source}</span>
                    <span className="text-sm text-gray-600">{source.visits.toLocaleString()} visits ({percentage}%)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${percentage}%`,
                        background: "linear-gradient(90deg, #3D1A6E, #E91E8C)",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Actionable Recommendations */}
      <Card className="p-6 mt-8 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-2xl">
            <AlertCircle size={24} className="text-purple-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-black text-gray-900 mb-3">Actionable Recommendations</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-black">•</span>
                <span className="text-gray-700">
                  {data.cartAbandonment > 70 
                    ? "High cart abandonment detected. Implement cart recovery emails and reduce checkout friction."
                    : "Cart abandonment is under control. Continue optimizing checkout experience."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-black">•</span>
                <span className="text-gray-700">
                  {data.customerRetentionRate < 25
                    ? "Customer retention needs attention. Launch loyalty programs and personalized email campaigns."
                    : "Strong retention rate! Consider VIP programs for your most loyal customers."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-black">•</span>
                <span className="text-gray-700">
                  Optimize inventory for {data.regionalDemand[0]?.region} region where demand is highest.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

function KPICard({
  title,
  value,
  description,
  icon,
  color,
  trend,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  trend: "good" | "bad" | "attention";
}) {
  const trendColors = {
    good: "bg-green-100 text-green-700",
    bad: "bg-red-100 text-red-700",
    attention: "bg-yellow-100 text-yellow-700",
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-2xl" style={{ background: `${color}15` }}>
          <div style={{ color }}>{icon}</div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${trendColors[trend]}`}>
          {trend === "good" ? "✓" : trend === "bad" ? "✗" : "!"}
        </span>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-black text-gray-900 mb-1">{value}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </Card>
  );
}

function InsightRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100">
      <span className="text-gray-700">{label}</span>
      <span className="font-black text-gray-900">{value}</span>
    </div>
  );
}
