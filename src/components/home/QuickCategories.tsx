"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Wrench, UtensilsCrossed, Layers, Sparkles } from "lucide-react";

const CATS = [
  {
    slug:    "home-utilities",
    labelEn: "Home Utilities",
    labelAr: "أدوات المنزل",
    Icon:    Wrench,
    color:   "#5F0054",
    bg:      "#fdf4fc",
    border:  "#e9c6e6",
  },
  {
    slug:    "housewares",
    labelEn: "Housewares",
    labelAr: "أواني المنزل",
    Icon:    UtensilsCrossed,
    color:   "#D63480",
    bg:      "#fdf0f7",
    border:  "#f0bad6",
  },
  {
    slug:    "home-textiles",
    labelEn: "Home Textiles",
    labelAr: "المنسوجات المنزلية",
    Icon:    Layers,
    color:   "#30A0A7",
    bg:      "#f0fbfc",
    border:  "#b6e8eb",
  },
  {
    slug:    "decorative-items",
    labelEn: "Decorative Items",
    labelAr: "الديكورات",
    Icon:    Sparkles,
    color:   "#E9682C",
    bg:      "#fdf4ef",
    border:  "#f5cdb1",
  },
];

export function QuickCategories({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  return (
    <section
      className="w-full py-6 px-4 sm:px-6 lg:px-8"
      style={{ background: "#f9f9f9" }}
      aria-label={isAr ? "تصفح حسب الفئة" : "Browse by category"}
    >
      <div className="max-w-7xl mx-auto">
        {/* Row — scrollable on mobile */}
        <div
          className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide"
          dir={isAr ? "rtl" : "ltr"}
        >
          {CATS.map(({ slug, labelEn, labelAr, Icon, color, bg, border }, i) => (
            <motion.div
              key={slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.07, ease: "easeOut" }}
              className="shrink-0"
            >
              <Link
                href={`/${locale}/category/${slug}`}
                className="group flex items-center gap-2.5 px-5 py-3 rounded-2xl border transition-all duration-200 hover:scale-[1.03] hover:shadow-md focus-visible:outline-none focus-visible:ring-2"
                style={{
                  background: bg,
                  borderColor: border,
                  // ring color on focus
                  // @ts-expect-error CSS custom prop
                  "--tw-ring-color": color,
                }}
              >
                {/* Icon bubble */}
                <span
                  className="flex items-center justify-center w-9 h-9 rounded-xl transition-transform duration-200 group-hover:scale-110"
                  style={{ background: `${color}18` }}
                >
                  <Icon
                    size={18}
                    strokeWidth={2}
                    style={{ color }}
                    aria-hidden="true"
                  />
                </span>

                {/* Label */}
                <span
                  className="text-sm font-semibold whitespace-nowrap"
                  style={{ color: "#1a1a1a" }}
                >
                  {isAr ? labelAr : labelEn}
                </span>

                {/* Animated right-arrow indicator */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                  className={`transition-all duration-200 opacity-0 group-hover:opacity-100 ${isAr ? "-scale-x-100 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
                  style={{ color }}
                >
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
