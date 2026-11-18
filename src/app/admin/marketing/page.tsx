"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { PageHeader, Button, Modal, Input, Textarea, Checkbox, Table, LoadingSpinner, Select } from "@/components/admin/AdminComponents";

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

const TYPE_AR: Record<string, string> = {
  popup: "نافذة منبثقة",
  discount_banner: "بانر خصم",
  announcement: "إعلان",
};

export default function MarketingPage() {
  const [contents, setContents] = useState<MarketingContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingContent, setEditingContent] = useState<MarketingContent | null>(null);

  const fetchContents = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("MarketingContent")
      .select("*")
      .order("createdAt", { ascending: false });
    setContents(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchContents(); }, [fetchContents]);

  async function handleToggleActive(id: string, isActive: boolean) {
    const supabase = createClient();
    await supabase.from("MarketingContent").update({ isActive: !isActive }).eq("id", id);
    fetchContents();
  }

  async function handleDelete(id: string) {
    if (!confirm("هل أنت متأكد من حذف هذا المحتوى؟")) return;
    const supabase = createClient();
    await supabase.from("MarketingContent").delete().eq("id", id);
    fetchContents();
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <PageHeader
        title="التسويق ومركز المحتوى"
        description="إدارة النوافذ المنبثقة وبانرات الخصم والحملات التسويقية"
        action={
          <Button onClick={() => { setEditingContent(null); setShowModal(true); }}>
            <Plus size={20} />
            إضافة محتوى
          </Button>
        }
      />

      <Table
        headers={["النوع", "العنوان", "الجدولة", "الحالة", "الإجراءات"]}
        emptyMessage="لا يوجد محتوى تسويقي. أنشئ حملتك الأولى للبدء."
      >
        {contents.map((content) => (
          <tr key={content.id} className="border-t border-gray-100">
            <td className="px-6 py-4 text-right">
              <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "#F5F0FF", color: "#3D1A6E" }}>
                {TYPE_AR[content.type] ?? content.type}
              </span>
            </td>
            <td className="px-6 py-4 text-right">
              <p className="font-semibold text-gray-900">{content.titleAr}</p>
              <p className="text-sm text-gray-500">{content.titleEn}</p>
            </td>
            <td className="px-6 py-4 text-sm text-gray-600 text-right">
              {content.startDate && content.endDate
                ? `${new Date(content.startDate).toLocaleDateString("ar-EG")} - ${new Date(content.endDate).toLocaleDateString("ar-EG")}`
                : "نشط دائمًا"}
            </td>
            <td className="px-6 py-4">
              <button
                onClick={() => handleToggleActive(content.id, content.isActive)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${content.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
              >
                {content.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                {content.isActive ? "نشط" : "مخفي"}
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

function MarketingModal({ content, onClose, onSave }: { content: MarketingContent | null; onClose: () => void; onSave: () => void; }) {
  const [formData, setFormData] = useState({
    type: content?.type ?? "popup",
    titleAr: content?.titleAr ?? "", titleEn: content?.titleEn ?? "",
    contentAr: content?.contentAr ?? "", contentEn: content?.contentEn ?? "",
    isActive: content?.isActive ?? true,
    startDate: content?.startDate ?? "", endDate: content?.endDate ?? "",
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const supabase = createClient();
      if (content) {
        await supabase.from("MarketingContent").update(formData).eq("id", content.id);
      } else {
        await supabase.from("MarketingContent").insert(formData);
      }
      onSave();
    } catch { alert("فشل في حفظ المحتوى"); }
    finally { setSaving(false); }
  }

  return (
    <Modal isOpen={true} onClose={onClose} title={content ? "تعديل المحتوى التسويقي" : "إضافة محتوى تسويقي"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select label="نوع المحتوى" value={formData.type} onChange={(v) => setFormData({ ...formData, type: v })}
          options={[
            { value: "popup", label: "نافذة منبثقة" },
            { value: "discount_banner", label: "بانر خصم" },
            { value: "announcement", label: "إعلان" },
          ]} required
        />
        <div className="grid grid-cols-2 gap-4">
          <Input label="العنوان (عربي)" value={formData.titleAr} onChange={(v) => setFormData({ ...formData, titleAr: v })} />
          <Input label="العنوان (إنجليزي)" value={formData.titleEn} onChange={(v) => setFormData({ ...formData, titleEn: v })} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Textarea label="المحتوى (عربي)" value={formData.contentAr} onChange={(v) => setFormData({ ...formData, contentAr: v })} rows={4} />
          <Textarea label="المحتوى (إنجليزي)" value={formData.contentEn} onChange={(v) => setFormData({ ...formData, contentEn: v })} rows={4} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="تاريخ البدء" type="date" value={formData.startDate} onChange={(v) => setFormData({ ...formData, startDate: v })} />
          <Input label="تاريخ الانتهاء" type="date" value={formData.endDate} onChange={(v) => setFormData({ ...formData, endDate: v })} />
        </div>
        <Checkbox label="نشط (مرئي على الموقع)" checked={formData.isActive} onChange={(v) => setFormData({ ...formData, isActive: v })} />
        <div className="flex gap-3 pt-4">
          <Button type="button" onClick={onClose} variant="secondary" className="flex-1">إلغاء</Button>
          <Button type="submit" disabled={saving} className="flex-1">{saving ? "جارٍ الحفظ..." : "حفظ المحتوى"}</Button>
        </div>
      </form>
    </Modal>
  );
}
