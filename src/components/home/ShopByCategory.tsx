"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const CATS = [
  {
    slug:    "home-utilities",
    labelAr: "الستائر",
    labelEn: "Curtains",
    img:     "/images/categories/cat-utilities.png",
    imgAlt:  "ستائر منزلية",
    bg:      "#6B0F6B",
  },
  {
    slug:    "housewares",
    labelAr: "الشنط",
    labelEn: "Bags",
    img:     "/images/categories/cat-housewares.png",
    imgAlt:  "حقائب تسوق",
    bg:      "#1A9A9A",
  },
  {
    slug:    "home-textiles",
    labelAr: "السجاد",
    labelEn: "Carpets",
    img:     "/images/categories/cat-textiles.png",
    imgAlt:  "سجاد فاخر",
    bg:      "#6B0F6B",
  },
  {
    slug:    "decorative-items",
    labelAr: "الملايات",
    labelEn: "Bedding",
    img:     "/images/categories/cat-decor.png",
    imgAlt:  "ملايات وأغطية",
    bg:      "#1A9A9A",
  },
];

export function ShopByCategory({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  return (
    <section
      id="categories"
      className="w-full py-14 px-4 sm:px-6 lg:px-8 bg-white"
      dir={isAr ? "rtl" : "ltr"}
      aria-label={isAr ? "تسوق حسب الفئة" : "Shop by category"}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10 text-center">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-1.5 rounded-full text-white mb-3"
            style={{ background: "#5F0054" }}
          >
            {isAr ? "تسوق حسب الفئة" : "Shop by Category"}
          </span>
          <h2
            className="text-3xl sm:text-4xl font-black"
            style={{ color: "#0f0f0f" }}
          >
            {isAr ? "تصفح الفئات" : "Browse Categories"}
          </h2>
        </div>

        {/* Grid — 2 cols on mobile, 4 on sm+ */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
          {CATS.map(({ slug, labelAr, labelEn, img, imgAlt, bg }, i) => (
            <motion.div
              key={slug + i}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: i * 0.08, ease: "easeOut" }}
            >
              <Link
                href={`/${locale}/category/${slug}`}
                className="group flex flex-col items-center rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2"
                style={{ background: bg }}
              >
                {/* Image fills card */}
                <div className="relative w-full" style={{ aspectRatio: "323/371" }}>
                  <Image
                    src={img}
                    alt={imgAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 45vw, 22vw"
                    priority={i < 2}
                  />
                </div>

                {/* Label below image */}
                <div
                  className="w-full text-center px-3 py-3 bg-white"
                  style={{ borderTop: "1.5px solid #f0f0f0" }}
                >
                  <span className="text-sm font-bold" style={{ color: "#0f0f0f" }}>
                    {isAr ? labelAr : labelEn}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
