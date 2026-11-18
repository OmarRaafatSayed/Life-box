"use client";

import { PageHeader, Card } from "@/components/admin/AdminComponents";
import { Eye } from "lucide-react";

export default function VisibilityPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="Visibility Control"
        description="Toggle visibility of categories, sections, and site elements"
      />
      
      <Card className="p-12">
        <div className="text-center">
          <div className="inline-block p-4 bg-purple-100 rounded-2xl mb-4">
            <Eye size={48} className="text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Centralized Visibility Manager</h3>
          <p className="text-gray-600 mb-4">
            Control what's visible on your website from one central location
          </p>
          <div className="max-w-md mx-auto text-left space-y-2 text-sm text-gray-600">
            <p>✓ Toggle category visibility in <a href="/admin/categories" className="text-purple-600 font-semibold">Categories</a></p>
            <p>✓ Control product visibility in <a href="/admin/products" className="text-purple-600 font-semibold">Products</a></p>
            <p>✓ Manage banner display in <a href="/admin/banners" className="text-purple-600 font-semibold">Banners</a></p>
            <p>✓ Enable/disable integrations in <a href="/admin/integrations" className="text-purple-600 font-semibold">Integrations</a></p>
          </div>
        </div>
      </Card>
    </div>
  );
}
