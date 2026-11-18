"use client";

import type { Product } from "@/types";
import { ProductCard } from "@/components/products/ProductCard";

export default function FeaturedScroll({
  products,
  locale,
}: {
  products: Product[];
  locale: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} locale={locale} />
      ))}
    </div>
  );
}
