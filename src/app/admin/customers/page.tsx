const CUSTOMERS = [
  { name: "Ahmed Al-Rashid",   email: "ahmed@example.com",  orders: 3, total: 1200, joined: "2024-11-01" },
  { name: "Fatima Hassan",     email: "fatima@example.com", orders: 2, total: 450,  joined: "2024-12-05" },
  { name: "Omar Khalid",       email: "omar@example.com",   orders: 1, total: 310,  joined: "2025-01-02" },
  { name: "Layla Mansour",     email: "layla@example.com",  orders: 2, total: 540,  joined: "2024-10-15" },
  { name: "Khalid Al-Otaibi",  email: "khalid@example.com", orders: 1, total: 165,  joined: "2025-01-10" },
];

export default function AdminCustomersPage() {
  return (
    <div className="p-6 sm:p-10 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black" style={{ color: "#1a0a3c" }}>Customers</h1>
        <p className="text-gray-500 mt-1">{CUSTOMERS.length} registered customers</p>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden" style={{ border: "2px solid #f0eaf8" }}>
        <div className="divide-y divide-gray-50">
          {CUSTOMERS.map((c) => {
            const initials = c.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
            return (
              <div key={c.email} className="flex flex-wrap items-center gap-4 px-6 py-5 hover:bg-gray-50 transition-colors">
                {/* Avatar */}
                <div
                  className="w-12 h-12 rounded-3xl flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #3D1A6E, #E91E8C)" }}
                >
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm" style={{ color: "#1a0a3c" }}>{c.name}</p>
                  <p className="text-xs text-gray-400">{c.email}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Joined {c.joined}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black" style={{ color: "#3D1A6E" }}>{c.orders}</p>
                  <p className="text-xs text-gray-400">Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black" style={{ color: "#E91E8C" }}>{c.total}</p>
                  <p className="text-xs text-gray-400">جنيه منفق</p>
                </div>
                <button
                  className="px-4 py-2 rounded-2xl text-xs font-bold transition-all hover:scale-105"
                  style={{ background: "#F5F0FF", color: "#3D1A6E" }}
                >
                  View Orders
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
