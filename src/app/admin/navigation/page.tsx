"use client";

import { PageHeader, Card } from "@/components/admin/AdminComponents";

export default function NavigationPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="Navigation Management"
        description="Control navbar links, menus, and site navigation structure"
      />
      
      <Card className="p-12">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Navigation Manager</h3>
          <p className="text-gray-600 mb-4">
            Add, edit, and reorder navigation menu items dynamically
          </p>
          <p className="text-sm text-gray-500">
            Feature coming soon - Full navigation customization with drag-and-drop reordering
          </p>
        </div>
      </Card>
    </div>
  );
}
