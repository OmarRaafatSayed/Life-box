import { ProductsPageClient } from "@/components/products/ProductsPageClient";
import { Footer } from "@/components/layout/Footer";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductsPageClient locale={locale} />
      <Footer />
    </>
  );
}
