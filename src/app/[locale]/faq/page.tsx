import { FAQPageClient } from "@/components/faq/FAQPageClient";
import { Footer } from "@/components/layout/Footer";

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <FAQPageClient locale={locale} />
      <Footer />
    </>
  );
}
