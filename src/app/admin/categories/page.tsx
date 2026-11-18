"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, ArrowUp, ArrowDown } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface Category {
  id: string;
  nameEn: string;
  nameAr: string;
  slug: string;
  isActive: boolean;
  displayOrder: number;
  productCount?: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const fetchCategories = useCallback(async () => {
    const supabase = createClient();
    const { data: cats } = await supabase
      .from("ProductCategory")
      .select("id, nameEn, nameAr, slug, isActive, displayOrder")
      .order("displayOrder", { ascending: true });

    const { data: productCounts } = await supabase
      .from("Product")
      .select("categoryId");

    const countMap = new Map<string, number>();
    (productCounts ?? []).forEach((p) => {
      countMap.set(p.categoryId, (countMap.get(p.categoryId) ?? 0) + 1);
    });

    setCategories(
      (cats ?? []).map((c) => ({ ...c, productCount: countMap.get(c.id) ?? 0 }))
    );
    setLoading(false);
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  async function handleToggleActive(id: string, isActive: boolean) {
    const supabase = createClient();
    await supabase
      .from("ProductCategory")
      .update({ isActive: !isActive })
      .eq("id", id);
    fetchCategories();
  }

  async function handleDelete(id: string) {
    if (!confirm("هل أنت متأكد من حذف هذه الفئة؟")) return;
    const supabase = createClient();
    await supabase.from("ProductCategory").delete().eq("id", id);
    fetchCategories();
  }

  async function handleReorder(id: string, direction: "up" | "down") {
    const index = categories.findIndex((c) => c.id === id);
    if (index === -1) return;
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= categories.length) return;
    const newCats = [...categories];
    [newCats[index], newCats[newIndex]] = [newCats[newIndex], newCats[index]];
    const supabase = createClient();
    await Promise.all(
      newCats.map((cat, idx) =>
        supabase.from("ProductCategory").update({ displayOrder: idx }).eq("id", cat.id)
      )
    );
    fetchCategories();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: "#3D1A6E" }} />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black mb-2" style={{ color: "#1a0a3c" }}>الفئات</h1>
          <p className="text-gray-600">إدارة فئات المنتجات وظهورها</p>
        </div>
        <button
          onClick={() => { setEditingCategory(null); setShowModal(true); }}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-semibold hover:opacity-90"
          style={{ background: "#3D1A6E" }}
        >
          <Plus size={20} />
          إضافة فئة
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {categories.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            لا توجد فئات. أضف فئتك الأولى للبدء.
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right px-6 py-4 text-sm font-bold text-gray-700">الترتيب</th>
                <th className="text-right px-6 py-4 text-sm font-bold text-gray-700">الاسم (عربي)</th>
                <th className="text-right px-6 py-4 text-sm font-bold text-gray-700">الاسم (إنجليزي)</th>
                <th className="text-right px-6 py-4 text-sm font-bold text-gray-700">المسار</th>
                <th className="text-right px-6 py-4 text-sm font-bold text-gray-700">المنتجات</th>
                <th className="text-right px-6 py-4 text-sm font-bold text-gray-700">الحالة</th>
                <th className="text-right px-6 py-4 text-sm font-bold text-gray-700">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category.id} className="border-t border-gray-100">
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleReorder(category.id, "up")}
                        disabled={index === 0}
                        className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                      >
                        <ArrowUp size={16} />
                      </button>
                      <button
                        onClick={() => handleReorder(category.id, "down")}
                        disabled={index === categories.length - 1}
                        className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                      >
                        <ArrowDown size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 text-right">{category.nameAr}</td>
                  <td className="px-6 py-4 text-gray-600 text-right">{category.nameEn}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-mono text-right">{category.slug}</td>
                  <td className="px-6 py-4 text-gray-600 text-right">{category.productCount ?? 0}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleActive(category.id, category.isActive)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                        category.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {category.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                      {category.isActive ? "نشط" : "مخفي"}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setEditingCategory(category); setShowModal(true); }}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                      >
                        <Edit2 size={18} className="text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <CategoryModal
          category={editingCategory}
          onClose={() => { setShowModal(false); setEditingCategory(null); }}
          onSave={() => { setShowModal(false); setEditingCategory(null); fetchCategories(); }}
        />
      )}
    </div>
  );
}

function CategoryModal({ category, onClose, onSave }: {
  category: Category | null; onClose: () => void; onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    nameEn: category?.nameEn ?? "",
    nameAr: category?.nameAr ?? "",
    slug: category?.slug ?? "",
    isActive: category?.isActive ?? true,
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const supabase = createClient();
      if (category) {
        await supabase.from("ProductCategory").update(formData).eq("id", category.id);
      } else {
        await supabase.from("ProductCategory").insert({ ...formData, displayOrder: 999 });
      }
      onSave();
    } catch {
      alert("فشل في حفظ الفئة");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-lg w-full">
        <h2 className="text-2xl font-black text-gray-900 mb-6 text-right">
          {category ? "تعديل الفئة" : "إضافة فئة جديدة"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 text-right">الاسم (عربي) *</label>
              <input
                required value={formData.nameAr}
                onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl text-right"
                style={{ direction: "rtl" }}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 text-right">الاسم (إنجليزي) *</label>
              <input
                required value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 text-right">المسار (URL) *</label>
            <input
              required value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl font-mono"
              placeholder="e.g., home-utilities"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox" id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-5 h-5 rounded" style={{ accentColor: "#3D1A6E" }}
            />
            <label htmlFor="isActive" className="text-sm font-semibold text-gray-700">
              نشط (مرئي على الموقع)
            </label>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-2xl font-semibold text-gray-700 hover:bg-gray-50"
            >إلغاء</button>
            <button type="submit" disabled={saving}
              className="flex-1 px-6 py-3 rounded-2xl text-white font-semibold hover:opacity-90 disabled:opacity-50"
              style={{ background: "#3D1A6E" }}
            >{saving ? "جارٍ الحفظ..." : "حفظ الفئة"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
