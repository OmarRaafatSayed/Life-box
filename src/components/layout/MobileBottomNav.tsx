"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingBag, Heart, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

interface Props {
  locale: string;
}

export function MobileBottomNav({ locale }: Props) {
  const pathname = usePathname();
  const isAr = locale === "ar";
  
  const cartCount = useCartStore((s) => s.itemCount)();
  const wishlistCount = useWishlistStore((s) => s.items.length);

  const navItems = [
    {
      href: `/${locale}`,
      icon: Home,
      labelEn: "Home",
      labelAr: "الرئيسية",
      exact: true,
    },
    {
      href: `/${locale}/products`,
      icon: Search,
      labelEn: "Shop",
      labelAr: "تسوق",
    },
    {
      href: `/${locale}/cart`,
      icon: ShoppingBag,
      labelEn: "Cart",
      labelAr: "السلة",
      badge: cartCount,
    },
    {
      href: `/${locale}/wishlist`,
      icon: Heart,
      labelEn: "Wishlist",
      labelAr: "المفضلة",
      badge: wishlistCount,
    },
    {
      href: `/${locale}/account`,
      icon: User,
      labelEn: "Account",
      labelAr: "حسابي",
    },
  ];

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,1) 100%)",
        borderTop: "2px solid rgba(61, 26, 110, 0.1)",
        boxShadow: "0 -4px 24px rgba(61, 26, 110, 0.08)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center justify-around h-16 px-2 safe-area-inset-bottom">
        {navItems.map(({ href, icon: Icon, labelEn, labelAr, badge, exact }) => {
          const active = isActive(href, exact);
          
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center flex-1 h-full relative transition-all active:scale-95"
            >
              <div className="relative">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                    active ? "scale-110" : ""
                  }`}
                  style={
                    active
                      ? { background: "linear-gradient(135deg, #3D1A6E, #E91E8C)" }
                      : { background: "transparent" }
                  }
                >
                  <Icon
                    size={20}
                    strokeWidth={active ? 2.5 : 2}
                    className={active ? "text-white" : "text-gray-500"}
                  />
                </div>
                
                {/* Badge */}
                {badge !== undefined && badge > 0 && (
                  <span
                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center text-[9px] font-black text-white rounded-full px-1"
                    style={{ background: "#E91E8C" }}
                  >
                    {badge > 99 ? "99+" : badge}
                  </span>
                )}
              </div>
              
              <span
                className={`text-[10px] font-bold mt-0.5 transition-colors ${
                  active ? "opacity-100" : "opacity-60"
                }`}
                style={active ? { color: "#3D1A6E" } : { color: "#6b7280" }}
              >
                {isAr ? labelAr : labelEn}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
