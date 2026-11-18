"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Gift, ArrowRight, Tag } from "lucide-react";

interface Bundle {
  id: string;
  nameEn: string;
  nameAr: string;
  descEn: string;
  descAr: string;
  items: number;
  originalPrice: number;
  bundlePrice: number;
  color: string;
  tint: string;
  imgs: string[];
}

const BUNDLES: Bundle[] = [
  {
    id: "bundle-kitchen",
    nameEn: "Kitchen Starter Box",
    nameAr: "بوكس تنظيم المطبخ",
    descEn: "Knife set · Measuring cups · Cutting board · Storage organizer",
    descAr: "طقم سكاكين · أكواب قياس · لوح تقطيع · منظم تخزين",
    items: 4,
    originalPrice: 590,
    bundlePrice: 420,
    color: "#5F0054",
    tint: "#fdf4fc",
    imgs: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&q=80",
      "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=300&q=80",
    ],
  },
  {
    id: "bundle-bride",
    nameEn: "Bride's Home Box",
    nameAr: "بوكس العروسة",
    descEn: "Bed sheets · Throw blanket · Towel set · Ceramic mugs",
    descAr: "طقم ملاءات · بطانية · طقم مناشف · أكواب سيراميك",
    items: 4,
    originalPrice: 715,
    bundlePrice: 499,
    color: "#D63480",
    tint: "#fdf0f7",
    imgs: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80",
      "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=300&q=80",
    ],
  },
  {
    id: "bundle-bedroom",
    nameEn: "Bedroom Refresh Box",
    nameAr: "بوكس تجديد غرفة النوم",
    descEn: "Blackout curtains · Percale sheets · Chunky knit throw · Vase",
    descAr: "ستائر معتمة · ملاءات بيركيل · بطانية محاكة · مزهرية",
    items: 4,
    originalPrice: 840,
    bundlePrice: 579,
    color: "#30A0A7",
    tint: "#f0fbfc",
    imgs: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80",
    ],
  },
];

function BundleCard({ bundle, locale }: { bundle: Bundle; locale: string }) {
  const isAr = locale === "ar";
  const save = bundle.originalPrice - bundle.bundlePrice;
  const pct = Math.round((save / bundle.originalPrice) * 100);

  return (
    <Link
      href={`/${locale}/products`}
      className="group relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2"
      style={{
        background: bundle.tint,
        border: `1.5px solid ${bundle.color}20`,
        boxShadow: `0 4px 24px ${bundle.color}10`,
        // @ts-expect-error CSS custom prop
        "--tw-ring-color": bundle.color,
      }}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Save pill */}
      <span
        className="absolute top-4 start-4 z-10 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black text-white"
        style={{ background: bundle.color }}
      >
        <Tag size={10} strokeWidth={2.5} />
        {isAr ? `وفّر ${pct}%` : `Save ${pct}%`}
      </span>

      {/* Images — stacked */}
      <div className="relative h-52 overflow-hidden">
        {/* BG image */}
        <Image
          src={bundle.imgs[0]}
          alt={isAr ? bundle.nameAr : bundle.nameEn}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 33vw"
        />

        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${bundle.color}70 0%, transparent 55%)`,
          }}
        />

        {/* Floating mini image */}
        <div
          className="absolute -bottom-5 end-5 w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-xl"
          style={{ zIndex: 2 }}
        >
          <Image
            src={bundle.imgs[1]}
            alt=""
            fill
            unoptimized
            className="object-cover"
            sizes="96px"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2 px-5 pt-7 pb-5">
        {/* Badge: X items */}
        <span
          className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full w-fit"
          style={{ background: `${bundle.color}18`, color: bundle.color }}
        >
          {bundle.items} {isAr ? "منتجات" : "items"}
        </span>

        {/* Name */}
        <h3
          className="text-lg font-black leading-snug"
          style={{ color: "#0f0f0f" }}
        >
          {isAr ? bundle.nameAr : bundle.nameEn}
        </h3>

        {/* Contents */}
        <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "#6b7280" }}>
          {isAr ? bundle.descAr : bundle.descEn}
        </p>

        {/* Pricing */}
        <div className="flex items-end gap-2 mt-1">
          <span className="text-2xl font-black" style={{ color: bundle.color }}>
            {bundle.bundlePrice}
            <span className="text-xs ms-1 font-bold opacity-70">
              "جنيه"
            </span>
          </span>
          <span className="text-sm line-through pb-0.5" style={{ color: "#9ca3af" }}>
            {bundle.originalPrice} "جنيه"
          </span>
        </div>

        {/* CTA row */}
        <div
          className="inline-flex items-center gap-1.5 mt-2 w-fit px-4 py-2.5 rounded-xl text-xs font-black text-white transition-all duration-200 group-hover:gap-2.5"
          style={{ background: bundle.color }}
        >
          {isAr ? "اطلب الباقة" : "Get Bundle"}
          <ArrowRight size={12} strokeWidth={2.5} />
        </div>
      </div>
    </Link>
  );
}

export function LifeBoxBundles({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  return (
    <section
      className="w-full py-16 px-4 sm:px-6 lg:px-8"
      style={{ background: "#fafafa" }}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full text-white mb-3"
              style={{ background: "linear-gradient(135deg,#5F0054,#D63480)" }}
            >
              <Gift size={11} strokeWidth={2.5} aria-hidden="true" />
              {isAr ? "باقات لايف بوكس" : "Life Box Bundles"}
            </span>
            <h2
              className="text-3xl sm:text-4xl font-black"
              style={{ color: "#0f0f0f" }}
            >
              {isAr ? "وفّر أكثر، اشترِ أذكى" : "Bundle & Save More"}
            </h2>
            <p className="mt-2 text-sm" style={{ color: "#6b7280" }}>
              {isAr
                ? "باقات مجمعة جاهزة بخصومات حصرية — أكثر قيمة، أقل سعر."
                : "Ready-made bundles with exclusive discounts — more value, less cost."}
            </p>
          </div>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BUNDLES.map((bundle, i) => (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
            >
              <BundleCard bundle={bundle} locale={locale} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
