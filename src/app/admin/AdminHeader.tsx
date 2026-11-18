"use client";

import { useState } from "react";
import { Menu, Bell, Search, Store } from "lucide-react";

export default function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">

        {/* Right side (RTL): Mobile menu + search */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Menu size={24} className="text-gray-700" />
          </button>

          <div className="hidden md:flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 max-w-md w-full">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن منتجات، طلبات، عملاء..."
              className="bg-transparent border-none outline-none text-sm text-gray-700 w-full text-right"
              style={{ direction: "rtl" }}
            />
          </div>
        </div>

        {/* Center: Store link */}
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "#F5F0FF" }}>
          <Store size={18} style={{ color: "#3D1A6E" }} />
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold transition-colors hover:opacity-80"
            style={{ color: "#3D1A6E" }}
          >
            عرض المتجر
          </a>
        </div>

        {/* Left side (RTL): notifications + profile */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <Bell size={20} className="text-gray-700" />
              <span
                className="absolute top-1 right-1 w-2 h-2 rounded-full border-2 border-white"
                style={{ background: "#E91E8C" }}
              />
            </button>

            {showNotifications && (
              <div className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="font-bold text-gray-900">الإشعارات</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                    <div className="flex gap-3">
                      <div
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ background: "#00BCD4" }}
                      />
                      <div className="flex-1 text-right">
                        <p className="text-sm font-semibold text-gray-900">طلب جديد #1234</p>
                        <p className="text-xs text-gray-600 mt-1">أحمد حسن قدّم طلبًا بقيمة 1,250 جنيه</p>
                        <p className="text-xs text-gray-400 mt-1">منذ دقيقتين</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                    <div className="flex gap-3">
                      <div
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ background: "#FF6B35" }}
                      />
                      <div className="flex-1 text-right">
                        <p className="text-sm font-semibold text-gray-900">تنبيه مخزون منخفض</p>
                        <p className="text-xs text-gray-600 mt-1">5 منتجات تقترب من نفاد المخزون</p>
                        <p className="text-xs text-gray-400 mt-1">منذ ساعة</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <div className="flex-1 text-right">
                        <p className="text-sm font-semibold text-gray-900">تم استلام الدفع</p>
                        <p className="text-xs text-gray-600 mt-1">تم تأكيد الدفع للطلب #1233</p>
                        <p className="text-xs text-gray-400 mt-1">منذ 3 ساعات</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 border-t border-gray-100 text-center">
                  <a href="#" className="text-sm font-semibold hover:opacity-80" style={{ color: "#3D1A6E" }}>
                    عرض كل الإشعارات
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Profile badge */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
            style={{ background: "#3D1A6E" }}
          >
            <span className="hidden sm:block text-sm font-semibold text-white">المسؤول</span>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "rgba(255,255,255,0.2)" }}
            >
              م
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
