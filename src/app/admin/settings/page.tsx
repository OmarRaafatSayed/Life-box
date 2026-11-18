"use client";

import { useState, useEffect } from "react";
import { Save, Store, Globe, DollarSign, Mail } from "lucide-react";
import { PageHeader, Card, Button, Input, Textarea, LoadingSpinner } from "@/components/admin/AdminComponents";
import { createClient } from "@/utils/supabase/client";

type SiteSettings = {
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
};

const DEFAULT_SETTINGS: SiteSettings = {
  id: "site_settings",
  storeName: "Life Box",
  storeNameAr: "لايف بوكس",
  primaryColor: "#3D1A6E",
  secondaryColor: "#E91E8C",
  currency: "EGP",
  currencySymbol: "£",
  taxRate: 0,
  shippingFee: 50,
  maintenanceMode: false,
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("SiteSettings")
      .select("*")
      .eq("id", "site_settings")
      .single()
      .then(({ data }) => {
        setSettings(data ?? DEFAULT_SETTINGS);
        setLoading(false);
      });
  }, []);

  async function handleSave() {
    if (!settings) return;
    setSaving(true);
    try {
      const supabase = createClient();
      await supabase.from("SiteSettings").upsert({ ...settings, id: "site_settings" });
      alert("تم حفظ الإعدادات بنجاح!");
    } catch {
      alert("فشل في حفظ الإعدادات");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !settings) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <PageHeader
        title="إعدادات الموقع"
        description="ضبط الإعدادات العامة وتفضيلات المتجر"
        action={
          <Button onClick={handleSave} disabled={saving}>
            <Save size={20} />
            {saving ? "جارٍ الحفظ..." : "حفظ التغييرات"}
          </Button>
        }
      />

      <div className="space-y-6">
        {/* Store Identity */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl" style={{ background: "#F5F0FF" }}>
              <Store size={24} style={{ color: "#3D1A6E" }} />
            </div>
            <div className="text-right">
              <h2 className="text-xl font-black text-gray-900">هوية المتجر</h2>
              <p className="text-sm text-gray-600">المعلومات الأساسية لمتجرك</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="اسم المتجر (عربي)" value={settings.storeNameAr} onChange={(v) => setSettings({ ...settings, storeNameAr: v })} required />
            <Input label="اسم المتجر (إنجليزي)" value={settings.storeName} onChange={(v) => setSettings({ ...settings, storeName: v })} required />
            <Input label="رابط الشعار" value={settings.logo ?? ""} onChange={(v) => setSettings({ ...settings, logo: v })} />
            <Input label="رابط الأيقونة" value={settings.favicon ?? ""} onChange={(v) => setSettings({ ...settings, favicon: v })} />
          </div>
        </Card>

        {/* Brand Colors */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl" style={{ background: "#FCE4EC" }}>
              <Globe size={24} style={{ color: "#E91E8C" }} />
            </div>
            <div className="text-right">
              <h2 className="text-xl font-black text-gray-900">ألوان العلامة التجارية</h2>
              <p className="text-sm text-gray-600">خصّص نظام الألوان</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "اللون الرئيسي", key: "primaryColor" as const },
              { label: "اللون الثانوي", key: "secondaryColor" as const },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="block text-sm font-bold text-gray-700 mb-2 text-right">{label}</label>
                <div className="flex gap-3">
                  <Input label="" value={settings[key]} onChange={(v) => setSettings({ ...settings, [key]: v })} className="flex-1" />
                  <input
                    type="color"
                    value={settings[key]}
                    onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                    className="w-14 h-11 rounded-xl border-2 border-gray-300 cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Currency */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-green-100">
              <DollarSign size={24} className="text-green-600" />
            </div>
            <div className="text-right">
              <h2 className="text-xl font-black text-gray-900">العملة والأسعار</h2>
              <p className="text-sm text-gray-600">ضبط إعدادات الأسعار والضرائب</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="رمز العملة" value={settings.currency} onChange={(v) => setSettings({ ...settings, currency: v })} required />
            <Input label="علامة العملة" value={settings.currencySymbol} onChange={(v) => setSettings({ ...settings, currencySymbol: v })} required />
            <Input label="نسبة الضريبة (%)" type="number" value={String(settings.taxRate)} onChange={(v) => setSettings({ ...settings, taxRate: parseFloat(v) || 0 })} />
            <Input label="رسوم الشحن" type="number" value={String(settings.shippingFee)} onChange={(v) => setSettings({ ...settings, shippingFee: parseFloat(v) || 0 })} />
            <Input label="الحد الأدنى للشحن المجاني" type="number" value={String(settings.freeShippingMin ?? "")} onChange={(v) => setSettings({ ...settings, freeShippingMin: v ? parseFloat(v) : undefined })} />
          </div>
        </Card>

        {/* Contact */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-blue-100">
              <Mail size={24} className="text-blue-600" />
            </div>
            <div className="text-right">
              <h2 className="text-xl font-black text-gray-900">معلومات التواصل</h2>
              <p className="text-sm text-gray-600">كيف يتواصل معك العملاء</p>
            </div>
          </div>
          <div className="space-y-4">
            <Input label="البريد الإلكتروني" type="email" value={settings.contactEmail ?? ""} onChange={(v) => setSettings({ ...settings, contactEmail: v })} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="رقم الهاتف" type="tel" value={settings.contactPhone ?? ""} onChange={(v) => setSettings({ ...settings, contactPhone: v })} />
              <Input label="رقم واتساب" type="tel" value={settings.whatsappNumber ?? ""} onChange={(v) => setSettings({ ...settings, whatsappNumber: v })} />
            </div>
            <Textarea label="العنوان" value={settings.contactAddress ?? ""} onChange={(v) => setSettings({ ...settings, contactAddress: v })} rows={2} />
          </div>
        </Card>

        {/* Social */}
        <Card className="p-6">
          <h2 className="text-xl font-black text-gray-900 mb-4 text-right">روابط التواصل الاجتماعي</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input label="رابط فيسبوك" type="url" value={settings.facebookUrl ?? ""} onChange={(v) => setSettings({ ...settings, facebookUrl: v })} />
            <Input label="رابط إنستغرام" type="url" value={settings.instagramUrl ?? ""} onChange={(v) => setSettings({ ...settings, instagramUrl: v })} />
            <Input label="رابط تويتر" type="url" value={settings.twitterUrl ?? ""} onChange={(v) => setSettings({ ...settings, twitterUrl: v })} />
          </div>
        </Card>

        {/* About */}
        <Card className="p-6">
          <h2 className="text-xl font-black text-gray-900 mb-4 text-right">عن المتجر</h2>
          <div className="grid grid-cols-2 gap-4">
            <Textarea label="عن المتجر (عربي)" value={settings.aboutAr ?? ""} onChange={(v) => setSettings({ ...settings, aboutAr: v })} rows={5} />
            <Textarea label="عن المتجر (إنجليزي)" value={settings.aboutEn ?? ""} onChange={(v) => setSettings({ ...settings, aboutEn: v })} rows={5} />
          </div>
        </Card>

        {/* Maintenance */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-700" />
            </label>
            <div className="text-right">
              <h2 className="text-xl font-black text-gray-900 mb-1">وضع الصيانة</h2>
              <p className="text-sm text-gray-600">تعطيل الموقع مؤقتًا لأعمال الصيانة</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
