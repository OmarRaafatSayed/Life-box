"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, LayoutGrid } from "lucide-react";

// ── One carefully chosen Unsplash image per category ──────────────────────────
// All images: clean composition, light/neutral background → simulates isolated object
const CATEGORIES = [
  {
    key:     "HOME_UTILITIES",
    slug:    "home-utilities",
    labelEn: "Home Utilities",
    labelAr: "أدوات المنزل",
    color:   "#5F0054",
    tint:    "#fdf8fd",
    img:     "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=90",
    imgAlt:  "Kitchen knife set",
    // image position inside card: "left" or "right"
    imgSide: "right" as const,
  },
  {
    key:     "HOUSEWARES",
    slug:    "housewares",
    labelEn: "Housewares",
    labelAr: "أواني المنزل",
    color:   "#D63480",
    tint:    "#fdf5f9",
    img:     "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=600&q=90",
    imgAlt:  "Ceramic cookware",
    imgSide: "right" as const,
  },
  {
    key:     "HOME_TEXTILES",
    slug:    "home-textiles",
    labelEn: "Home Textiles",
    labelAr: "المنسوجات المنزلية",
    color:   "#30A0A7",
    tint:    "#f3fafb",
    img:     "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=90",
    imgAlt:  "Cozy sofa with throw blanket",
    imgSide: "right" as const,
  },
  {
    key:     "DECORATIVE_ITEMS",
    slug:    "decorative-items",
    labelEn: "Decorative Items",
    labelAr: "الديكورات",
    color:   "#E9682C",
    tint:    "#fdf7f3",
    img:     "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=90",
    imgAlt:  "Home décor vase and books",
    imgSide: "right" as const,
  },
];

export function CategoryShowcase({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  return (
    <section id="categories" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-10" dir={isAr ? "rtl" : "ltr"}>
          <div>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full text-white mb-3"
              style={{ background: "#5F0054" }}
            >
              <LayoutGrid size={11} strokeWidth={2.5} />
              {isAr ? "مجموعات لايف بوكس" : "Life Box Collections"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "#0f0f0f" }}>
              {isAr ? "تسوق حسب الفئة" : "Shop by Category"}
            </h2>
          </div>
        </div>

        {/* 2×2 Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {CATEGORIES.map(({ key, slug, labelEn, labelAr, color, tint, img, imgAlt }, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.09, ease: "easeOut" }}
              // overflow-visible so image can break out of card
              className="relative"
              style={{ isolation: "isolate" }}
            >
              <Link
                href={`/${locale}/category/${slug}`}
                className="group relative flex items-end overflow-hidden rounded-3xl border border-gray-100 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: tint,
                  minHeight: 220,
                  boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 12px 40px ${color}30`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.05)";
                }}
              >
                {/* Colored accent bar on top */}
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: color }} />

                {/* Text — bottom left */}
                <div className="relative z-10 flex flex-col gap-3 p-7 pb-7 w-1/2">
                  {/* Category label pill */}
                  <span
                    className="w-fit text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background: `${color}18`, color }}
                  >
                    {isAr ? labelAr : labelEn}
                  </span>

                  <h3 className="text-xl font-black leading-tight" style={{ color: "#0f0f0f" }}>
                    {isAr ? labelAr : labelEn}
                  </h3>
                  <p className="text-xs" style={{ color: "#9ca3af" }}>
                    {isAr ? labelEn : labelAr}
                  </p>

                  <div
                    className="mt-1 inline-flex items-center gap-1.5 w-fit px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 group-hover:gap-2.5"
                    style={{
                      background: color,
                      color: "white",
                    }}
                  >
                    {isAr ? "تسوق" : "Shop"}
                    <ArrowRight size={12} strokeWidth={2.5} />
                  </div>
                </div>

                {/* Product image — right half, breaks top of card */}
                <div
                  className="absolute right-0 top-0 bottom-0 w-[52%] pointer-events-none select-none"
                  style={{ zIndex: 1 }}
                >
                  <Image
                    src={img}
                    alt={imgAlt}
                    fill
                    className="object-cover object-left"
                    style={{
                      maskImage: "linear-gradient(to left, rgba(0,0,0,0.95) 40%, transparent 100%)",
                      WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.95) 40%, transparent 100%)",
                    }}
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>

                {/* Floating image — breaks top boundary (decorative copy, blurred) */}
                <div
                  className="absolute -top-5 right-6 w-28 h-28 pointer-events-none select-none"
                  style={{ zIndex: 5 }}
                >
                  <Image
                    src={img}
                    alt=""
                    width={200}
                    height={200}
                    aria-hidden
                    className="w-full h-full object-cover rounded-2xl"
                    style={{
                      filter: `drop-shadow(0 12px 28px ${color}50)`,
                      transform: "rotate(-4deg) scale(0.95)",
                      opacity: 0,
                      transition: "opacity 0.3s, transform 0.3s",
                    }}
                  />
                </div>

              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
