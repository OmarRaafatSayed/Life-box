import { MOCK_PRODUCTS } from "@/lib/mockData";
import Image from "next/image";

export default function AdminProductsPage() {
  return (
    <div className="p-6 sm:p-10 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black" style={{ color: "#1a0a3c" }}>Products</h1>
          <p className="text-gray-500 mt-1">{MOCK_PRODUCTS.length} total products</p>
        </div>
        <button
          className="px-6 py-3 rounded-3xl text-white font-black text-sm transition-all hover:scale-105 hover:shadow-lg"
          style={{ background: "linear-gradient(135deg, #3D1A6E, #E91E8C)" }}
        >
          + Add Product
        </button>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden" style={{ border: "2px solid #f0eaf8" }}>
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-0 text-xs font-black uppercase tracking-wider text-gray-400 px-6 py-4" style={{ background: "#FAFAFA" }}>
          <div className="w-16 me-4">Image</div>
          <div>Product</div>
          <div className="w-32 text-center">Category</div>
          <div className="w-24 text-center">Price</div>
          <div className="w-20 text-center">Stock</div>
          <div className="w-24 text-center">Actions</div>
        </div>
        <div className="divide-y divide-gray-50">
          {MOCK_PRODUCTS.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-0 items-center px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="w-16 me-4">
                <div className="w-12 h-12 rounded-2xl overflow-hidden relative">
                  <Image src={p.images[0]} alt={p.nameEn} fill className="object-cover" unoptimized />
                </div>
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: "#1a0a3c" }}>{p.nameEn}</p>
                <p className="text-xs text-gray-400 mt-0.5">{p.nameAr}</p>
                {p.featured && (
                  <span
                    className="inline-block px-2 py-0.5 rounded-xl text-[10px] font-black mt-1"
                    style={{ background: "#F5F0FF", color: "#3D1A6E" }}
                  >
                    Featured
                  </span>
                )}
              </div>
              <div className="w-32 text-center">
                <span
                  className="px-3 py-1 rounded-2xl text-xs font-bold"
                  style={{ background: "#F5F0FF", color: "#3D1A6E" }}
                >
                  {p.category.replace(/_/g, " ")}
                </span>
              </div>
              <div className="w-24 text-center font-black text-sm" style={{ color: "#3D1A6E" }}>
                {p.price} جنيه
              </div>
              <div className="w-20 text-center">
                <span
                  className="text-sm font-bold"
                  style={{ color: p.stock < 20 ? "#FF6B35" : "#059669" }}
                >
                  {p.stock}
                </span>
              </div>
              <div className="w-24 flex items-center justify-center gap-2">
                <button
                  className="px-3 py-1.5 rounded-2xl text-xs font-bold transition-all hover:scale-105"
                  style={{ background: "#F5F0FF", color: "#3D1A6E" }}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1.5 rounded-2xl text-xs font-bold transition-all hover:scale-105"
                  style={{ background: "#FEF2F2", color: "#DC2626" }}
                >
                  Del
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
