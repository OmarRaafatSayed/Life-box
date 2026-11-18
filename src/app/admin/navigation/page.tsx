"use client";

import { PageHeader, Card } from "@/components/admin/AdminComponents";
import { Menu } from "lucide-react";

export default function NavigationPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="إدارة التنقل"
        description="التحكم في روابط الشريط العلوي والقوائم وهيكل تنقل الموقع"
      />

      <Card className="p-12">
        <div className="text-center">
          <div
            className="inline-block p-4 rounded-2xl mb-4"
            style={{ background: "#F5F0FF" }}
          >
            <Menu size={48} style={{ color: "#3D1A6E" }} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">مدير التنقل</h3>
          <p className="text-gray-600 mb-4">
            أضف وعدّل وأعِد ترتيب عناصر قائمة التنقل بشكل ديناميكي
          </p>
          <p className="text-sm text-gray-500">
            قريبًا — تخصيص كامل للتنقل مع إعادة الترتيب بالسحب والإفلات
          </p>
        </div>
      </Card>
    </div>
  );
}
