import { getProductsByCategory } from "@/lib/mockData";
import { ProductCard } from "@/components/products/ProductCard";
import { Footer } from "@/components/layout/Footer";

const META: Record<string, { labelEn: string; labelAr: string; color: string; bg: string }> = {
  "home-utilities":   { labelEn: "Home Utilities",   labelAr: "أدوات المنزل",          color: "#3D1A6E", bg: "#F5F0FF" },
  "housewares":       { labelEn: "Housewares",        labelAr: "أواني المنزل",          color: "#E91E8C", bg: "#FFF0F8" },
  "home-textiles":    { labelEn: "Home Textiles",     labelAr: "المنسوجات المنزلية",    color: "#00BCD4", bg: "#F0FCFF" },
  "decorative-items": { labelEn: "Decorative Items",  labelAr: "الديكورات",             color: "#FF6B35", bg: "#FFF5F0" },
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const isAr = locale === "ar";
  const meta = META[slug] ?? { labelEn: slug, labelAr: slug, color: "#3D1A6E", bg: "#F5F0FF" };
  const products = getProductsByCategory(slug);

  return (
    <main>
      {/* Banner */}
      <div
        className="py-14 px-4 sm:px-6 lg:px-8"
        style={{ background: `linear-gradient(135deg, ${meta.bg} 0%, white 100%)`, borderBottom: `4px solid ${meta.color}22` }}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-3xl text-xs font-black mb-3"
            style={{ background: `${meta.color}18`, color: meta.color }}
          >
            Life Box
          </div>
          <h1
            className="text-4xl sm:text-5xl font-black"
            style={{ color: meta.color }}
            dir={isAr ? "rtl" : "ltr"}
          >
            {isAr ? meta.labelAr : meta.labelEn}
          </h1>
          <p className="text-gray-500 mt-3">
            {products.length} {isAr ? "منتج" : "products"}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} locale={locale} />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
