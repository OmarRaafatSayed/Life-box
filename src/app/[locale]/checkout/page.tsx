import { CheckoutPageClient } from "@/components/checkout/CheckoutPageClient";
import { Footer } from "@/components/layout/Footer";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <CheckoutPageClient locale={locale} />
      <Footer />
    </>
  );
}
