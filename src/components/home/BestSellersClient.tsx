"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";

const CARD_COLORS = ["#E8F4FD","#FFF0E6","#EDF7ED","#F5F0FF","#FFF8E1","#FCE4EC","#E0F7FA","#F3E5F5"];
const CARD_ACCENT = ["#1E88E5","#E9682C","#2E7D32","#7C3AED","#F59E0B","#D63480","#00838F","#8E24AA"];

function BestSellerCard({ product, locale, rank }: { product: Product; locale: string; rank: number }) {
  const isAr = locale === "ar";
  const addItem = useCartStore((s) => s.addItem);
  const name = isAr ? product.nameAr : product.nameEn;
  const desc = isAr ? product.descAr : product.descEn;
  const bg     = CARD_COLORS[rank % CARD_COLORS.length];
  const accent = CARD_ACCENT[rank % CARD_ACCENT.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: rank * 0.06, ease: "easeOut" }}
      className="shrink-0 w-[210px] sm:w-[230px]"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="group flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-1">
        <Link
          href={`/${locale}/product/${product.id}`}
          className="block relative overflow-hidden rounded-2xl"
          style={{ background: bg }}
          aria-label={name}
        >
          <div className="relative w-full" style={{ aspectRatio: "1/1" }}>
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={name}
                fill
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="230px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ background: bg }}>
                <span className="text-4xl opacity-30">📦</span>
              </div>
            )}
          </div>
        </Link>

        <div className="flex flex-col gap-1.5 pt-3 px-0.5">
          <span
            className="w-fit text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{ background: bg, color: accent }}
          >
            {product.category.replace(/_/g, " ").toLowerCase()}
          </span>

          <Link
            href={`/${locale}/product/${product.id}`}
            className="text-sm font-black leading-snug line-clamp-1 transition-colors"
            style={{ color: "#0f0f0f" }}
          >
            {name}
          </Link>

          <p className="text-[11px] leading-snug line-clamp-1" style={{ color: "#6b7280" }}>
            {desc}
          </p>

          <div className="flex items-center justify-between mt-1">
            <span className="text-sm font-black" style={{ color: "#0f0f0f" }}>
              {product.price.toLocaleString("ar-EG")}
              <span className="text-[10px] font-semibold ms-1" style={{ color: "#6b7280" }}>
                {isAr ? "جنيه" : "EGP"}
              </span>
            </span>

            <button
              onClick={() => addItem(product, 1)}
              aria-label={isAr ? `أضف ${name} للسلة` : `Add ${name} to cart`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
              style={{ background: accent }}
            >
              <ShoppingCart size={11} strokeWidth={2.5} />
              {isAr ? "أضف" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function BestSellersClient({ products, locale }: { products: Product[]; locale: string }) {
  const isAr = locale === "ar";
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const delta = 460;
    el.scrollBy({ left: isAr ? (dir === "left" ? delta : -delta) : (dir === "left" ? -delta : delta), behavior: "smooth" });
  };

  return (
    <section className="w-full py-14 px-4 sm:px-6 lg:px-8 bg-white" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full text-white mb-3"
              style={{ background: "#E9682C" }}
            >
              <TrendingUp size={11} strokeWidth={2.5} aria-hidden="true" />
              {isAr ? "الأكثر مبيعا" : "Best Sellers"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "#0f0f0f" }}>
              {isAr ? "الأكثر طلبا" : "Most Ordered"}
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label={isAr ? "السابق" : "Previous"}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
              style={{ background: "#f4f4f5" }}
            >
              <ChevronLeft size={18} strokeWidth={2} style={{ color: "#374151" }} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label={isAr ? "التالي" : "Next"}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
              style={{ background: "#f4f4f5" }}
            >
              <ChevronRight size={18} strokeWidth={2} style={{ color: "#374151" }} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((p, i) => (
            <BestSellerCard key={p.id} product={p} locale={locale} rank={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
