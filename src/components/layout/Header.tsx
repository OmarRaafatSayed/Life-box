"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { ShoppingBag, Heart, Search, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { LanguageToggle } from "./LanguageToggle";
import CartDrawer from "@/components/cart/CartDrawer";
import Image from "next/image";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = useCartStore((s) => s.itemCount)();
  const wishlistCount = useWishlistStore((s) => s.items.length);

  const links = [
    { label: t("home"), href: `/${locale}` },
    { label: t("shop"), href: `/${locale}/products` },
  ];

  function active(href: string) {
    if (href === `/${locale}`) return pathname === `/${locale}`;
    return pathname.startsWith(href);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${locale}/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/90 border-b-2 border-[#3D1A6E]/10 shadow-[0_4px_24px_rgba(61,26,110,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-3">

            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center group">
              <Image
                src="/images/logo.png"
                alt="صندوق الدنيا"
                width={160}
                height={39}
                priority
                className="h-10 w-auto object-contain"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    "px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-200",
                    active(link.href)
                      ? "text-white shadow-md"
                      : "text-gray-600 hover:bg-[#3D1A6E]/8 hover:text-[#3D1A6E]",
                  ].join(" ")}
                  style={
                    active(link.href)
                      ? { background: "linear-gradient(135deg, #3D1A6E, #E91E8C)" }
                      : {}
                  }
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <button
                onClick={() => setSearchOpen((v) => !v)}
                aria-label={t("search")}
                className="p-2.5 rounded-2xl hover:bg-[#3D1A6E]/8 text-gray-500 hover:text-[#3D1A6E] transition-all"
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <Link
                href={`/${locale}/wishlist`}
                aria-label={t("wishlist")}
                className="relative p-2.5 rounded-2xl hover:bg-[#E91E8C]/8 text-gray-500 hover:text-[#E91E8C] transition-all"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-black text-white rounded-full px-1"
                    style={{ background: "#E91E8C" }}
                  >
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                aria-label={t("cart")}
                className="relative p-2.5 rounded-2xl hover:bg-[#3D1A6E]/8 text-gray-500 hover:text-[#3D1A6E] transition-all"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-black text-white rounded-full px-1"
                    style={{ background: "#3D1A6E" }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              <LanguageToggle />

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden p-2.5 rounded-2xl hover:bg-gray-100 text-gray-500 transition-all"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-3">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  autoFocus
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("search") + "..."}
                  className="flex-1 h-11 px-5 rounded-3xl border-2 border-[#3D1A6E]/20 bg-white text-sm focus:outline-none focus:border-[#3D1A6E] transition-colors"
                />
                <button
                  type="submit"
                  className="h-11 px-6 rounded-3xl text-white text-sm font-bold transition-opacity hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #3D1A6E, #E91E8C)" }}
                >
                  <Search size={16} />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t-2 border-[#3D1A6E]/10 bg-white/95 px-4 py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={[
                  "block px-4 py-3 rounded-2xl text-sm font-semibold mb-1 transition-all",
                  active(link.href)
                    ? "text-white"
                    : "text-gray-600 hover:bg-[#3D1A6E]/8 hover:text-[#3D1A6E]",
                ].join(" ")}
                style={
                  active(link.href)
                    ? { background: "linear-gradient(135deg, #3D1A6E, #E91E8C)" }
                    : {}
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
