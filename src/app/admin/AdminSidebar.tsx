"use client";

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
  LineChart
} from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/categories", label: "Categories", Icon: FolderTree },
  { href: "/admin/products", label: "Products", Icon: Package },
  { href: "/admin/banners", label: "Banners & Assets", Icon: Image },
  { href: "/admin/navigation", label: "Navigation", Icon: Menu },
  { href: "/admin/branding", label: "Branding", Icon: Palette },
  { href: "/admin/visibility", label: "Visibility Control", Icon: Eye },
  { href: "/admin/integrations", label: "API Integrations", Icon: Plug },
  { href: "/admin/settings", label: "Site Settings", Icon: Settings },
  { href: "/admin/marketing", label: "Marketing", Icon: Megaphone },
  { href: "/admin/financials", label: "Financials", Icon: DollarSign },
  { href: "/admin/best-sellers", label: "Best Sellers", Icon: TrendingUp },
  { href: "/admin/analytics", label: "Analytics & BI", Icon: LineChart },
  { href: "/admin/orders", label: "Orders", Icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", Icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden md:flex flex-col w-64 min-h-screen py-6 px-4 gap-2 overflow-y-auto"
      style={{ background: "linear-gradient(180deg, #2D1050 0%, #1a0a3c 100%)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-3 mb-8">
        <div
          className="w-9 h-9 rounded-2xl flex items-center justify-center text-white font-black text-sm"
          style={{ background: "linear-gradient(135deg, #E91E8C, #FF6B35)" }}
        >
          LB
        </div>
        <span className="text-lg font-black text-white">Life Box</span>
      </div>

      {/* Nav */}
      <div className="flex flex-col gap-1 flex-1">
        {links.map(({ href, label, Icon }) => {
          const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm transition-all"
              style={
                active
                  ? { background: "linear-gradient(135deg, #3D1A6E, #E91E8C)", color: "white" }
                  : { color: "rgba(255,255,255,0.6)" }
              }
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <button
          onClick={() => {
            document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "/admin/login";
          }}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-semibold transition-all hover:bg-white/10"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
