import { OrdersPageClient } from "@/components/orders/OrdersPageClient";
import { Footer } from "@/components/layout/Footer";

export default async function OrdersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <OrdersPageClient locale={locale} />
      <Footer />
    </>
  );
}
