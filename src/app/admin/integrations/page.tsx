"use client";

import { useState, useEffect, useCallback } from "react";
import { Plug, CreditCard, Truck, MessageSquare, Save, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { PageHeader, Card, Button, LoadingSpinner } from "@/components/admin/AdminComponents";

interface ApiIntegration {
  id: string;
  name: string;
  displayName: string;
  isEnabled: boolean;
  apiKey?: string;
  apiSecret?: string;
  webhookUrl?: string;
}

const ICONS: Record<string, React.ComponentType<{ size: number; style?: React.CSSProperties }>> = {
  stripe: CreditCard, paymob: CreditCard, fawry: CreditCard,
  whatsapp: MessageSquare, shipping: Truck,
};

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<ApiIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});

  const fetchIntegrations = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("ApiIntegration")
      .select("id, name, displayName, isEnabled, apiKey, apiSecret, webhookUrl")
      .order("name", { ascending: true });
    setIntegrations(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchIntegrations(); }, [fetchIntegrations]);

  async function handleSave(integration: ApiIntegration) {
    setSaving(integration.id);
    try {
      const supabase = createClient();
      await supabase
        .from("ApiIntegration")
        .update({
          apiKey: integration.apiKey,
          apiSecret: integration.apiSecret,
          webhookUrl: integration.webhookUrl,
          isEnabled: integration.isEnabled,
        })
        .eq("id", integration.id);
      alert("تم تحديث التكامل بنجاح!");
    } catch { alert("فشل في الحفظ"); }
    finally { setSaving(null); fetchIntegrations(); }
  }

  async function handleToggle(id: string, isEnabled: boolean) {
    const supabase = createClient();
    await supabase.from("ApiIntegration").update({ isEnabled: !isEnabled }).eq("id", id);
    fetchIntegrations();
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <PageHeader
        title="التكاملات والواجهات البرمجية"
        description="ربط وضبط الخدمات الخارجية للمدفوعات والشحن والإشعارات"
      />

      {integrations.length === 0 ? (
        <Card className="p-12">
          <div className="text-center text-gray-500">
            <Plug size={48} className="mx-auto mb-4 text-gray-400" />
            <p>لم يتم ضبط أي تكاملات بعد.</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {integrations.map((integration) => {
            const Icon = ICONS[integration.name] ?? Plug;
            const isSaving = saving === integration.id;

            return (
              <Card key={integration.id} className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={integration.isEnabled}
                      onChange={() => handleToggle(integration.id, integration.isEnabled)}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-700" />
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <h2 className="text-xl font-black text-gray-900">{integration.displayName}</h2>
                      <p className="text-sm text-gray-600">{integration.name}</p>
                    </div>
                    <div className="p-3 rounded-2xl" style={{ background: "#F5F0FF" }}>
                      <Icon size={24} style={{ color: "#3D1A6E" }} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* API Key */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 text-right">مفتاح API</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowSecrets((p) => ({ ...p, [integration.id]: !p[integration.id] }))}
                        className="p-3 border border-gray-300 rounded-2xl hover:bg-gray-50"
                      >
                        {showSecrets[integration.id] ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                      <input
                        type={showSecrets[integration.id] ? "text" : "password"}
                        value={integration.apiKey ?? ""}
                        onChange={(e) => setIntegrations(integrations.map((i) => i.id === integration.id ? { ...i, apiKey: e.target.value } : i))}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl font-mono text-sm"
                        placeholder="أدخل مفتاح API"
                        style={{ direction: "ltr" }}
                      />
                    </div>
                  </div>

                  {/* API Secret */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 text-right">الكود السري</label>
                    <input
                      type={showSecrets[integration.id] ? "text" : "password"}
                      value={integration.apiSecret ?? ""}
                      onChange={(e) => setIntegrations(integrations.map((i) => i.id === integration.id ? { ...i, apiSecret: e.target.value } : i))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl font-mono text-sm"
                      placeholder="أدخل الكود السري"
                      style={{ direction: "ltr" }}
                    />
                  </div>

                  {/* Webhook */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 text-right">رابط Webhook</label>
                    <input
                      type="url"
                      value={integration.webhookUrl ?? ""}
                      onChange={(e) => setIntegrations(integrations.map((i) => i.id === integration.id ? { ...i, webhookUrl: e.target.value } : i))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl"
                      placeholder="https://yoursite.com/api/webhooks/..."
                      style={{ direction: "ltr" }}
                    />
                  </div>

                  <div className="flex justify-start">
                    <Button onClick={() => handleSave(integration)} disabled={isSaving}>
                      <Save size={18} />
                      {isSaving ? "جارٍ الحفظ..." : "حفظ التغييرات"}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
