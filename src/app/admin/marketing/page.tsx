"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, Megaphone } from "lucide-react";
import { PageHeader, Card, Button, Modal, Input, Textarea, Checkbox, Table, LoadingSpinner, Select } from "@/components/admin/AdminComponents";

interface MarketingContent {
  id: string;
  type: string;
  titleEn?: string;
  titleAr?: string;
  contentEn?: string;
  contentAr?: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
}

export default function MarketingPage() {
  const [contents, setContents] = useState<MarketingContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingContent, setEditingContent] = useState<MarketingContent | null>(null);

  useEffect(() => {
    fetchContents();
  }, []);

  async function fetchContents() {
    try {
      const res = await fetch("/api/admin/marketing");
      const data = await res.json();
      setContents(data.contents || []);
    } catch (error) {
      console.error("Failed to fetch marketing content:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleActive(id: string, isActive: boolean) {
    try {
      await fetch(`/api/admin/marketing/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
      });
      fetchContents();
    } catch (error) {
      console.error("Failed to toggle content:", error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this content?")) return;
    
    try {
      await fetch(`/api/admin/marketing/${id}`, { method: "DELETE" });
      fetchContents();
    } catch (error) {
      console.error("Failed to delete content:", error);
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <PageHeader
        title="Marketing & Content Hub"
        description="Manage promotional popups, discount banners, and marketing campaigns"
        action={
          <Button onClick={() => { setEditingContent(null); setShowModal(true); }}>
            <div className="flex items-center gap-2">
              <Plus size={20} />
              Add Content
            </div>
          </Button>
        }
      />

      <Table
        headers={["Type", "Title", "Schedule", "Status", "Actions"]}
        emptyMessage="No marketing content found. Create your first campaign to get started."
      >
        {contents.map((content) => (
          <tr key={content.id} className="border-t border-gray-100">
            <td className="px-6 py-4">
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                {content.type}
              </span>
            </td>
            <td className="px-6 py-4">
              <p className="font-semibold text-gray-900">{content.titleEn}</p>
              <p className="text-sm text-gray-500">{content.titleAr}</p>
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">
              {content.startDate && content.endDate ? (
                <div>
                  {new Date(content.startDate).toLocaleDateString()} -<br />
                  {new Date(content.endDate).toLocaleDateString()}
                </div>
              ) : (
                "Always active"
              )}
            </td>
            <td className="px-6 py-4">
              <button
                onClick={() => handleToggleActive(content.id, content.isActive)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                  content.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                }`}
              >
                {content.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                {content.isActive ? "Active" : "Hidden"}
              </button>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <button onClick={() => { setEditingContent(content); setShowModal(true); }} className="p-2 hover:bg-gray-100 rounded-xl">
                  <Edit2 size={18} className="text-blue-600" />
                </button>
                <button onClick={() => handleDelete(content.id)} className="p-2 hover:bg-gray-100 rounded-xl">
                  <Trash2 size={18} className="text-red-600" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      {showModal && (
        <MarketingModal
          content={editingContent}
          onClose={() => { setShowModal(false); setEditingContent(null); }}
          onSave={() => { setShowModal(false); setEditingContent(null); fetchContents(); }}
        />
      )}
    </div>
  );
}

function MarketingModal({ content, onClose, onSave }: { content: MarketingContent | null; onClose: () => void; onSave: () => void }) {
  const [formData, setFormData] = useState({
    type: content?.type || "popup",
    titleEn: content?.titleEn || "",
    titleAr: content?.titleAr || "",
    contentEn: content?.contentEn || "",
    contentAr: content?.contentAr || "",
    isActive: content?.isActive ?? true,
    startDate: content?.startDate || "",
    endDate: content?.endDate || "",
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const url = content ? `/api/admin/marketing/${content.id}` : "/api/admin/marketing";
      const method = content ? "PATCH" : "POST";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      onSave();
    } catch (error) {
      console.error("Failed to save content:", error);
      alert("Failed to save content");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal isOpen={true} onClose={onClose} title={content ? "Edit Marketing Content" : "Add New Marketing Content"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Content Type"
          value={formData.type}
          onChange={(val) => setFormData({ ...formData, type: val })}
          options={[
            { value: "popup", label: "Popup" },
            { value: "discount_banner", label: "Discount Banner" },
            { value: "announcement", label: "Announcement" },
          ]}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input label="Title (English)" value={formData.titleEn} onChange={(val) => setFormData({ ...formData, titleEn: val })} />
          <Input label="Title (Arabic)" value={formData.titleAr} onChange={(val) => setFormData({ ...formData, titleAr: val })} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Textarea label="Content (English)" value={formData.contentEn} onChange={(val) => setFormData({ ...formData, contentEn: val })} rows={4} />
          <Textarea label="Content (Arabic)" value={formData.contentAr} onChange={(val) => setFormData({ ...formData, contentAr: val })} rows={4} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Start Date" type="date" value={formData.startDate} onChange={(val) => setFormData({ ...formData, startDate: val })} />
          <Input label="End Date" type="date" value={formData.endDate} onChange={(val) => setFormData({ ...formData, endDate: val })} />
        </div>

        <Checkbox label="Active (visible on website)" checked={formData.isActive} onChange={(val) => setFormData({ ...formData, isActive: val })} />

        <div className="flex gap-3 pt-4">
          <Button type="button" onClick={onClose} variant="secondary" className="flex-1">Cancel</Button>
          <Button type="submit" disabled={saving} className="flex-1">{saving ? "Saving..." : "Save Content"}</Button>
        </div>
      </form>
    </Modal>
  );
}
