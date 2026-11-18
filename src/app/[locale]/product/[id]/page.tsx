import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";
import { Footer } from "@/components/layout/Footer";
import { getProductById, getAllProductIds } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  // Falls back gracefully if DB is unavailable at build time
  try {
    const ids = await getAllProductIds();
    return ids.map((id) => ({ id }));
  } catch {
    return [];
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  return (
    <>
      <ProductDetailClient product={product} locale={locale} />
      <Footer />
    </>
  );
}
