"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  FolderTree,
  Image,
  Menu,
  Palette,
  Eye,
  Plug,
  Settings,
  Megaphone,
  DollarSign,
  TrendingUp,
  LineChart,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navSections = [
  {
    title: "عام",
    items: [{ href: "/admin", label: "لوحة التحكم", Icon: LayoutDashboard }],
  },
  {
    title: "الكتالوج",
    items: [
      { href: "/admin/categories", label: "الفئات", Icon: FolderTree },
      { href: "/admin/products", label: "المنتجات", Icon: Package },
    ],
  },
  {
    title: "المحتوى",
    items: [
      { href: "/admin/banners", label: "البانرات", Icon: Image },
      { href: "/admin/navigation", label: "التنقل", Icon: Menu },
      { href: "/admin/branding", label: "العلامة التجارية", Icon: Palette },
      { href: "/admin/visibility", label: "الظهور", Icon: Eye },
    ],
  },
  {
    title: "التسويق",
    items: [
      { href: "/admin/marketing", label: "الحملات", Icon: Megaphone },
      { href: "/admin/integrations", label: "التكاملات", Icon: Plug },
    ],
  },
  {
    title: "المبيعات",
    items: [
      { href: "/admin/orders", label: "الطلبات", Icon: ShoppingCart },
      { href: "/admin/customers", label: "العملاء", Icon: Users },
      { href: "/admin/financials", label: "المالية", Icon: DollarSign },
      { href: "/admin/best-sellers", label: "الأكثر مبيعًا", Icon: TrendingUp },
      { href: "/admin/analytics", label: "التحليلات", Icon: LineChart },
    ],
  },
  {
    title: "النظام",
    items: [{ href: "/admin/settings", label: "الإعدادات", Icon: Settings }],
  },
];

// ── Desktop Mini Sidebar ───────────────────────────────────────────────────────
function DesktopSidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      className="hidden lg:flex flex-col min-h-screen border-r transition-all duration-300 ease-in-out flex-shrink-0"
      style={{
        background: "#1a0a3c",
        borderColor: "rgba(255,255,255,0.08)",
        width: expanded ? "224px" : "64px",
      }}
    >
      {/* Logo / Toggle */}
      <div
        className="flex items-center border-b flex-shrink-0"
        style={{
          borderColor: "rgba(255,255,255,0.1)",
          height: "64px",
          padding: expanded ? "0 16px" : "0",
          justifyContent: expanded ? "space-between" : "center",
        }}
      >
        {expanded && (
          <Link href="/admin" className="flex items-center gap-2 min-w-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "#E91E8C" }}
            >
              <span className="text-white font-black text-sm">LB</span>
            </div>
            <span className="text-white font-black text-sm truncate">لايف بوكس</span>
          </Link>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors flex-shrink-0"
          style={{ color: "rgba(255,255,255,0.5)" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#ffffff")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)")}
          title={expanded ? "تصغير" : "توسيع"}
        >
          {expanded ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3">
        {navSections.map((section) => (
          <div key={section.title} className="mb-1">
            {/* Section label — only when expanded */}
            {expanded && (
              <p
                className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {section.title}
              </p>
            )}
            {!expanded && <div className="my-1 mx-3 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />}

            {section.items.map(({ href, label, Icon }) => {
              const active =
                href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

              return (
                <Link
                  key={href}
                  href={href}
                  title={!expanded ? label : undefined}
                  className="flex items-center transition-all duration-150 rounded-xl mx-2 my-0.5"
                  style={{
                    background: active ? "#E91E8C" : "transparent",
                    color: active ? "#ffffff" : "rgba(255,255,255,0.6)",
                    padding: expanded ? "9px 12px" : "10px",
                    justifyContent: expanded ? "flex-start" : "center",
                    gap: expanded ? "10px" : "0",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  }}
                >
                  <Icon size={18} style={{ flexShrink: 0 }} />
                  {expanded && (
                    <span className="text-sm font-medium truncate">{label}</span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div
        className="border-t py-3 flex-shrink-0"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        <button
          onClick={() => {
            document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "/admin";
          }}
          className="flex items-center transition-all duration-150 rounded-xl mx-2 w-[calc(100%-16px)]"
          style={{
            color: "#FF6B35",
            padding: expanded ? "9px 12px" : "10px",
            justifyContent: expanded ? "flex-start" : "center",
            gap: expanded ? "10px" : "0",
          }}
          title={!expanded ? "تسجيل الخروج" : undefined}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,107,53,0.1)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
        >
          <LogOut size={18} style={{ flexShrink: 0 }} />
          {expanded && <span className="text-sm font-medium">تسجيل الخروج</span>}
        </button>
      </div>
    </aside>
  );
}

// ── Mobile Drawer Sidebar ──────────────────────────────────────────────────────
function MobileSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div
      className="lg:hidden fixed inset-0 z-50"
      style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <aside
        className="w-60 h-full flex flex-col shadow-2xl"
        style={{ background: "#1a0a3c", marginRight: "0", marginLeft: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-4 border-b"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <button onClick={onClose} style={{ color: "rgba(255,255,255,0.6)" }}>
            <X size={22} />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-white font-black text-sm">لايف بوكس</span>
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "#E91E8C" }}
            >
              <span className="text-white font-black text-xs">LB</span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {navSections.map((section) => (
            <div key={section.title} className="mb-1">
              <p
                className="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {section.title}
              </p>
              {section.items.map(({ href, label, Icon }) => {
                const active =
                  href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl my-0.5 text-sm font-medium transition-all"
                    style={{
                      background: active ? "#E91E8C" : "transparent",
                      color: active ? "#ffffff" : "rgba(255,255,255,0.65)",
                    }}
                  >
                    <Icon size={17} style={{ flexShrink: 0 }} />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t p-3" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <button
            onClick={() => {
              document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              window.location.href = "/admin";
            }}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium"
            style={{ color: "#FF6B35" }}
          >
            <LogOut size={17} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>
    </div>
  );
}

// ── Main Export ────────────────────────────────────────────────────────────────
export default function AdminSidebar({
  isOpen,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar isOpen={isOpen ?? false} onClose={onClose ?? (() => {})} />
    </>
  );
}
