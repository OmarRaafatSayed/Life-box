import { AccountPageClient } from "@/components/account/AccountPageClient";
import { Footer } from "@/components/layout/Footer";

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <AccountPageClient locale={locale} />
      <Footer />
    </>
  );
}
