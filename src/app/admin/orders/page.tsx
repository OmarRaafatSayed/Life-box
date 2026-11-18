const ORDERS = [
  { id: "ord-001", orderNumber: "LB-A1B2C3", customer: "Ahmed Al-Rashid", email: "ahmed@example.com", total: 405, status: "DELIVERED", date: "2025-01-10", items: 2 },
  { id: "ord-002", orderNumber: "LB-D4E5F6", customer: "Fatima Hassan",   email: "fatima@example.com", total: 220, status: "SHIPPED",   date: "2025-01-12", items: 1 },
  { id: "ord-003", orderNumber: "LB-G7H8I9", customer: "Omar Khalid",    email: "omar@example.com",   total: 310, status: "PROCESSING",date: "2025-01-14", items: 1 },
  { id: "ord-004", orderNumber: "LB-J1K2L3", customer: "Layla Mansour",  email: "layla@example.com",  total: 95,  status: "PENDING",    date: "2025-01-15", items: 1 },
  { id: "ord-005", orderNumber: "LB-M4N5O6", customer: "Khalid Al-Otaibi",email:"khalid@example.com",total: 165, status: "CANCELLED",  date: "2025-01-16", items: 1 },
];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  DELIVERED:  { bg: "#E8FFF3", color: "#059669" },
  SHIPPED:    { bg: "#EFF6FF", color: "#2563EB" },
  PROCESSING: { bg: "#FFF5F0", color: "#FF6B35" },
  PENDING:    { bg: "#F5F0FF", color: "#3D1A6E" },
  CANCELLED:  { bg: "#FEF2F2", color: "#DC2626" },
};

export default function AdminOrdersPage() {
  return (
    <div className="p-6 sm:p-10 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black" style={{ color: "#1a0a3c" }}>Orders</h1>
        <p className="text-gray-500 mt-1">{ORDERS.length} total orders</p>
      </div>

      {/* Status filter chips */}
      <div className="flex flex-wrap gap-3 mb-8">
        {["ALL", "PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].map((s) => (
          <span
            key={s}
            className="px-4 py-2 rounded-3xl text-sm font-bold cursor-pointer transition-all hover:scale-105"
            style={
              s === "ALL"
                ? { background: "linear-gradient(135deg, #3D1A6E, #E91E8C)", color: "white" }
                : { background: (STATUS_STYLES[s]?.bg ?? "#F5F5F5"), color: (STATUS_STYLES[s]?.color ?? "#666") }
            }
          >
            {s}
          </span>
        ))}
      </div>

      <div className="bg-white rounded-3xl overflow-hidden" style={{ border: "2px solid #f0eaf8" }}>
        <div className="flex flex-col divide-y divide-gray-50">
          {ORDERS.map((o) => {
            const s = STATUS_STYLES[o.status] ?? { bg: "#F5F5F5", color: "#666" };
            return (
              <div key={o.id} className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-black text-sm" style={{ color: "#3D1A6E" }}>{o.orderNumber}</p>
                  <p className="text-sm font-bold mt-0.5" style={{ color: "#1a0a3c" }}>{o.customer}</p>
                  <p className="text-xs text-gray-400">{o.email}</p>
                </div>
                <div className="text-sm text-gray-400">{o.date}</div>
                <div>
                  <p className="text-xs text-gray-400">{o.items} item{o.items > 1 ? "s" : ""}</p>
                  <p className="font-black" style={{ color: "#1a0a3c" }}>{o.total} جنيه</p>
                </div>
                <span
                  className="px-4 py-2 rounded-3xl text-xs font-black"
                  style={{ background: s.bg, color: s.color }}
                >
                  {o.status}
                </span>
                <button
                  className="px-4 py-2 rounded-2xl text-xs font-bold transition-all hover:scale-105"
                  style={{ background: "#F5F0FF", color: "#3D1A6E" }}
                >
                  Update Status
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
