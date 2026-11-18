"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, ArrowUp, ArrowDown } from "lucide-react";

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

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleActive(id: string, isActive: boolean) {
    try {
      await fetch(`/api/admin/categories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
      });
      fetchCategories();
    } catch (error) {
      console.error("Failed to toggle category:", error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this category?")) return;
    
    try {
      await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      fetchCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  }

  async function handleReorder(id: string, direction: "up" | "down") {
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return;
    
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= categories.length) return;

    const newCategories = [...categories];
    [newCategories[index], newCategories[newIndex]] = [newCategories[newIndex], newCategories[index]];
    
    // Update display orders
    await Promise.all(
      newCategories.map((cat, idx) =>
        fetch(`/api/admin/categories/${cat.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ displayOrder: idx }),
        })
      )
    );
    
    fetchCategories();
  }

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Categories</h1>
          <p className="text-gray-600">Manage product categories and their visibility</p>
        </div>
        <button
          onClick={() => {
            setEditingCategory(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-semibold hover:scale-105 transition-transform"
          style={{ background: "linear-gradient(135deg, #3D1A6E, #E91E8C)" }}
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Order</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Name (EN)</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Name (AR)</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Slug</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Products</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Status</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Actions</th>
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
                <td className="px-6 py-4 font-semibold text-gray-900">{category.nameEn}</td>
                <td className="px-6 py-4 text-gray-600">{category.nameAr}</td>
                <td className="px-6 py-4 text-sm text-gray-500 font-mono">{category.slug}</td>
                <td className="px-6 py-4 text-gray-600">{category.productCount || 0}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleToggleActive(category.id, category.isActive)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                      category.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {category.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                    {category.isActive ? "Active" : "Hidden"}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingCategory(category);
                        setShowModal(true);
                      }}
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

        {categories.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No categories found. Add your first category to get started.
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <CategoryModal
          category={editingCategory}
          onClose={() => {
            setShowModal(false);
            setEditingCategory(null);
          }}
          onSave={() => {
            setShowModal(false);
            setEditingCategory(null);
            fetchCategories();
          }}
        />
      )}
    </div>
  );
}

function CategoryModal({ 
  category, 
  onClose, 
  onSave 
}: { 
  category: Category | null; 
  onClose: () => void; 
  onSave: () => void; 
}) {
  const [formData, setFormData] = useState({
    nameEn: category?.nameEn || "",
    nameAr: category?.nameAr || "",
    slug: category?.slug || "",
    descEn: "",
    descAr: "",
    isActive: category?.isActive ?? true,
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const url = category
        ? `/api/admin/categories/${category.id}`
        : "/api/admin/categories";
      
      const method = category ? "PATCH" : "POST";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      onSave();
    } catch (error) {
      console.error("Failed to save category:", error);
      alert("Failed to save category");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-black text-gray-900 mb-6">
          {category ? "Edit Category" : "Add New Category"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Name (English) *
              </label>
              <input
                type="text"
                required
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Name (Arabic) *
              </label>
              <input
                type="text"
                required
                value={formData.nameAr}
                onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Slug (URL-friendly) *
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono"
              placeholder="e.g., home-utilities"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Description (English)
              </label>
              <textarea
                value={formData.descEn}
                onChange={(e) => setFormData({ ...formData, descEn: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Description (Arabic)
              </label>
              <textarea
                value={formData.descAr}
                onChange={(e) => setFormData({ ...formData, descAr: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="isActive" className="text-sm font-semibold text-gray-700">
              Active (visible on website)
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-2xl font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-6 py-3 rounded-2xl text-white font-semibold"
              style={{ background: "linear-gradient(135deg, #3D1A6E, #E91E8C)" }}
            >
              {saving ? "Saving..." : "Save Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
