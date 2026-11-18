import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { getAdminOverviewData } from "@/lib/actions/admin";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const { stats, recentOrders, topProducts, lowStockCount, pendingCount } =
    await getAdminOverviewData();

  const todaySales = recentOrders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((s, o) => s + o.total, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">نظرة عامة</h1>
          <p className="text-gray-600 mt-1">مرحبًا! إليك ما يحدث في متجرك.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock size={16} />
          <span>بيانات حية من قاعدة البيانات</span>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="إجمالي الإيرادات"
          value={`${stats.totalRevenue.toLocaleString("ar-EG")} جنيه`}
          icon={<DollarSign size={24} />}
          accentColor="#3D1A6E"
        />
        <StatCard
          title="إجمالي الطلبات"
          value={stats.totalOrders.toLocaleString("ar-EG")}
          icon={<ShoppingCart size={24} />}
          accentColor="#E91E8C"
        />
        <StatCard
          title="المنتجات"
          value={stats.totalProducts.toLocaleString("ar-EG")}
          icon={<Package size={24} />}
          accentColor="#00BCD4"
        />
        <StatCard
          title="العملاء"
          value={stats.totalCustomers.toLocaleString("ar-EG")}
          icon={<Users size={24} />}
          accentColor="#FF6B35"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickStatCard
          label="مبيعات آخر الطلبات"
          value={`${todaySales.toLocaleString("ar-EG")} جنيه`}
          color="#3D1A6E"
        />
        <QuickStatCard
          label="طلبات قيد الانتظار"
          value={pendingCount.toString()}
          color="#FF6B35"
        />
        <QuickStatCard
          label="مخزون منخفض"
          value={lowStockCount.toString()}
          color="#E91E8C"
        />
        <QuickStatCard
          label="تم التوصيل"
          value={stats.ordersByStatus.DELIVERED.toString()}
          color="#00BCD4"
        />
      </div>

      {/* Orders by Status */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {(
          [
            ["PENDING", "قيد الانتظار", "#FF6B35"],
            ["PROCESSING", "قيد المعالجة", "#3D1A6E"],
            ["SHIPPED", "تم الشحن", "#00BCD4"],
            ["DELIVERED", "تم التوصيل", "#059669"],
            ["CANCELLED", "ملغي", "#DC2626"],
          ] as [keyof typeof stats.ordersByStatus, string, string][]
        ).map(([key, label, color]) => (
          <div
            key={key}
            className="bg-white rounded-2xl border border-gray-200 p-4 text-center"
          >
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className="text-2xl font-black" style={{ color }}>
              {stats.ordersByStatus[key]}
            </p>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">آخر الطلبات</h2>
              <p className="text-sm text-gray-600 mt-0.5">أحدث طلبات العملاء</p>
            </div>
            <a
              href="/admin/orders"
              className="text-sm font-semibold flex items-center gap-1 hover:opacity-80"
              style={{ color: "#3D1A6E" }}
            >
              عرض الكل
              <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="overflow-x-auto">
            {recentOrders.length === 0 ? (
              <div className="text-center py-12 text-gray-400">لا توجد طلبات بعد</div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">
                      رقم الطلب
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">
                      العميل
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">
                      المبلغ
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">
                      الحالة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">
                      الوقت
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 text-right">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right">
                        {order.total.toLocaleString("ar-EG")} جنيه
                      </td>
                      <td className="px-6 py-4 text-right">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 text-right">
                        {order.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Alerts + Top Products */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">التنبيهات</h2>
            </div>
            <div className="p-4 space-y-3">
              <AlertCard
                title="طلبات معلّقة"
                count={pendingCount}
                description="تحتاج للمعالجة"
                type="warning"
                link="/admin/orders?status=PENDING"
              />
              <AlertCard
                title="مخزون منخفض"
                count={lowStockCount}
                description="منتجات تقترب من النفاد"
                type="error"
                link="/admin/products?filter=low-stock"
              />
            </div>
          </div>

          {topProducts.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">أفضل المنتجات</h2>
                <a
                  href="/admin/best-sellers"
                  className="text-sm font-semibold hover:opacity-80"
                  style={{ color: "#3D1A6E" }}
                >
                  عرض الكل
                </a>
              </div>
              <div className="p-4 space-y-3">
                {topProducts.map((product, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ background: "#3D1A6E" }}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0 text-right">
                      <p className="font-semibold text-sm text-gray-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {product.sales} وحدة
                      </p>
                    </div>
                    <div className="text-left flex-shrink-0">
                      <p className="font-bold text-sm text-gray-900">
                        {product.revenue.toLocaleString("ar-EG")} جنيه
                      </p>
                      {product.trend === "up" ? (
                        <TrendingUp size={14} className="text-green-500 mr-auto" />
                      ) : (
                        <TrendingDown size={14} className="text-red-500 mr-auto" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  accentColor,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  accentColor: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl text-white" style={{ background: accentColor }}>
          {icon}
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1 text-right">{title}</h3>
      <p className="text-3xl font-black text-gray-900 text-right">{value}</p>
    </div>
  );
}

function QuickStatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      className="rounded-xl border-2 p-4"
      style={{ background: `${color}10`, borderColor: `${color}30`, color }}
    >
      <p className="text-xs font-semibold uppercase opacity-70 mb-1 text-right">{label}</p>
      <p className="text-2xl font-black text-right">{value}</p>
    </div>
  );
}

function AlertCard({
  title,
  count,
  description,
  type,
  link,
}: {
  title: string;
  count: number;
  description: string;
  type: "warning" | "error";
  link: string;
}) {
  const colors = {
    warning: { bg: "bg-yellow-50", icon: "text-yellow-600", border: "border-yellow-200" },
    error: { bg: "bg-red-50", icon: "text-red-600", border: "border-red-200" },
  };
  const color = colors[type];
  return (
    <a
      href={link}
      className={`block ${color.bg} border-2 ${color.border} rounded-xl p-4 hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start gap-3">
        <AlertCircle size={20} className={color.icon} />
        <div className="flex-1 text-right">
          <h3 className="font-bold text-gray-900 text-sm mb-0.5">{title}</h3>
          <p className="text-xs text-gray-600 mb-2">{description}</p>
          <p className={`text-2xl font-black ${color.icon}`}>{count}</p>
        </div>
      </div>
    </a>
  );
}

const STATUS_AR: Record<string, string> = {
  PENDING: "قيد الانتظار",
  PROCESSING: "قيد المعالجة",
  SHIPPED: "تم الشحن",
  DELIVERED: "تم التوصيل",
  CANCELLED: "ملغي",
};

const STATUS_COLORS: Record<
  string,
  { bg: string; text: string; Icon: typeof Clock }
> = {
  PENDING: { bg: "bg-yellow-50", text: "text-yellow-700", Icon: Clock },
  PROCESSING: { bg: "bg-blue-50", text: "text-blue-700", Icon: Clock },
  SHIPPED: { bg: "bg-cyan-50", text: "text-cyan-700", Icon: Package },
  DELIVERED: { bg: "bg-green-50", text: "text-green-700", Icon: CheckCircle2 },
  CANCELLED: { bg: "bg-red-50", text: "text-red-700", Icon: XCircle },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_COLORS[status] ?? {
    bg: "bg-gray-50",
    text: "text-gray-700",
    Icon: Clock,
  };
  const Icon = cfg.Icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}
    >
      <Icon size={12} />
      {STATUS_AR[status] ?? status}
    </span>
  );
}
