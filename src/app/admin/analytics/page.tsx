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
  const [period, setPeriod] = useState("30");

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/analytics?days=${period}`)
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [period]);

  if (loading || !data) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <PageHeader
        title="التحليلات وذكاء الأعمال"
        description="رؤى مبنية على البيانات الحقيقية من قاعدة البيانات"
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

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="معدل التحويل"
          value={`${data.conversionRate.toFixed(1)}%`}
          description="الزوار الذين أتمّوا الشراء"
          icon={<TrendingUp size={24} />}
          color="#00BCD4"
          trend={data.conversionRate > 3 ? "good" : "attention"}
        />
        <KPICard
          title="نسبة التخلي عن السلة"
          value={`${data.cartAbandonment.toFixed(1)}%`}
          description="المستخدمون الذين تركوا السلة"
          icon={<ShoppingCart size={24} />}
          color="#E91E8C"
          trend={data.cartAbandonment < 70 ? "good" : "bad"}
        />
        <KPICard
          title="معدل الاحتفاظ بالعملاء"
          value={`${data.customerRetentionRate.toFixed(1)}%`}
          description="نسبة العملاء المتكررين"
          icon={<Users size={24} />}
          color="#3D1A6E"
          trend={data.customerRetentionRate > 25 ? "good" : "attention"}
        />
        <KPICard
          title="متوسط قيمة الطلب"
          value={`${data.avgOrderValue.toFixed(0)} جنيه`}
          description="متوسط حجم الصفقة"
          icon={<LineChart size={24} />}
          color="#FF6B35"
          trend="good"
        />
      </div>

      {/* Customer insights + Peak Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h2 className="text-xl font-black text-gray-900 mb-6 text-right">
            سلوك العملاء
          </h2>
          <div className="space-y-4">
            <InsightRow
              label="قيمة العميل مدى الحياة"
              value={`${data.customerLifetimeValue.toFixed(0)} جنيه`}
            />
            <InsightRow
              label="معدل تكرار الشراء"
              value={`${data.repeatCustomerRate.toFixed(1)}%`}
            />
            <InsightRow
              label="نسبة التخلي عن السلة"
              value={`${data.cartAbandonment.toFixed(1)}%`}
            />
            <InsightRow
              label="معدل التحويل"
              value={`${data.conversionRate.toFixed(1)}%`}
            />
            <InsightRow
              label="إجمالي العملاء"
              value={data.totalCustomers.toString()}
            />
            <InsightRow
              label="إجمالي الطلبات"
              value={data.totalOrders.toString()}
            />
          </div>
          <div
            className="mt-6 p-4 rounded-2xl text-right"
            style={{ background: "#F5F0FF" }}
          >
            <p className="text-sm" style={{ color: "#3D1A6E" }}>
              <strong>رؤية:</strong>{" "}
              {data.customerRetentionRate > 30
                ? "ولاء قوي للعملاء! فكّر في إطلاق برنامج إحالة."
                : "ركّز على استراتيجيات الاحتفاظ كحملات البريد الإلكتروني وبرامج الولاء."}
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-black text-gray-900 mb-6 text-right">
            ذروة ساعات التسوق
          </h2>
          <div className="h-64 flex items-end gap-1">
            {data.peakShoppingHours.map((item) => {
              const maxOrders = Math.max(
                ...data.peakShoppingHours.map((h) => h.orders),
                1
              );
              const height = (item.orders / maxOrders) * 100;
              const isPeak = item.orders === maxOrders && item.orders > 0;
              return (
                <div
                  key={item.hour}
                  className="flex-1 flex flex-col items-center gap-1"
                >
                  <div
                    className="w-full rounded-t-lg relative group cursor-pointer"
                    style={{
                      height: `${Math.max(height, 5)}%`,
                      background: isPeak ? "#E91E8C" : "#e5e7eb",
                    }}
                    title={`${item.hour}:00 — ${item.orders} طلب`}
                  >
                    {isPeak && item.orders > 0 && (
                      <div
                        className="absolute -top-8 left-1/2 -translate-x-1/2 text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap"
                        style={{ background: "#3D1A6E" }}
                      >
                        {item.orders}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{item.hour}</span>
                </div>
              );
            })}
          </div>
          <div
            className="mt-4 p-4 rounded-2xl flex items-start gap-3 text-right"
            style={{ background: "#F5F0FF" }}
          >
            <Clock
              size={20}
              style={{ color: "#3D1A6E", flexShrink: 0, marginTop: "2px" }}
            />
            <p className="text-sm" style={{ color: "#3D1A6E" }}>
              <strong>توصية:</strong> جدوِل العروض خلال ساعات الذروة لأقصى تأثير.
            </p>
          </div>
        </Card>
      </div>

      {/* Regional Demand */}
      <Card className="p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl" style={{ background: "#E8FFF3" }}>
            <MapPin size={24} className="text-green-600" />
          </div>
          <div className="text-right">
            <h2 className="text-xl font-black text-gray-900">
              التوزيع الجغرافي للطلب
            </h2>
            <p className="text-sm text-gray-600">
              الطلبات والإيرادات حسب المنطقة
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.regionalDemand.map((region, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl text-right"
              style={{ background: "#F5F0FF" }}
            >
              <h3 className="font-bold text-gray-900 mb-2">{region.region}</h3>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-gray-900">
                  {region.orders}
                </span>
                <span className="text-sm text-gray-600">الطلبات</span>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className="font-black"
                  style={{ color: "#3D1A6E" }}
                >
                  {region.revenue.toLocaleString("ar-EG")} جنيه
                </span>
                <span className="text-sm text-gray-600">الإيرادات</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Traffic Sources */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-black text-gray-900 mb-6 text-right">
          أبرز مصادر الزيارات
        </h2>
        <div className="space-y-3">
          {data.topTrafficSources.map((source, idx) => {
            const totalVisits = data.topTrafficSources.reduce(
              (s, x) => s + x.visits,
              0
            );
            const percentage =
              totalVisits > 0
                ? ((source.visits / totalVisits) * 100).toFixed(1)
                : "0.0";
            return (
              <div key={idx} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">
                      {source.visits.toLocaleString("ar-EG")} زيارة ({percentage}%)
                    </span>
                    <span className="font-semibold text-gray-900">
                      {source.source}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${percentage}%`, background: "#3D1A6E" }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Recommendations */}
        <div className="p-6 rounded-2xl shadow-sm border border-gray-200" style={{ background: "#F5F0FF" }}>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-2xl">
            <AlertCircle size={24} style={{ color: "#3D1A6E" }} />
          </div>
          <div className="flex-1 text-right">
            <h2 className="text-xl font-black text-gray-900 mb-3">
              توصيات قابلة للتنفيذ
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 flex-row-reverse">
                <span className="font-black" style={{ color: "#E91E8C" }}>•</span>
                <span className="text-gray-700">
                  {data.cartAbandonment > 70
                    ? "نسبة تخلٍّ عن السلة مرتفعة. طبّق رسائل استرداد السلة وقلّل الاحتكاك في الدفع."
                    : "نسبة التخلي تحت السيطرة. واصل تحسين تجربة الدفع."}
                </span>
              </li>
              <li className="flex items-start gap-2 flex-row-reverse">
                <span className="font-black" style={{ color: "#E91E8C" }}>•</span>
                <span className="text-gray-700">
                  {data.customerRetentionRate < 25
                    ? "الاحتفاظ بالعملاء يحتاج اهتمامًا. أطلق برامج ولاء وحملات بريد إلكتروني مخصصة."
                    : "معدل احتفاظ ممتاز! فكّر في برامج VIP لأكثر عملائك وفاءً."}
                </span>
              </li>
              <li className="flex items-start gap-2 flex-row-reverse">
                <span className="font-black" style={{ color: "#E91E8C" }}>•</span>
                <span className="text-gray-700">
                  حسِّن المخزون لمنطقة {data.regionalDemand[0]?.region} حيث الطلب الأعلى.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({
  title, value, description, icon, color, trend,
}: {
  title: string; value: string; description: string;
  icon: React.ReactNode; color: string;
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
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${trendColors[trend]}`}>
          {trend === "good" ? "✓" : trend === "bad" ? "✗" : "!"}
        </span>
        <div className="p-3 rounded-2xl" style={{ background: `${color}18` }}>
          <div style={{ color }}>{icon}</div>
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1 text-right">{title}</h3>
      <p className="text-2xl font-black text-gray-900 mb-1 text-right">{value}</p>
      <p className="text-xs text-gray-500 text-right">{description}</p>
    </Card>
  );
}

function InsightRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100">
      <span className="font-black text-gray-900">{value}</span>
      <span className="text-gray-700">{label}</span>
    </div>
  );
}
