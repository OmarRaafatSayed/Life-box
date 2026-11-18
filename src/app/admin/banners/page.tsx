"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, Calendar } from "lucide-react";
import { PageHeader, Card, Button, Modal, Input, Textarea, Checkbox, Table, LoadingSpinner } from "@/components/admin/AdminComponents";

interface Banner {
  id: string;
  titleEn?: string;
  titleAr?: string;
  image: string;
  linkUrl?: string;
  isActive: boolean;
  placement: string;
  startDate?: string;
  endDate?: string;
}

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  async function fetchBanners() {
    try {
      const res = await fetch("/api/admin/banners");
      const data = await res.json();
      setBanners(data.banners || []);
    } catch (error) {
      console.error("Failed to fetch banners:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleActive(id: string, isActive: boolean) {
    try {
      await fetch(`/api/admin/banners/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
      });
      fetchBanners();
    } catch (error) {
      console.error("Failed to toggle banner:", error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this banner?")) return;
    
    try {
      await fetch(`/api/admin/banners/${id}`, { method: "DELETE" });
      fetchBanners();
    } catch (error) {
      console.error("Failed to delete banner:", error);
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <PageHeader
        title="Banners & Visual Assets"
        description="Manage hero banners, promotional images, and visual content"
        action={
          <Button onClick={() => { setEditingBanner(null); setShowModal(true); }}>
            <div className="flex items-center gap-2">
              <Plus size={20} />
              Add Banner
            </div>
          </Button>
        }
      />

      <Table
        headers={["Image", "Title", "Placement", "Schedule", "Status", "Actions"]}
        emptyMessage="No banners found. Add your first banner to get started."
      >
        {banners.map((banner) => (
          <tr key={banner.id} className="border-t border-gray-100">
            <td className="px-6 py-4">
              <img src={banner.image || "/placeholder.jpg"} alt={banner.titleEn} className="w-20 h-12 object-cover rounded-lg" />
            </td>
            <td className="px-6 py-4">
              <p className="font-semibold text-gray-900">{banner.titleEn}</p>
              <p className="text-sm text-gray-500">{banner.titleAr}</p>
            </td>
            <td className="px-6 py-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                {banner.placement}
              </span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">
              {banner.startDate && banner.endDate ? (
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(banner.startDate).toLocaleDateString()} - {new Date(banner.endDate).toLocaleDateString()}
                </div>
              ) : (
                "Always active"
              )}
            </td>
            <td className="px-6 py-4">
              <button
                onClick={() => handleToggleActive(banner.id, banner.isActive)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                  banner.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                }`}
              >
                {banner.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                {banner.isActive ? "Active" : "Hidden"}
              </button>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <button onClick={() => { setEditingBanner(banner); setShowModal(true); }} className="p-2 hover:bg-gray-100 rounded-xl">
                  <Edit2 size={18} className="text-blue-600" />
                </button>
                <button onClick={() => handleDelete(banner.id)} className="p-2 hover:bg-gray-100 rounded-xl">
                  <Trash2 size={18} className="text-red-600" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      {showModal && (
        <BannerModal
          banner={editingBanner}
          onClose={() => { setShowModal(false); setEditingBanner(null); }}
          onSave={() => { setShowModal(false); setEditingBanner(null); fetchBanners(); }}
        />
      )}
    </div>
  );
}

function BannerModal({ banner, onClose, onSave }: { banner: Banner | null; onClose: () => void; onSave: () => void }) {
  const [formData, setFormData] = useState({
    titleEn: banner?.titleEn || "",
    titleAr: banner?.titleAr || "",
    descEn: "",
    descAr: "",
    image: banner?.image || "",
    linkUrl: banner?.linkUrl || "",
    placement: banner?.placement || "hero",
    isActive: banner?.isActive ?? true,
    startDate: banner?.startDate || "",
    endDate: banner?.endDate || "",
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const url = banner ? `/api/admin/banners/${banner.id}` : "/api/admin/banners";
      const method = banner ? "PATCH" : "POST";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      onSave();
    } catch (error) {
      console.error("Failed to save banner:", error);
      alert("Failed to save banner");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal isOpen={true} onClose={onClose} title={banner ? "Edit Banner" : "Add New Banner"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Title (English)" value={formData.titleEn} onChange={(val) => setFormData({ ...formData, titleEn: val })} />
          <Input label="Title (Arabic)" value={formData.titleAr} onChange={(val) => setFormData({ ...formData, titleAr: val })} />
        </div>

        <Input label="Image URL" value={formData.image} onChange={(val) => setFormData({ ...formData, image: val })} required />
        <Input label="Link URL" type="url" value={formData.linkUrl} onChange={(val) => setFormData({ ...formData, linkUrl: val })} />

        <div className="grid grid-cols-3 gap-4">
          <Input label="Placement" value={formData.placement} onChange={(val) => setFormData({ ...formData, placement: val })} required />
          <Input label="Start Date" type="date" value={formData.startDate} onChange={(val) => setFormData({ ...formData, startDate: val })} />
          <Input label="End Date" type="date" value={formData.endDate} onChange={(val) => setFormData({ ...formData, endDate: val })} />
        </div>

        <Checkbox label="Active (visible on website)" checked={formData.isActive} onChange={(val) => setFormData({ ...formData, isActive: val })} />

        <div className="flex gap-3 pt-4">
          <Button type="button" onClick={onClose} variant="secondary" className="flex-1">Cancel</Button>
          <Button type="submit" disabled={saving} className="flex-1">{saving ? "Saving..." : "Save Banner"}</Button>
        </div>
      </form>
    </Modal>
  );
}
