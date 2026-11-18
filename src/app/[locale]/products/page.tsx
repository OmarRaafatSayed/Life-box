import { ProductsPageClient } from "@/components/products/ProductsPageClient";
import { Footer } from "@/components/layout/Footer";
import { getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const products = await getProducts();

  return (
    <>
      <ProductsPageClient locale={locale} initialProducts={products} />
      <Footer />
    </>
  );
}
