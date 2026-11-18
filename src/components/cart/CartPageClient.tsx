"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Trash2,
  ChevronLeft,
  Package,
  ArrowRight,
} from "lucide-react";
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

export function CartPageClient({ locale }: Props) {
  const isAr = locale === "ar";
  const { items, updateQuantity, removeItem, subtotal } = useCartStore();

  const shipping = 50;
  const total = subtotal() + (items.length > 0 ? shipping : 0);

  if (items.length === 0) {
    return (
      <main
        className="min-h-screen bg-white flex items-center justify-center px-4"
        dir={isAr ? "rtl" : "ltr"}
      >
        <div className="text-center max-w-md">
          <div
            className="w-24 h-24 rounded-3xl mx-auto mb-6 flex items-center justify-center"
            style={{ background: CARD_COLORS[0] }}
          >
            <ShoppingCart
              size={40}
              style={{ color: CARD_ACCENT[0] }}
              strokeWidth={2}
            />
          </div>
          <h1 className="text-3xl font-black mb-3">
            {isAr ? "سلتك فارغة" : "Your Cart is Empty"}
          </h1>
          <p className="text-muted-foreground mb-6">
            {isAr
              ? "ابدأ التسوق الآن واضف منتجاتك المفضلة"
              : "Start shopping and add your favorite products"}
          </p>
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-bold transition-all hover:opacity-90 hover:scale-105"
            style={{ background: CARD_ACCENT[0] }}
          >
            {isAr ? "تسوق الآن" : "Shop Now"}
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
            {isAr ? "سلة التسوق" : "Shopping Cart"}
          </span>
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl sm:text-4xl font-black">
            {isAr ? "سلة التسوق" : "Shopping Cart"}
          </h1>
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} style={{ color: CARD_ACCENT[0] }} />
            <span className="text-lg font-bold">{items.length}</span>
          </div>
        </div>

        {/* Cart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, idx) => {
              const name = isAr ? item.product.nameAr : item.product.nameEn;
              const bg = CARD_COLORS[idx % CARD_COLORS.length];
              const accent = CARD_ACCENT[idx % CARD_ACCENT.length];

              return (
                <motion.div
                  key={`${item.product.id}-${item.color}-${item.size}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="flex gap-4 p-4 rounded-2xl border border-border"
                >
                  {/* Image */}
                  <Link
                    href={`/${locale}/product/${item.product.id}`}
                    className="relative shrink-0 rounded-xl overflow-hidden"
                    style={{ width: 100, height: 100, background: bg }}
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={name}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="100px"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link
                        href={`/${locale}/product/${item.product.id}`}
                        className="font-black text-sm hover:underline mb-1 block line-clamp-1"
                      >
                        {name}
                      </Link>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        {item.color && (
                          <span>
                            {isAr ? "اللون:" : "Color:"} {item.color}
                          </span>
                        )}
                        {item.size && (
                          <span>
                            {isAr ? "الحجم:" : "Size:"} {item.size}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              Math.max(1, item.quantity - 1),
                              item.color,
                              item.size
                            )
                          }
                          className="w-7 h-7 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors flex items-center justify-center font-bold text-sm"
                          aria-label={isAr ? "تقليل" : "Decrease"}
                        >
                          −
                        </button>
                        <span className="font-black text-sm w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              Math.min(item.product.stock, item.quantity + 1),
                              item.color,
                              item.size
                            )
                          }
                          className="w-7 h-7 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors flex items-center justify-center font-bold text-sm"
                          aria-label={isAr ? "زيادة" : "Increase"}
                        >
                          +
                        </button>
                      </div>

                      <span className="font-black text-sm">
                        {item.product.price * item.quantity}{" "}
                        <span className="text-xs text-muted-foreground">
                          {isAr ? "جنيه" : "EGP"}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() =>
                      removeItem(item.product.id, item.color, item.size)
                    }
                    className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    aria-label={isAr ? "حذف" : "Remove"}
                  >
                    <Trash2 size={16} strokeWidth={2} />
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-8 p-6 rounded-2xl space-y-4"
              style={{ background: CARD_COLORS[0] }}
            >
              <h2 className="text-xl font-black">
                {isAr ? "ملخص الطلب" : "Order Summary"}
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {isAr ? "المجموع الفرعي" : "Subtotal"}
                  </span>
                  <span className="font-bold">
                    {subtotal()} {isAr ? "جنيه" : "EGP"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {isAr ? "الشحن" : "Shipping"}
                  </span>
                  <span className="font-bold">
                    {shipping} {isAr ? "جنيه" : "EGP"}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-border/20">
                <div className="flex justify-between items-baseline mb-6">
                  <span className="text-lg font-black">
                    {isAr ? "الإجمالي" : "Total"}
                  </span>
                  <span className="text-2xl font-black">
                    {total} <span className="text-sm">{isAr ? "جنيه" : "EGP"}</span>
                  </span>
                </div>

                <Link
                  href={`/${locale}/checkout`}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-white font-bold transition-all hover:opacity-90 hover:scale-[1.02]"
                  style={{ background: CARD_ACCENT[0] }}
                >
                  {isAr ? "إتمام الطلب" : "Proceed to Checkout"}
                  <Package size={18} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
