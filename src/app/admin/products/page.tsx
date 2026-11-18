import Image from "next/image";
import { getAdminProducts } from "@/lib/actions/admin";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div className="p-6 sm:p-10 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black" style={{ color: "#1a0a3c" }}>
            المنتجات
          </h1>
          <p className="text-gray-500 mt-1">{products.length} منتج إجمالي</p>
        </div>
        <button
          className="px-6 py-3 rounded-3xl text-white font-black text-sm transition-all hover:opacity-90"
          style={{ background: "#3D1A6E" }}
        >
          + إضافة منتج
        </button>
      </div>

      {products.length === 0 ? (
        <div
          className="bg-white rounded-3xl p-12 text-center"
          style={{ border: "2px solid #f0eaf8" }}
        >
          <p className="text-gray-400 text-lg">لا توجد منتجات بعد</p>
          <p className="text-gray-400 text-sm mt-2">
            أضف أول منتج لبدء البيع
          </p>
        </div>
      ) : (
        <div
          className="bg-white rounded-3xl overflow-hidden"
          style={{ border: "2px solid #f0eaf8" }}
        >
          {/* Table Header */}
          <div
            className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-0 text-xs font-black uppercase tracking-wider text-gray-400 px-6 py-4"
            style={{ background: "#FAFAFA" }}
          >
            <div className="w-16 me-4">الصورة</div>
            <div className="text-right">المنتج</div>
            <div className="w-32 text-center">الفئة</div>
            <div className="w-24 text-center">السعر</div>
            <div className="w-20 text-center">المخزون</div>
            <div className="w-28 text-center">الإجراءات</div>
          </div>

          <div className="divide-y divide-gray-50">
            {products.map((p) => (
              <div
                key={p.id}
                className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-0 items-center px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                {/* Image */}
                <div className="w-16 me-4">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden relative bg-gray-100">
                    {p.images[0] ? (
                      <Image
                        src={p.images[0]}
                        alt={p.nameAr}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                        صورة
                      </div>
                    )}
                  </div>
                </div>

                {/* Name */}
                <div className="text-right">
                  <p className="font-bold text-sm" style={{ color: "#1a0a3c" }}>
                    {p.nameAr}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{p.nameEn}</p>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">{p.sku}</p>
                  {p.featured && (
                    <span
                      className="inline-block px-2 py-0.5 rounded-xl text-[10px] font-black mt-1"
                      style={{ background: "#F5F0FF", color: "#3D1A6E" }}
                    >
                      مميز
                    </span>
                  )}
                </div>

                {/* Category */}
                <div className="w-32 text-center">
                  <span
                    className="px-3 py-1 rounded-2xl text-xs font-bold"
                    style={{ background: "#F5F0FF", color: "#3D1A6E" }}
                  >
                    {p.categoryAr}
                  </span>
                </div>

                {/* Price */}
                <div
                  className="w-24 text-center font-black text-sm"
                  style={{ color: "#3D1A6E" }}
                >
                  {p.price.toLocaleString("ar-EG")} جنيه
                </div>

                {/* Stock */}
                <div className="w-20 text-center">
                  <span
                    className="text-sm font-bold"
                    style={{ color: p.stock < 20 ? "#FF6B35" : "#059669" }}
                  >
                    {p.stock}
                  </span>
                </div>

                {/* Actions */}
                <div className="w-28 flex items-center justify-center gap-2">
                  <a
                    href={`/admin/products/${p.id}/edit`}
                    className="px-3 py-1.5 rounded-2xl text-xs font-bold transition-all hover:opacity-80"
                    style={{ background: "#F5F0FF", color: "#3D1A6E" }}
                  >
                    تعديل
                  </a>
                  <DeleteProductButton id={p.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DeleteProductButton({ id }: { id: string }) {
  return (
    <a
      href={`/api/admin/products/${id}/delete`}
      className="px-3 py-1.5 rounded-2xl text-xs font-bold transition-all hover:opacity-80"
      style={{ background: "#FEF2F2", color: "#DC2626" }}
      onClick={(e) => {
        if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) e.preventDefault();
      }}
    >
      حذف
    </a>
  );
}
