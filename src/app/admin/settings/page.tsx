"use client";

import { useState, useEffect } from "react";
import { Save, Store, Globe, DollarSign, Mail, Phone, MapPin } from "lucide-react";
import { PageHeader, Card, Button, Input, Textarea, LoadingSpinner } from "@/components/admin/AdminComponents";

interface SiteSettings {
  id: string;
  storeName: string;
  storeNameAr: string;
  logo?: string;
  favicon?: string;
  primaryColor: string;
  secondaryColor: string;
  currency: string;
  currencySymbol: string;
  taxRate: number;
  shippingFee: number;
  freeShippingMin?: number;
  maintenanceMode: boolean;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  aboutEn?: string;
  aboutAr?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  whatsappNumber?: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      setSettings(data.settings);
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!settings) return;
    setSaving(true);

    try {
      await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Failed to save settings:", error);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !settings) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <PageHeader
        title="Site Settings"
        description="Configure your store's general settings and preferences"
        action={
          <Button onClick={handleSave} disabled={saving}>
            <div className="flex items-center gap-2">
              <Save size={20} />
              {saving ? "Saving..." : "Save Changes"}
            </div>
          </Button>
        }
      />

      <div className="space-y-6">
        {/* Store Identity */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-100 rounded-2xl">
              <Store size={24} className="text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900">Store Identity</h2>
              <p className="text-sm text-gray-600">Basic information about your store</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Store Name (English)"
              value={settings.storeName}
              onChange={(val) => setSettings({ ...settings, storeName: val })}
              required
            />
            <Input
              label="Store Name (Arabic)"
              value={settings.storeNameAr}
              onChange={(val) => setSettings({ ...settings, storeNameAr: val })}
              required
            />
            <Input
              label="Logo URL"
              value={settings.logo || ""}
              onChange={(val) => setSettings({ ...settings, logo: val })}
            />
            <Input
              label="Favicon URL"
              value={settings.favicon || ""}
              onChange={(val) => setSettings({ ...settings, favicon: val })}
            />
          </div>
        </Card>

        {/* Branding */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-pink-100 rounded-2xl">
              <Globe size={24} className="text-pink-600" />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900">Brand Colors</h2>
              <p className="text-sm text-gray-600">Customize your brand's color scheme</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Primary Color</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                  className="w-16 h-12 rounded-2xl border-2 border-gray-300"
                />
                <Input
                  label=""
                  value={settings.primaryColor}
                  onChange={(val) => setSettings({ ...settings, primaryColor: val })}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Secondary Color</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={settings.secondaryColor}
                  onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                  className="w-16 h-12 rounded-2xl border-2 border-gray-300"
                />
                <Input
                  label=""
                  value={settings.secondaryColor}
                  onChange={(val) => setSettings({ ...settings, secondaryColor: val })}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Currency & Pricing */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-100 rounded-2xl">
              <DollarSign size={24} className="text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900">Currency & Pricing</h2>
              <p className="text-sm text-gray-600">Configure pricing and tax settings</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Currency Code"
              value={settings.currency}
              onChange={(val) => setSettings({ ...settings, currency: val })}
              placeholder="e.g., EGP, USD"
              required
            />
            <Input
              label="Currency Symbol"
              value={settings.currencySymbol}
              onChange={(val) => setSettings({ ...settings, currencySymbol: val })}
              placeholder="e.g., £, $"
              required
            />
            <Input
              label="Tax Rate (%)"
              type="number"
              value={settings.taxRate.toString()}
              onChange={(val) => setSettings({ ...settings, taxRate: parseFloat(val) || 0 })}
            />
            <Input
              label="Shipping Fee"
              type="number"
              value={settings.shippingFee.toString()}
              onChange={(val) => setSettings({ ...settings, shippingFee: parseFloat(val) || 0 })}
            />
            <Input
              label="Free Shipping Minimum (Optional)"
              type="number"
              value={settings.freeShippingMin?.toString() || ""}
              onChange={(val) => setSettings({ ...settings, freeShippingMin: val ? parseFloat(val) : undefined })}
            />
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <Mail size={24} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900">Contact Information</h2>
              <p className="text-sm text-gray-600">How customers can reach you</p>
            </div>
          </div>

          <div className="space-y-4">
            <Input
              label="Contact Email"
              type="email"
              value={settings.contactEmail || ""}
              onChange={(val) => setSettings({ ...settings, contactEmail: val })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Contact Phone"
                type="tel"
                value={settings.contactPhone || ""}
                onChange={(val) => setSettings({ ...settings, contactPhone: val })}
              />
              <Input
                label="WhatsApp Number"
                type="tel"
                value={settings.whatsappNumber || ""}
                onChange={(val) => setSettings({ ...settings, whatsappNumber: val })}
              />
            </div>
            <Textarea
              label="Address"
              value={settings.contactAddress || ""}
              onChange={(val) => setSettings({ ...settings, contactAddress: val })}
              rows={2}
            />
          </div>
        </Card>

        {/* Social Media */}
        <Card className="p-6">
          <h2 className="text-xl font-black text-gray-900 mb-4">Social Media Links</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Facebook URL"
              type="url"
              value={settings.facebookUrl || ""}
              onChange={(val) => setSettings({ ...settings, facebookUrl: val })}
            />
            <Input
              label="Instagram URL"
              type="url"
              value={settings.instagramUrl || ""}
              onChange={(val) => setSettings({ ...settings, instagramUrl: val })}
            />
            <Input
              label="Twitter URL"
              type="url"
              value={settings.twitterUrl || ""}
              onChange={(val) => setSettings({ ...settings, twitterUrl: val })}
            />
          </div>
        </Card>

        {/* About Section */}
        <Card className="p-6">
          <h2 className="text-xl font-black text-gray-900 mb-4">About Your Store</h2>
          <div className="grid grid-cols-2 gap-4">
            <Textarea
              label="About (English)"
              value={settings.aboutEn || ""}
              onChange={(val) => setSettings({ ...settings, aboutEn: val })}
              rows={6}
            />
            <Textarea
              label="About (Arabic)"
              value={settings.aboutAr || ""}
              onChange={(val) => setSettings({ ...settings, aboutAr: val })}
              rows={6}
            />
          </div>
        </Card>

        {/* Maintenance Mode */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-gray-900 mb-1">Maintenance Mode</h2>
              <p className="text-sm text-gray-600">Temporarily disable the website for maintenance</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </Card>
      </div>
    </div>
  );
}
