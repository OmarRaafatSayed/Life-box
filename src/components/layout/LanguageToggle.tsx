"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function toggle() {
    router.replace(pathname, { locale: locale === "en" ? "ar" : "en" });
  }

  return (
    <button
      onClick={toggle}
      aria-label="Switch language"
      className="inline-flex items-center justify-center h-9 px-4 rounded-3xl border-2 font-bold text-sm transition-all duration-200 hover:scale-105"
      style={{
        borderColor: "#3D1A6E",
        color: "#3D1A6E",
        background: "transparent",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "#3D1A6E";
        (e.currentTarget as HTMLButtonElement).style.color = "white";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        (e.currentTarget as HTMLButtonElement).style.color = "#3D1A6E";
      }}
    >
      {locale === "en" ? "عر" : "EN"}
    </button>
  );
}
