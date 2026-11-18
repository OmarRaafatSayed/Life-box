"use client";

import { PageHeader, Card } from "@/components/admin/AdminComponents";
import { Eye } from "lucide-react";

export default function VisibilityPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="التحكم في الظهور"
        description="تبديل ظهور الفئات والأقسام وعناصر الموقع"
      />

      <Card className="p-12">
        <div className="text-center">
          <div
            className="inline-block p-4 rounded-2xl mb-4"
            style={{ background: "#F5F0FF" }}
          >
            <Eye size={48} style={{ color: "#3D1A6E" }} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">مدير الظهور المركزي</h3>
          <p className="text-gray-600 mb-4">
            تحكم في ما يظهر على موقعك من مكان واحد
          </p>
          <div className="max-w-md mx-auto text-right space-y-2 text-sm text-gray-600">
            <p>
              ✓ تبديل ظهور الفئات في{" "}
              <a href="/admin/categories" className="font-semibold hover:opacity-80" style={{ color: "#3D1A6E" }}>
                الفئات
              </a>
            </p>
            <p>
              ✓ التحكم في ظهور المنتجات في{" "}
              <a href="/admin/products" className="font-semibold hover:opacity-80" style={{ color: "#3D1A6E" }}>
                المنتجات
              </a>
            </p>
            <p>
              ✓ إدارة عرض البانرات في{" "}
              <a href="/admin/banners" className="font-semibold hover:opacity-80" style={{ color: "#3D1A6E" }}>
                البانرات
              </a>
            </p>
            <p>
              ✓ تفعيل/تعطيل التكاملات في{" "}
              <a href="/admin/integrations" className="font-semibold hover:opacity-80" style={{ color: "#3D1A6E" }}>
                التكاملات
              </a>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
