"use client";

import { Truck, RefreshCw, ShieldCheck, BadgeCheck } from "lucide-react";
import { useLocale } from "next-intl";

const TRUST_ITEMS = [
  {
    Icon: Truck,
    en: "24–48h Fast Delivery",
    ar: "توصيل سريع 24–48 ساعة",
    color: "#5F0054",
    bg: "#fdf4fc",
  },
  {
    Icon: RefreshCw,
    en: "Free 14-Day Returns",
    ar: "استبدال واسترجاع مجاني 14 يوم",
    color: "#30A0A7",
    bg: "#f0fbfc",
  },
  {
    Icon: ShieldCheck,
    en: "Secure Pay — COD or Online",
    ar: "دفع آمن عند الاستلام أو أونلاين",
    color: "#D63480",
    bg: "#fdf0f7",
  },
  {
    Icon: BadgeCheck,
    en: "100% Genuine Products",
    ar: "خامات أصلية مضمونة 100%",
    color: "#E9682C",
    bg: "#fdf4ef",
  },
];

export function TrustBar() {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section
      className="w-full py-5 px-4 sm:px-6 lg:px-8"
      style={{ background: "#fff" }}
      aria-label={isAr ? "مميزاتنا" : "Our guarantees"}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3"
          dir={isAr ? "rtl" : "ltr"}
        >
          {TRUST_ITEMS.map(({ Icon, en, ar, color, bg }) => (
            <div
              key={en}
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
              style={{ background: bg, border: `1px solid ${color}18` }}
            >
              {/* Icon bubble */}
              <span
                className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl"
                style={{ background: `${color}15` }}
              >
                <Icon size={18} strokeWidth={1.75} style={{ color }} aria-hidden="true" />
              </span>

              {/* Text */}
              <span
                className="text-xs font-semibold leading-snug"
                style={{ color: "#1a1a1a" }}
              >
                {isAr ? ar : en}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
