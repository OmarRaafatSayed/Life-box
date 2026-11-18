import { WishlistPageClient } from "@/components/wishlist/WishlistPageClient";
import { Footer } from "@/components/layout/Footer";

export default async function WishlistPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <WishlistPageClient locale={locale} />
      <Footer />
    </>
  );
}
