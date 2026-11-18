"use client";

import { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import type { Product } from "@/types";

export default function ProductActions({ product, locale }: { product: Product; locale: string }) {
  const isAr = locale === "ar";
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const toggleItem = useWishlistStore((s) => s.toggleItem);
  const hasItem = useWishlistStore((s) => s.hasItem);
  const wished = hasItem(product.id);

  function handleAdd() {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Qty stepper */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-gray-600">{isAr ? "الكمية" : "Quantity"}:</span>
        <div className="flex items-center rounded-3xl overflow-hidden border-2" style={{ borderColor: "#3D1A6E" }}>
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-10 h-10 font-black text-lg transition-colors hover:bg-[#F5F0FF]"
            style={{ color: "#3D1A6E" }}
          >
            −
          </button>
          <span className="w-10 text-center font-black" style={{ color: "#3D1A6E" }}>{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
            className="w-10 h-10 font-black text-lg transition-colors hover:bg-[#F5F0FF]"
            style={{ color: "#3D1A6E" }}
          >
            +
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleAdd}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-3xl text-white font-black text-base transition-all duration-200 hover:scale-105 hover:shadow-xl"
          style={{
            background: added
              ? "linear-gradient(135deg, #059669, #10B981)"
              : "linear-gradient(135deg, #3D1A6E, #E91E8C)",
          }}
        >
          <ShoppingCart size={20} />
          {added
            ? isAr ? "تمت الإضافة ✓" : "Added to Cart ✓"
            : isAr ? "أضف إلى السلة" : "Add to Cart"}
        </button>

        <button
          onClick={() => toggleItem(product)}
          className="w-14 h-14 rounded-3xl flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={
            wished
              ? { background: "#E91E8C" }
              : { background: "#FFF0F8", border: "2px solid #E91E8C" }
          }
        >
          <Heart size={22} className={wished ? "fill-white text-white" : "text-[#E91E8C]"} />
        </button>
      </div>
    </div>
  );
}
