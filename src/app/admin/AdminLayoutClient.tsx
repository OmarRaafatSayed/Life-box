"use client";

import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-row">
      {/* Sidebar — fixed width handled internally (64px collapsed / 224px expanded) */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content — flex-1 fills the remaining space automatically */}
      <div className="flex-1 min-h-screen flex flex-col overflow-x-hidden">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 lg:p-6">{children}</main>

        <footer className="border-t border-gray-200 bg-white px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
            <p>© 2025 لايف بوكس. جميع الحقوق محفوظة.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:opacity-80 transition-colors" style={{ color: "#3D1A6E" }}>التوثيق</a>
              <a href="#" className="hover:opacity-80 transition-colors" style={{ color: "#3D1A6E" }}>الدعم</a>
              <a href="#" className="hover:opacity-80 transition-colors" style={{ color: "#3D1A6E" }}>الخصوصية</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
