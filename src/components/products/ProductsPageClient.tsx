"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ShoppingCart,
  Star,
  X,
} from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import { useCartStore } from "@/store/cartStore";
import type { Category } from "@/types";

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

const CATEGORIES: { value: Category | "ALL"; labelEn: string; labelAr: string }[] = [
  { value: "ALL", labelEn: "All Products", labelAr: "كل المنتجات" },
  { value: "HOME_UTILITIES", labelEn: "Home Utilities", labelAr: "أدوات منزلية" },
  { value: "HOUSEWARES", labelEn: "Housewares", labelAr: "أواني المطبخ" },
  { value: "HOME_TEXTILES", labelEn: "Home Textiles", labelAr: "المنسوجات" },
  { value: "DECORATIVE_ITEMS", labelEn: "Decorative Items", labelAr: "ديكورات" },
];

const SORT_OPTIONS = [
  { value: "newest", labelEn: "Newest First", labelAr: "الأحدث" },
  { value: "price_asc", labelEn: "Price: Low to High", labelAr: "السعر: الأقل أولاً" },
  { value: "price_desc", labelEn: "Price: High to Low", labelAr: "السعر: الأعلى أولاً" },
  { value: "rating", labelEn: "Highest Rated", labelAr: "الأعلى تقييمًا" },
];

interface Props {
  locale: string;
}

export function ProductsPageClient({ locale }: Props) {
  const isAr = locale === "ar";
  const addItem = useCartStore((s) => s.addItem);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "ALL">("ALL");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let products = [...MOCK_PRODUCTS];

    // Category filter
    if (selectedCategory !== "ALL") {
      products = products.filter((p) => p.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      products = products.filter(
        (p) =>
          p.nameEn.toLowerCase().includes(q) ||
          p.nameAr.includes(q) ||
          p.descEn.toLowerCase().includes(q) ||
          p.descAr.includes(q)
      );
    }

    // Price filter
    products = products.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    // Sort
    if (sortBy === "price_asc") {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      products.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      products.sort((a, b) => b.rating - a.rating);
    }

    return products;
  }, [selectedCategory, searchQuery, sortBy, minPrice, maxPrice]);

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
            {isAr ? "المنتجات" : "Products"}
          </span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-black">
            {isAr ? "جميع المنتجات" : "All Products"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length}{" "}
            {isAr ? "منتج" : filteredProducts.length === 1 ? "product" : "products"}
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder={isAr ? "ابحث عن منتج..." : "Search products..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as Category | "ALL")}
            className="px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-white"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {isAr ? cat.labelAr : cat.labelEn}
              </option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-white"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {isAr ? opt.labelAr : opt.labelEn}
              </option>
            ))}
          </select>

          {/* Filters Toggle (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden flex items-center gap-2 px-4 py-3 rounded-xl border border-border bg-white"
          >
            <SlidersHorizontal size={18} />
            {isAr ? "فلاتر" : "Filters"}
          </button>
        </div>

        {/* Price Filter (Desktop always visible, Mobile toggle) */}
        {(showFilters || typeof window !== "undefined" && window.innerWidth >= 640) && (
          <div className="mb-6 p-4 rounded-xl border border-border bg-muted/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold">
                {isAr ? "نطاق السعر" : "Price Range"}
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="sm:hidden"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                placeholder={isAr ? "من" : "Min"}
                className="w-24 px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <span className="text-muted-foreground">—</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                placeholder={isAr ? "إلى" : "Max"}
                className="w-24 px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <span className="text-sm text-muted-foreground">
                {isAr ? "جنيه" : "EGP"}
              </span>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl font-bold text-muted-foreground">
              {isAr ? "لم يتم العثور على منتجات" : "No products found"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product, idx) => {
              const name = isAr ? product.nameAr : product.nameEn;
              const desc = isAr ? product.descAr : product.descEn;
              const bg = CARD_COLORS[idx % CARD_COLORS.length];
              const accent = CARD_ACCENT[idx % CARD_ACCENT.length];

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: (idx % 12) * 0.04 }}
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
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex flex-col gap-1.5 px-1">
                    <span
                      className="w-fit text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                      style={{ background: bg, color: accent }}
                    >
                      {product.category.replace(/_/g, " ").toLowerCase()}
                    </span>

                    <Link
                      href={`/${locale}/product/${product.id}`}
                      className="text-xs sm:text-sm font-black leading-snug line-clamp-1 transition-colors"
                    >
                      {name}
                    </Link>

                    <p className="text-[10px] sm:text-[11px] leading-snug line-clamp-1 text-muted-foreground">
                      {desc}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={10}
                          fill={i < Math.floor(product.rating) ? accent : "none"}
                          stroke={
                            i < Math.floor(product.rating) ? accent : "#d1d5db"
                          }
                          strokeWidth={2}
                        />
                      ))}
                      <span className="text-[9px] text-muted-foreground ml-1">
                        ({product.reviewCount})
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs sm:text-sm font-black">
                        {product.price}{" "}
                        <span className="text-[9px] sm:text-[10px] font-semibold text-muted-foreground">
                          {isAr ? "جنيه" : "EGP"}
                        </span>
                      </span>

                      <button
                        onClick={() => addItem(product, 1)}
                        className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[11px] font-bold text-white transition-all hover:opacity-90 hover:scale-105 active:scale-95"
                        style={{ background: accent }}
                        aria-label={isAr ? "أضف للسلة" : "Add to cart"}
                      >
                        <ShoppingCart size={10} strokeWidth={2.5} />
                        {isAr ? "أضف" : "Add"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
