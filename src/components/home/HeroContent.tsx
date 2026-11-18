"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function HeroContent({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  return (
    <section
      className="w-full px-4 sm:px-6 lg:px-8 py-6 bg-white"
      dir={isAr ? "rtl" : "ltr"}
      aria-label={isAr ? "العرض الرئيسي" : "Hero banner"}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-stretch">

        {/* ── WIDE CARD (right in RTL / left in LTR) — سيس.png ─────────── */}
        <motion.div
          className="relative flex-1 rounded-3xl overflow-hidden"
          style={{ minHeight: 320 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <Link
            href={`/${locale}/products`}
            className="block w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#30A0A7] rounded-3xl"
            aria-label={isAr ? "تسوق الآن" : "Shop now"}
          >
            <Image
              src="/images/hero/hero-wide.png"
              alt={isAr ? "خلي الرفايع علينا والاختيار عليك" : "Let us handle the brands, you choose"}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, 70vw"
            />
          </Link>
        </motion.div>

        {/* ── NARROW CARD (left in RTL / right in LTR) — Frame…png ──────── */}
        <motion.div
          className="relative rounded-3xl overflow-hidden"
          style={{ width: "clamp(260px, 32%, 380px)", minHeight: 320, flexShrink: 0 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
        >
          <Link
            href={`/${locale}/products`}
            className="block w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5F0054] rounded-3xl"
            aria-label={isAr ? "اكتشف البوكسات" : "Discover boxes"}
          >
            <Image
              src="/images/hero/hero-narrow.png"
              alt={isAr ? "كل تفاصيل بيتك في بوكس واحد" : "Everything for your home in one box"}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, 32vw"
            />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
