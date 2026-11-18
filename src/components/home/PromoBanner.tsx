"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Truck, ShieldCheck, Package } from "lucide-react";

const ITEMS = [
  { Icon: Truck,       en: "Free Shipping over 200 جنيه",    ar: "شحن مجاني فوق 200 جنيه"       },
  { Icon: ShieldCheck, en: "100% Quality Guarantee",        ar: "جودة مضمونة 100%"              },
  { Icon: Package,     en: "24h Fast Delivery",             ar: "توصيل سريع خلال 24 ساعة"       },
];

export function PromoBanner() {
  const locale = useLocale();
  const isAr   = locale === "ar";

  // Build a wide repeated string of nodes — we render it as text with separators
  const segment = ITEMS.map(({ en, ar }) => `${isAr ? ar : en}  ·  `).join("");
  const repeated = segment.repeat(8);

  return (
    <div
      className="relative w-full overflow-hidden py-3"
      style={{ background: "#5F0054" }}
    >
      <motion.div
        className="flex items-center whitespace-nowrap gap-0"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {/* Two identical runs so the loop is seamless */}
        {[0, 1].map((run) => (
          <span key={run} className="inline-flex items-center gap-5 text-white text-sm font-medium pr-5">
            {Array.from({ length: 6 }).map((_, i) =>
              ITEMS.map(({ Icon, en, ar }) => (
                <span
                  key={`${run}-${i}-${en}`}
                  className="inline-flex items-center gap-2 shrink-0"
                >
                  <Icon size={13} strokeWidth={2} className="opacity-70 shrink-0" />
                  <span className="opacity-90">{isAr ? ar : en}</span>
                  <span className="opacity-30 mx-1">·</span>
                </span>
              ))
            )}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
