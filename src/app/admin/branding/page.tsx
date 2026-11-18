"use client";

import { PageHeader, Card } from "@/components/admin/AdminComponents";

export default function BrandingPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="الشعار والهوية البصرية"
        description="إدارة الشعارات والأيقونات وأصول العلامة التجارية"
      />

      <Card className="p-12">
        <div className="text-center">
          <div
            className="inline-block p-4 rounded-2xl mb-4"
            style={{ background: "#F5F0FF" }}
          >
            <span className="text-4xl font-black" style={{ color: "#3D1A6E" }}>LB</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">إدارة أصول العلامة التجارية</h3>
          <p className="text-gray-600 mb-4">
            ارفع وأدر شعار الموقع والأيقونة وألوان العلامة التجارية
          </p>
          <p className="text-sm text-gray-500 mb-6">
            قم بزيارة صفحة الإعدادات لتحديث الهوية البصرية والألوان
          </p>
          <a
            href="/admin/settings"
            className="inline-block px-6 py-3 rounded-2xl text-white font-semibold hover:opacity-90 transition-opacity"
            style={{ background: "#3D1A6E" }}
          >
            الذهاب إلى الإعدادات
          </a>
        </div>
      </Card>
    </div>
  );
}
