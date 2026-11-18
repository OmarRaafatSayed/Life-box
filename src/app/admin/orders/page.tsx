import { getAdminOrders, adminUpdateOrderStatus } from "@/lib/actions/admin";

export const dynamic = "force-dynamic";

const STATUS_AR: Record<string, string> = {
  DELIVERED: "تم التوصيل",
  SHIPPED: "تم الشحن",
  PROCESSING: "قيد المعالجة",
  PENDING: "قيد الانتظار",
  CANCELLED: "ملغي",
};

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  DELIVERED: { bg: "#E8FFF3", color: "#059669" },
  SHIPPED: { bg: "#E0F7FA", color: "#00838F" },
  PROCESSING: { bg: "#FFF5F0", color: "#FF6B35" },
  PENDING: { bg: "#F5F0FF", color: "#3D1A6E" },
  CANCELLED: { bg: "#FEF2F2", color: "#DC2626" },
};

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();

  return (
    <div className="p-6 sm:p-10 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black" style={{ color: "#1a0a3c" }}>
          الطلبات
        </h1>
        <p className="text-gray-500 mt-1">{orders.length} طلب إجمالي</p>
      </div>

      {/* Status filter chips */}
      <div className="flex flex-wrap gap-3 mb-8">
        {[
          { key: "ALL", label: "الكل" },
          { key: "PENDING", label: "قيد الانتظار" },
          { key: "PROCESSING", label: "قيد المعالجة" },
          { key: "SHIPPED", label: "تم الشحن" },
          { key: "DELIVERED", label: "تم التوصيل" },
          { key: "CANCELLED", label: "ملغي" },
        ].map(({ key, label }) => (
          <span
            key={key}
            className="px-4 py-2 rounded-3xl text-sm font-bold cursor-pointer transition-all hover:opacity-80"
            style={
              key === "ALL"
                ? { background: "#3D1A6E", color: "white" }
                : {
                    background: STATUS_STYLES[key]?.bg ?? "#F5F5F5",
                    color: STATUS_STYLES[key]?.color ?? "#666",
                  }
            }
          >
            {label}
          </span>
        ))}
      </div>

      {orders.length === 0 ? (
        <div
          className="bg-white rounded-3xl p-12 text-center"
          style={{ border: "2px solid #f0eaf8" }}
        >
          <p className="text-gray-400 text-lg">لا توجد طلبات بعد</p>
        </div>
      ) : (
        <div
          className="bg-white rounded-3xl overflow-hidden"
          style={{ border: "2px solid #f0eaf8" }}
        >
          <div className="flex flex-col divide-y divide-gray-50">
            {orders.map((o) => {
              const s = STATUS_STYLES[o.status] ?? { bg: "#F5F5F5", color: "#666" };
              return (
                <div
                  key={o.id}
                  className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="text-right">
                    <p className="font-black text-sm" style={{ color: "#3D1A6E" }}>
                      {o.orderNumber}
                    </p>
                    <p
                      className="text-sm font-bold mt-0.5"
                      style={{ color: "#1a0a3c" }}
                    >
                      {o.customer}
                    </p>
                    <p className="text-xs text-gray-400">{o.email}</p>
                  </div>

                  <div className="text-sm text-gray-400">{o.date}</div>

                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      {o.items} {o.items === 1 ? "منتج" : "منتجات"}
                    </p>
                    <p className="font-black" style={{ color: "#1a0a3c" }}>
                      {o.total.toLocaleString("ar-EG")} جنيه
                    </p>
                  </div>

                  <span
                    className="px-4 py-2 rounded-3xl text-xs font-black"
                    style={{ background: s.bg, color: s.color }}
                  >
                    {STATUS_AR[o.status] ?? o.status}
                  </span>

                  <UpdateStatusForm orderId={o.id} currentStatus={o.status} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function UpdateStatusForm({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  async function updateAction(formData: FormData) {
    "use server";
    const status = formData.get("status") as string;
    await adminUpdateOrderStatus(orderId, status);
  }

  return (
    <form action={updateAction} className="flex items-center gap-2">
      <select
        name="status"
        defaultValue={currentStatus}
        className="px-3 py-2 rounded-2xl text-xs font-bold border border-gray-200 text-right"
        style={{ direction: "rtl", color: "#3D1A6E" }}
      >
        <option value="PENDING">قيد الانتظار</option>
        <option value="PROCESSING">قيد المعالجة</option>
        <option value="SHIPPED">تم الشحن</option>
        <option value="DELIVERED">تم التوصيل</option>
        <option value="CANCELLED">ملغي</option>
      </select>
      <button
        type="submit"
        className="px-4 py-2 rounded-2xl text-xs font-bold transition-all hover:opacity-80"
        style={{ background: "#F5F0FF", color: "#3D1A6E" }}
      >
        تحديث
      </button>
    </form>
  );
}
