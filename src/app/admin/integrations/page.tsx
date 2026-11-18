"use client";

import { useState, useEffect } from "react";
import { Plug, CreditCard, Truck, MessageSquare, Save, Eye, EyeOff } from "lucide-react";
import { PageHeader, Card, Button, Input, Textarea, LoadingSpinner } from "@/components/admin/AdminComponents";

interface ApiIntegration {
  id: string;
  name: string;
  displayName: string;
  isEnabled: boolean;
  apiKey?: string;
  apiSecret?: string;
  webhookUrl?: string;
  config?: any;
}

const integrationIcons: Record<string, any> = {
  stripe: CreditCard,
  paymob: CreditCard,
  fawry: CreditCard,
  whatsapp: MessageSquare,
  shipping: Truck,
};

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<ApiIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchIntegrations();
  }, []);

  async function fetchIntegrations() {
    try {
      const res = await fetch("/api/admin/integrations");
      const data = await res.json();
      setIntegrations(data.integrations || []);
    } catch (error) {
      console.error("Failed to fetch integrations:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(integration: ApiIntegration) {
    setSaving(integration.id);

    try {
      await fetch(`/api/admin/integrations/${integration.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(integration),
      });
      alert("Integration updated successfully!");
      fetchIntegrations();
    } catch (error) {
      console.error("Failed to save integration:", error);
      alert("Failed to save integration");
    } finally {
      setSaving(null);
    }
  }

  async function handleToggle(id: string, isEnabled: boolean) {
    try {
      await fetch(`/api/admin/integrations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isEnabled: !isEnabled }),
      });
      fetchIntegrations();
    } catch (error) {
      console.error("Failed to toggle integration:", error);
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <PageHeader
        title="API Integrations"
        description="Connect and configure external services for payments, shipping, and notifications"
      />

      <div className="space-y-6">
        {integrations.map((integration) => {
          const Icon = integrationIcons[integration.name] || Plug;
          const isSaving = saving === integration.id;

          return (
            <Card key={integration.id} className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-2xl">
                    <Icon size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900">{integration.displayName}</h2>
                    <p className="text-sm text-gray-600">{integration.name}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={integration.isEnabled}
                    onChange={() => handleToggle(integration.id, integration.isEnabled)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">API Key</label>
                  <div className="flex gap-2">
                    <input
                      type={showSecrets[integration.id] ? "text" : "password"}
                      value={integration.apiKey || ""}
                      onChange={(e) => {
                        const updated = integrations.map((i) =>
                          i.id === integration.id ? { ...i, apiKey: e.target.value } : i
                        );
                        setIntegrations(updated);
                      }}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
                      placeholder="Enter API key"
                    />
                    <button
                      onClick={() =>
                        setShowSecrets((prev) => ({ ...prev, [integration.id]: !prev[integration.id] }))
                      }
                      className="p-3 border border-gray-300 rounded-2xl hover:bg-gray-50"
                    >
                      {showSecrets[integration.id] ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">API Secret</label>
                  <input
                    type={showSecrets[integration.id] ? "text" : "password"}
                    value={integration.apiSecret || ""}
                    onChange={(e) => {
                      const updated = integrations.map((i) =>
                        i.id === integration.id ? { ...i, apiSecret: e.target.value } : i
                      );
                      setIntegrations(updated);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
                    placeholder="Enter API secret"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Webhook URL</label>
                  <input
                    type="url"
                    value={integration.webhookUrl || ""}
                    onChange={(e) => {
                      const updated = integrations.map((i) =>
                        i.id === integration.id ? { ...i, webhookUrl: e.target.value } : i
                      );
                      setIntegrations(updated);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://yoursite.com/api/webhooks/..."
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSave(integration)} disabled={isSaving}>
                    <div className="flex items-center gap-2">
                      <Save size={18} />
                      {isSaving ? "Saving..." : "Save Changes"}
                    </div>
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {integrations.length === 0 && (
        <Card className="p-12">
          <div className="text-center text-gray-500">
            <Plug size={48} className="mx-auto mb-4 text-gray-400" />
            <p>No integrations configured yet.</p>
          </div>
        </Card>
      )}
    </div>
  );
}
