"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, ChevronLeft, ArrowRight } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";

const CARD_COLORS = [
  "#E8F4FD",
  "#FFF0E6",
  "#EDF7ED",
  "#F5F0FF",
  "#FFF8E1",
  "#FCE4EC",
  "#E0F7FA",
  "#F3E5F5",
];

const CARD_ACCENT = [
  "#1E88E5",
  "#E9682C",
  "#2E7D32",
  "#7C3AED",
  "#F59E0B",
  "#D63480",
  "#00838F",
  "#8E24AA",
];

interface Props {
  locale: string;
}

export function WishlistPageClient({ locale }: Props) {
  const isAr = locale === "ar";
  const { items, removeItem } = useWishlistStore();
  const addToCart = useCartStore((s) => s.addItem);

  if (items.length === 0) {
    return (
      <main
        className="min-h-screen bg-white flex items-center justify-center px-4"
        dir={isAr ? "rtl" : "ltr"}
      >
        <div className="text-center max-w-md">
          <div
            className="w-24 h-24 rounded-3xl mx-auto mb-6 flex items-center justify-center"
            style={{ background: CARD_COLORS[5] }}
          >
            <Heart
              size={40}
              style={{ color: CARD_ACCENT[5] }}
              strokeWidth={2}
            />
          </div>
          <h1 className="text-3xl font-black mb-3">
            {isAr ? "قائمة أمنياتك فارغة" : "Your Wishlist is Empty"}
          </h1>
          <p className="text-muted-foreground mb-6">
            {isAr
              ? "ابدأ بإضافة منتجاتك المفضلة للقائمة"
              : "Start adding your favorite products"}
          </p>
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-bold transition-all hover:opacity-90 hover:scale-105"
            style={{ background: CARD_ACCENT[5] }}
          >
            {isAr ? "تصفح المنتجات" : "Browse Products"}
            <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link
            href={`/${locale}`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {isAr ? "الرئيسية" : "Home"}
          </Link>
          <ChevronLeft size={14} className="text-muted-foreground" />
          <span className="text-foreground font-semibold">
            {isAr ? "قائمة الأمنيات" : "Wishlist"}
          </span>
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl sm:text-4xl font-black">
            {isAr ? "قائمة الأمنيات" : "My Wishlist"}
          </h1>
          <div className="flex items-center gap-2">
            <Heart size={20} style={{ color: CARD_ACCENT[5] }} />
            <span className="text-lg font-bold">{items.length}</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product, idx) => {
            const name = isAr ? product.nameAr : product.nameEn;
            const desc = isAr ? product.descAr : product.descEn;
            const bg = CARD_COLORS[idx % CARD_COLORS.length];
            const accent = CARD_ACCENT[idx % CARD_ACCENT.length];

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group flex flex-col"
              >
                {/* Image */}
                <Link
                  href={`/${locale}/product/${product.id}`}
                  className="relative block rounded-2xl overflow-hidden mb-3"
                  style={{ background: bg, aspectRatio: "1/1" }}
                >
                  <Image
                    src={product.images[0]}
                    alt={name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeItem(product.id);
                    }}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 hover:bg-red-50"
                    aria-label={isAr ? "إزالة من المفضلة" : "Remove from wishlist"}
                  >
                    <Heart size={16} fill="#DC2626" stroke="#DC2626" />
                  </button>
                </Link>

                {/* Info */}
                <div className="flex flex-col gap-1.5 px-1">
                  <span
                    className="w-fit text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{ background: bg, color: accent }}
                  >
                    {product.category.replace(/_/g, " ").toLowerCase()}
                  </span>

                  <Link
                    href={`/${locale}/product/${product.id}`}
                    className="text-sm font-black leading-snug line-clamp-1 transition-colors"
                  >
                    {name}
                  </Link>

                  <p className="text-[11px] leading-snug line-clamp-1 text-muted-foreground">
                    {desc}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-black">
                      {product.price}{" "}
                      <span className="text-[10px] font-semibold text-muted-foreground">
                        {isAr ? "جنيه" : "EGP"}
                      </span>
                    </span>

                    <button
                      onClick={() => {
                        addToCart(product, 1);
                        removeItem(product.id);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold text-white transition-all hover:opacity-90 hover:scale-105 active:scale-95"
                      style={{ background: accent }}
                      aria-label={isAr ? "أضف للسلة" : "Add to cart"}
                    >
                      <ShoppingCart size={11} strokeWidth={2.5} />
                      {isAr ? "أضف" : "Add"}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
