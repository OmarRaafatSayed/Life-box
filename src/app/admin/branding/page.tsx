"use client";

import { PageHeader, Card } from "@/components/admin/AdminComponents";

export default function BrandingPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="Logo & Brand Identity"
        description="Manage logos, favicons, and brand assets"
      />
      
      <Card className="p-12">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Brand Asset Manager</h3>
          <p className="text-gray-600 mb-4">
            Upload and manage your site logo, favicon, and brand colors
          </p>
          <p className="text-sm text-gray-500">
            Visit Settings page to update brand identity and colors
          </p>
          <a
            href="/admin/settings"
            className="inline-block mt-4 px-6 py-3 rounded-2xl text-white font-semibold"
            style={{ background: "linear-gradient(135deg, #3D1A6E, #E91E8C)" }}
          >
            Go to Settings
          </a>
        </div>
      </Card>
    </div>
  );
}
