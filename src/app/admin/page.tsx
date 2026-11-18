import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle
} from "lucide-react";

// This will be replaced with actual database queries
async function getStats() {
  // TODO: Replace with actual Prisma queries
  return {
    totalRevenue: 125430.50,
    revenueChange: 12.5,
    totalOrders: 1284,
    ordersChange: 8.3,
    totalProducts: 456,
    productsChange: 5.2,
    totalCustomers: 892,
    customersChange: 15.7,
    pendingOrders: 23,
    lowStockProducts: 12,
    recentOrders: [
      { id: "ORD-1234", customer: "Ahmed Hassan", total: 1250, status: "PENDING" },
      { id: "ORD-1235", customer: "Sara Mohamed", total: 890, status: "PROCESSING" },
      { id: "ORD-1236", customer: "Omar Ali", total: 2100, status: "SHIPPED" },
    ],
    topProducts: [
      { name: "Premium Cotton Bedsheet Set", sales: 145, revenue: 43500 },
      { name: "Ceramic Dinner Set", sales: 98, revenue: 29400 },
      { name: "Stainless Steel Cookware", sales: 87, revenue: 34800 },
    ]
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value={`£${stats.totalRevenue.toLocaleString()}`}
          change={stats.revenueChange}
          icon={<DollarSign size={24} />}
          color="#10B981"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders.toLocaleString()}
          change={stats.ordersChange}
          icon={<ShoppingCart size={24} />}
          color="#3B82F6"
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts.toLocaleString()}
          change={stats.productsChange}
          icon={<Package size={24} />}
          color="#8B5CF6"
        />
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers.toLocaleString()}
          change={stats.customersChange}
          icon={<Users size={24} />}
          color="#F59E0B"
        />
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AlertCard
          title="Pending Orders"
          count={stats.pendingOrders}
          description="Orders waiting for processing"
          type="warning"
          link="/admin/orders?status=PENDING"
        />
        <AlertCard
          title="Low Stock Products"
          count={stats.lowStockProducts}
          description="Products running low on inventory"
          type="error"
          link="/admin/products?filter=low-stock"
        />
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-black text-gray-900 mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {stats.recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                <div>
                  <p className="font-semibold text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">£{order.total}</p>
                  <StatusBadge status={order.status} />
                </div>
              </div>
            ))}
          </div>
          <a href="/admin/orders" className="block mt-4 text-center text-sm font-semibold text-purple-600 hover:text-purple-700">
            View All Orders →
          </a>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-black text-gray-900 mb-4">Top Products</h2>
          <div className="space-y-3">
            {stats.topProducts.map((product, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                <div>
                  <p className="font-semibold text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.sales} sales</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">£{product.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          <a href="/admin/best-sellers" className="block mt-4 text-center text-sm font-semibold text-purple-600 hover:text-purple-700">
            View Detailed Analytics →
          </a>
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  change, 
  icon, 
  color 
}: { 
  title: string; 
  value: string; 
  change: number; 
  icon: React.ReactNode; 
  color: string; 
}) {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-2xl" style={{ background: `${color}15` }}>
          <div style={{ color }}>{icon}</div>
        </div>
        <div className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {Math.abs(change)}%
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-black text-gray-900">{value}</p>
    </div>
  );
}

function AlertCard({ 
  title, 
  count, 
  description, 
  type, 
  link 
}: { 
  title: string; 
  count: number; 
  description: string; 
  type: 'warning' | 'error'; 
  link: string; 
}) {
  const colors = {
    warning: { bg: '#FEF3C7', icon: '#F59E0B', text: '#92400E' },
    error: { bg: '#FEE2E2', icon: '#EF4444', text: '#991B1B' }
  };
  
  const color = colors[type];
  
  return (
    <a href={link} className="block bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-2xl" style={{ background: color.bg }}>
          <AlertCircle size={24} style={{ color: color.icon }} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-2">{description}</p>
          <p className="text-3xl font-black" style={{ color: color.icon }}>{count}</p>
        </div>
      </div>
    </a>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    PENDING: { bg: '#FEF3C7', text: '#92400E' },
    PROCESSING: { bg: '#DBEAFE', text: '#1E40AF' },
    SHIPPED: { bg: '#D1FAE5', text: '#065F46' },
    DELIVERED: { bg: '#D1FAE5', text: '#065F46' },
    CANCELLED: { bg: '#FEE2E2', text: '#991B1B' }
  };
  
  const color = colors[status] || colors.PENDING;
  
  return (
    <span 
      className="text-xs font-semibold px-2 py-1 rounded-full"
      style={{ background: color.bg, color: color.text }}
    >
      {status}
    </span>
  );
}
