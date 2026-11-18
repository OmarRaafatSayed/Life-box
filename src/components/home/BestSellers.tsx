import BestSellersClient from "./BestSellersClient";
import { getBestSellerProducts } from "@/lib/data";

// Server Component — fetches from DB then delegates rendering to client
export async function BestSellers({ locale }: { locale: string }) {
  const products = await getBestSellerProducts(8);
  if (products.length === 0) return null;
  return <BestSellersClient products={products} locale={locale} />;
}
