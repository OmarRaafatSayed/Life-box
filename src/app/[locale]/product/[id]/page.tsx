import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";
import { Footer } from "@/components/layout/Footer";
import { getProductById, MOCK_PRODUCTS } from "@/lib/mockData";

export async function generateStaticParams() {
  return MOCK_PRODUCTS.map((p) => ({ id: p.id }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const product = getProductById(id);

  if (!product) notFound();

  return (
    <>
      <ProductDetailClient product={product} locale={locale} />
      <Footer />
    </>
  );
}
