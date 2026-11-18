"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, Calendar } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { PageHeader, Button, Modal, Input, Checkbox, Table, LoadingSpinner } from "@/components/admin/AdminComponents";

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

const PLACEMENT_AR: Record<string, string> = {
  hero: "الرئيسية",
  sidebar: "الشريط الجانبي",
  popup: "نافذة منبثقة",
  category: "الفئة",
};

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const fetchBanners = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("Banner")
      .select("*")
      .order("displayOrder", { ascending: true });
    setBanners(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchBanners(); }, [fetchBanners]);

  async function handleToggleActive(id: string, isActive: boolean) {
    const supabase = createClient();
    await supabase.from("Banner").update({ isActive: !isActive }).eq("id", id);
    fetchBanners();
  }

  async function handleDelete(id: string) {
    if (!confirm("هل أنت متأكد من حذف هذا البانر؟")) return;
    const supabase = createClient();
    await supabase.from("Banner").delete().eq("id", id);
    fetchBanners();
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <PageHeader
        title="البانرات والوسائط البصرية"
        description="إدارة بانرات الرئيسية والصور الترويجية"
        action={
          <Button onClick={() => { setEditingBanner(null); setShowModal(true); }}>
            <Plus size={20} />
            إضافة بانر
          </Button>
        }
      />

      <Table
        headers={["الصورة", "العنوان", "الموضع", "الجدولة", "الحالة", "الإجراءات"]}
        emptyMessage="لا توجد بانرات. أضف بانرك الأول للبدء."
      >
        {banners.map((banner) => (
          <tr key={banner.id} className="border-t border-gray-100">
            <td className="px-6 py-4">
              {banner.image ? (
                <img src={banner.image} alt={banner.titleAr ?? "بانر"} className="w-20 h-12 object-cover rounded-lg" />
              ) : (
                <div className="w-20 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                  لا صورة
                </div>
              )}
            </td>
            <td className="px-6 py-4 text-right">
              <p className="font-semibold text-gray-900">{banner.titleAr}</p>
              <p className="text-sm text-gray-500">{banner.titleEn}</p>
            </td>
            <td className="px-6 py-4 text-right">
              <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "#E0F7FA", color: "#00838F" }}>
                {PLACEMENT_AR[banner.placement] ?? banner.placement}
              </span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-600 text-right">
              {banner.startDate && banner.endDate ? (
                <div className="flex items-center gap-1 justify-end">
                  <span>
                    {new Date(banner.startDate).toLocaleDateString("ar-EG")} -{" "}
                    {new Date(banner.endDate).toLocaleDateString("ar-EG")}
                  </span>
                  <Calendar size={14} />
                </div>
              ) : "نشط دائمًا"}
            </td>
            <td className="px-6 py-4">
              <button
                onClick={() => handleToggleActive(banner.id, banner.isActive)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                  banner.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                }`}
              >
                {banner.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                {banner.isActive ? "نشط" : "مخفي"}
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

function BannerModal({ banner, onClose, onSave }: { banner: Banner | null; onClose: () => void; onSave: () => void; }) {
  const [formData, setFormData] = useState({
    titleAr: banner?.titleAr ?? "", titleEn: banner?.titleEn ?? "",
    image: banner?.image ?? "", linkUrl: banner?.linkUrl ?? "",
    placement: banner?.placement ?? "hero", isActive: banner?.isActive ?? true,
    startDate: banner?.startDate ?? "", endDate: banner?.endDate ?? "",
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const supabase = createClient();
      if (banner) {
        await supabase.from("Banner").update(formData).eq("id", banner.id);
      } else {
        await supabase.from("Banner").insert({ ...formData, displayOrder: 999 });
      }
      onSave();
    } catch { alert("فشل في حفظ البانر"); }
    finally { setSaving(false); }
  }

  return (
    <Modal isOpen={true} onClose={onClose} title={banner ? "تعديل البانر" : "إضافة بانر جديد"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="العنوان (عربي)" value={formData.titleAr} onChange={(v) => setFormData({ ...formData, titleAr: v })} />
          <Input label="العنوان (إنجليزي)" value={formData.titleEn} onChange={(v) => setFormData({ ...formData, titleEn: v })} />
        </div>
        <Input label="رابط الصورة" value={formData.image} onChange={(v) => setFormData({ ...formData, image: v })} required />
        <Input label="رابط الوجهة" value={formData.linkUrl} onChange={(v) => setFormData({ ...formData, linkUrl: v })} />
        <div className="grid grid-cols-3 gap-4">
          <Input label="الموضع" value={formData.placement} onChange={(v) => setFormData({ ...formData, placement: v })} required />
          <Input label="تاريخ البدء" type="date" value={formData.startDate} onChange={(v) => setFormData({ ...formData, startDate: v })} />
          <Input label="تاريخ الانتهاء" type="date" value={formData.endDate} onChange={(v) => setFormData({ ...formData, endDate: v })} />
        </div>
        <Checkbox label="نشط (مرئي على الموقع)" checked={formData.isActive} onChange={(v) => setFormData({ ...formData, isActive: v })} />
        <div className="flex gap-3 pt-4">
          <Button type="button" onClick={onClose} variant="secondary" className="flex-1">إلغاء</Button>
          <Button type="submit" disabled={saving} className="flex-1">{saving ? "جارٍ الحفظ..." : "حفظ البانر"}</Button>
        </div>
      </form>
    </Modal>
  );
}
