import { CartPageClient } from "@/components/cart/CartPageClient";
import { Footer } from "@/components/layout/Footer";

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <CartPageClient locale={locale} />
      <Footer />
    </>
  );
}
