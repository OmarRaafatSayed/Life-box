"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Star,
  Check,
  Truck,
  Shield,
  RefreshCw,
  ChevronLeft,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import type { Product } from "@/types";

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
  product: Product;
  locale: string;
}

export function ProductDetailClient({ product, locale }: Props) {
  const isAr = locale === "ar";
  const name = isAr ? product.nameAr : product.nameEn;
  const desc = isAr ? product.descAr : product.descEn;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors[0]
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes[0]
  );
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, hasItem } = useWishlistStore();
  const inWishlist = hasItem(product.id);

  const bg = CARD_COLORS[0];
  const accent = CARD_ACCENT[0];

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor, selectedSize);
  };

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
          <Link
            href={`/${locale}/products`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {isAr ? "المنتجات" : "Products"}
          </Link>
          <ChevronLeft size={14} className="text-muted-foreground" />
          <span className="text-foreground font-semibold">{name}</span>
        </nav>

        {/* Product Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              className="relative rounded-3xl overflow-hidden"
              style={{ background: bg, aspectRatio: "1/1" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={product.images[selectedImage]}
                alt={name}
                fill
                unoptimized
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative rounded-2xl overflow-hidden transition-all ${
                      selectedImage === i
                        ? "ring-4 ring-offset-2 scale-95"
                        : "opacity-60 hover:opacity-100"
                    }`}
                    style={{
                      width: 80,
                      height: 80,
                      background: bg,
                      ...(selectedImage === i && { ringColor: accent }),
                    }}
                  >
                    <Image
                      src={img}
                      alt={`${name} ${i + 1}`}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="flex flex-col">
            {/* Category Badge */}
            <span
              className="w-fit text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-3"
              style={{ background: bg, color: accent }}
            >
              {product.category.replace(/_/g, " ").toLowerCase()}
            </span>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-black mb-3">{name}</h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(product.rating) ? accent : "none"}
                    stroke={i < Math.floor(product.rating) ? accent : "#d1d5db"}
                    strokeWidth={2}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount}{" "}
                {isAr ? "تقييم" : "reviews"})
              </span>
            </div>

            {/* Description */}
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              {desc}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-black">{product.price}</span>
              <span className="text-xl font-semibold text-muted-foreground">
                {isAr ? "جنيه" : "EGP"}
              </span>
            </div>

            {/* Stock Status */}
            {product.stock > 0 ? (
              <div className="flex items-center gap-2 mb-6">
                <Check size={16} className="text-green-600" strokeWidth={3} />
                <span className="text-sm font-semibold text-green-600">
                  {isAr ? "متوفر في المخزون" : "In Stock"} ({product.stock}{" "}
                  {isAr ? "وحدة" : "units"})
                </span>
              </div>
            ) : (
              <div className="text-sm font-semibold text-destructive mb-6">
                {isAr ? "نفذ من المخزون" : "Out of Stock"}
              </div>
            )}

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-bold mb-3">
                  {isAr ? "اللون:" : "Color:"}{" "}
                  <span className="font-semibold text-muted-foreground">
                    {selectedColor}
                  </span>
                </label>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                        selectedColor === color
                          ? "text-white scale-95"
                          : "bg-secondary text-secondary-foreground hover:scale-105"
                      }`}
                      style={
                        selectedColor === color ? { background: accent } : {}
                      }
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-bold mb-3">
                  {isAr ? "الحجم:" : "Size:"}{" "}
                  <span className="font-semibold text-muted-foreground">
                    {selectedSize}
                  </span>
                </label>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                        selectedSize === size
                          ? "text-white scale-95"
                          : "bg-secondary text-secondary-foreground hover:scale-105"
                      }`}
                      style={selectedSize === size ? { background: accent } : {}}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-3">
                {isAr ? "الكمية:" : "Quantity:"}
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 transition-colors flex items-center justify-center font-bold"
                  aria-label={isAr ? "تقليل الكمية" : "Decrease quantity"}
                >
                  −
                </button>
                <span className="text-xl font-black w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 transition-colors flex items-center justify-center font-bold"
                  aria-label={isAr ? "زيادة الكمية" : "Increase quantity"}
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-white font-bold transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: accent }}
              >
                <ShoppingCart size={20} strokeWidth={2.5} />
                {isAr ? "أضف إلى السلة" : "Add to Cart"}
              </button>
              <button
                onClick={() => toggleItem(product)}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${
                  inWishlist
                    ? "bg-red-50 text-red-600"
                    : "bg-secondary text-secondary-foreground"
                }`}
                aria-label={
                  isAr
                    ? inWishlist
                      ? "إزالة من المفضلة"
                      : "أضف إلى المفضلة"
                    : inWishlist
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
              >
                <Heart
                  size={20}
                  fill={inWishlist ? "currentColor" : "none"}
                  strokeWidth={2.5}
                />
              </button>
            </div>

            {/* Features */}
            <div className="space-y-3 pt-6 border-t">
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: bg }}
                >
                  <Truck size={18} style={{ color: accent }} strokeWidth={2} />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-0.5">
                    {isAr ? "توصيل سريع" : "Fast Delivery"}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {isAr
                      ? "شحن مجاني للطلبات فوق 500 جنيه"
                      : "Free shipping on orders over 500 EGP"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: bg }}
                >
                  <Shield size={18} style={{ color: accent }} strokeWidth={2} />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-0.5">
                    {isAr ? "ضمان الجودة" : "Quality Guarantee"}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {isAr
                      ? "ضمان شامل لمدة عام"
                      : "Full warranty for 1 year"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: bg }}
                >
                  <RefreshCw
                    size={18}
                    style={{ color: accent }}
                    strokeWidth={2}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-0.5">
                    {isAr ? "إرجاع سهل" : "Easy Returns"}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {isAr
                      ? "إرجاع مجاني خلال 30 يومًا"
                      : "Free returns within 30 days"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
