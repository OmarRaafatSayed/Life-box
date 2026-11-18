import { ContactPageClient } from "@/components/contact/ContactPageClient";
import { Footer } from "@/components/layout/Footer";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ContactPageClient locale={locale} />
      <Footer />
    </>
  );
}
