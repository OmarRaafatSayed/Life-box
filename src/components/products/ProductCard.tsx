"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import type { Product } from "@/types";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          className={
            rating >= i
              ? "fill-amber-400 text-amber-400"
              : rating >= i - 0.5
              ? "fill-amber-200 text-amber-400"
              : "fill-gray-100 text-gray-300"
          }
        />
      ))}
    </div>
  );
}

export function ProductCard({
  product,
  locale,
}: {
  product: Product;
  locale: string;
}) {
  const isAr = locale === "ar";
  const name = isAr ? product.nameAr : product.nameEn;

  const addItem = useCartStore((s) => s.addItem);
  const toggleItem = useWishlistStore((s) => s.toggleItem);
  const hasItem = useWishlistStore((s) => s.hasItem);
  const wished = hasItem(product.id);

  return (
    <div
      className="group relative flex flex-col bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
      style={{
        border: "2px solid #f0eaf8",
        boxShadow: "0 4px 24px rgba(61,26,110,0.07)",
      }}
    >
      {/* Image */}
      <Link href={`/${locale}/product/${product.id}`} className="block relative">
        <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-t-3xl">
          <Image
            src={product.images[0]}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        {/* Featured badge */}
        {product.featured && (
          <div
            className="absolute top-3 start-3 px-3 py-1 rounded-2xl text-white text-xs font-black"
            style={{ background: "linear-gradient(135deg, #E91E8C, #FF6B35)" }}
          >
            {isAr ? "مميز" : "Featured"}
          </div>
        )}

        {/* Stock badge */}
        {product.stock < 10 && (
          <div
            className="absolute top-3 end-12 px-3 py-1 rounded-2xl text-white text-xs font-black"
            style={{ background: "#FF6B35" }}
          >
            {isAr ? "نفاد قريب" : "Low Stock"}
          </div>
        )}
      </Link>

      {/* Wishlist button */}
      <button
        onClick={() => toggleItem(product)}
        aria-label="Toggle wishlist"
        className="absolute top-3 end-3 w-9 h-9 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
        style={{
          background: wished ? "#E91E8C" : "white",
          boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
        }}
      >
        <Heart
          size={16}
          className={wished ? "fill-white text-white" : "text-gray-400"}
        />
      </button>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-center gap-1.5">
          <Stars rating={product.rating} />
          <span className="text-xs text-gray-400">({product.reviewCount})</span>
        </div>

        <Link
          href={`/${locale}/product/${product.id}`}
          className="font-bold text-sm leading-snug line-clamp-2 hover:text-[#3D1A6E] transition-colors"
          style={{ color: "#1a0a3c" }}
          dir={isAr ? "rtl" : "ltr"}
        >
          {name}
        </Link>

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-lg font-black" style={{ color: "#3D1A6E" }}>
            {product.price.toFixed(0)}{" "}
            <span className="text-sm font-bold opacity-70">
              "جنيه"
            </span>
          </span>

          <button
            onClick={() => addItem(product, 1)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-black text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, #3D1A6E, #E91E8C)" }}
          >
            <ShoppingCart size={13} />
            {isAr ? "أضف" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
