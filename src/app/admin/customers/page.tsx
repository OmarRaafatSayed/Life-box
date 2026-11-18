import { getCustomersWithSpend } from "@/lib/actions/admin";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const customers = await getCustomersWithSpend();

  return (
    <div className="p-6 sm:p-10 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black" style={{ color: "#1a0a3c" }}>
          العملاء
        </h1>
        <p className="text-gray-500 mt-1">{customers.length} عميل مسجّل</p>
      </div>

      {customers.length === 0 ? (
        <div
          className="bg-white rounded-3xl p-12 text-center"
          style={{ border: "2px solid #f0eaf8" }}
        >
          <p className="text-gray-400 text-lg">لا يوجد عملاء بعد</p>
          <p className="text-gray-400 text-sm mt-2">
            ستظهر بيانات العملاء هنا بعد أول طلب
          </p>
        </div>
      ) : (
        <div
          className="bg-white rounded-3xl overflow-hidden"
          style={{ border: "2px solid #f0eaf8" }}
        >
          <div className="divide-y divide-gray-50">
            {customers.map((c) => {
              const initials = c.fullName
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .slice(0, 2);
              return (
                <div
                  key={c.email}
                  className="flex flex-wrap items-center gap-4 px-6 py-5 hover:bg-gray-50 transition-colors"
                >
                  <div
                    className="w-12 h-12 rounded-3xl flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                    style={{ background: "#3D1A6E" }}
                  >
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0 text-right">
                    <p
                      className="font-black text-sm"
                      style={{ color: "#1a0a3c" }}
                    >
                      {c.fullName}
                    </p>
                    <p className="text-xs text-gray-400">{c.email}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      انضم في {c.joined?.split("T")[0] ?? "—"}
                    </p>
                  </div>
                  <div className="text-center">
                    <p
                      className="text-2xl font-black"
                      style={{ color: "#3D1A6E" }}
                    >
                      {c.count}
                    </p>
                    <p className="text-xs text-gray-400">طلبات</p>
                  </div>
                  <div className="text-center">
                    <p
                      className="text-2xl font-black"
                      style={{ color: "#E91E8C" }}
                    >
                      {c.total.toLocaleString("ar-EG")}
                    </p>
                    <p className="text-xs text-gray-400">جنيه منفق</p>
                  </div>
                  <a
                    href={`/admin/orders?customer=${encodeURIComponent(c.email)}`}
                    className="px-4 py-2 rounded-2xl text-xs font-bold transition-all hover:opacity-80"
                    style={{ background: "#F5F0FF", color: "#3D1A6E" }}
                  >
                    عرض الطلبات
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
