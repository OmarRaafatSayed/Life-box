import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/lib/data";
import FeaturedScroll from "./FeaturedScroll";

export async function FeaturedProducts({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const products = await getFeaturedProducts(10);

  if (products.length === 0) return null;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10" dir={isAr ? "rtl" : "ltr"}>
          <div>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full text-white mb-3"
              style={{ background: "#5F0054" }}
            >
              <Sparkles size={11} strokeWidth={2.5} />
              {isAr ? "مختارات لايف بوكس" : "Life Box Picks"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "#0f0f0f" }}>
              {isAr ? "منتجات مميزة" : "Featured Products"}
            </h2>
          </div>

          <Link
            href={`/${locale}/products`}
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all hover:scale-[1.02]"
            style={{ borderColor: "#5F0054", color: "#5F0054" }}
          >
            {isAr ? "عرض الكل" : "View All"}
            <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </div>

        <FeaturedScroll products={products} locale={locale} />
      </div>
    </section>
  );
}
