import { OrderSuccessClient } from "@/components/order/OrderSuccessClient";
import { Footer } from "@/components/layout/Footer";

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <OrderSuccessClient locale={locale} />
      <Footer />
    </>
  );
}
