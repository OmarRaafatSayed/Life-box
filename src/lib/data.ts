/**
 * Shared data-fetching layer — used by both customer site and admin dashboard.
 * All queries go through the Supabase server client so they always reflect
 * the live database (admin changes appear on the site immediately).
 */
import { createClient } from '@/utils/supabase/server'
import type { Product } from '@/types'

// ── Map a raw Supabase row → Product type ─────────────────────────────────────
function mapProduct(row: Record<string, any>): Product {
  return {
    id: row.id,
    sku: row.sku,
    nameEn: row.nameEn,
    nameAr: row.nameAr,
    descEn: row.descEn ?? '',
    descAr: row.descAr ?? '',
    price: Number(row.price),
    // Legacy Category enum field — derive from category slug
    category: (row.ProductCategory?.slug ?? row.categoryId ?? 'HOME_UTILITIES')
      .toUpperCase()
      .replace(/-/g, '_') as Product['category'],
    images: row.images ?? [],
    colors: row.colors ?? [],
    sizes: row.sizes ?? [],
    stock: row.stock ?? 0,
    rating: Number(row.rating ?? 0),
    reviewCount: row.reviewCount ?? 0,
    featured: row.featured ?? false,
    createdAt: row.createdAt ?? new Date().toISOString(),
    updatedAt: row.updatedAt ?? new Date().toISOString(),
  }
}

const PRODUCT_SELECT = `
  id, sku, nameEn, nameAr, descEn, descAr,
  price, images, colors, sizes, stock,
  rating, reviewCount, featured,
  createdAt, updatedAt,
  categoryId,
  ProductCategory!inner(slug, nameAr, nameEn)
`

// ── All products (optionally filtered) ────────────────────────────────────────
export async function getProducts(opts?: {
  search?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'rating'
}): Promise<Product[]> {
  const supabase = await createClient()
  let query = supabase.from('Product').select(PRODUCT_SELECT).eq('isActive', true)

  if (opts?.search) {
    query = query.or(`nameAr.ilike.%${opts.search}%,nameEn.ilike.%${opts.search}%`)
  }
  if (opts?.minPrice !== undefined) query = query.gte('price', opts.minPrice)
  if (opts?.maxPrice !== undefined) query = query.lte('price', opts.maxPrice)
  if (opts?.inStock) query = query.gt('stock', 0)

  switch (opts?.sort) {
    case 'price_asc':  query = query.order('price', { ascending: true });  break
    case 'price_desc': query = query.order('price', { ascending: false }); break
    case 'rating':     query = query.order('rating', { ascending: false }); break
    default:           query = query.order('createdAt', { ascending: false })
  }

  const { data, error } = await query
  if (error) { console.error('getProducts:', error.message); return [] }
  return (data ?? []).map(mapProduct)
}

// ── Featured products ─────────────────────────────────────────────────────────
export async function getFeaturedProducts(limit = 10): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('Product')
    .select(PRODUCT_SELECT)
    .eq('isActive', true)
    .eq('featured', true)
    .order('reviewCount', { ascending: false })
    .limit(limit)

  if (error) { console.error('getFeaturedProducts:', error.message); return [] }
  return (data ?? []).map(mapProduct)
}

// ── Products by category slug ─────────────────────────────────────────────────
export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('Product')
    .select(PRODUCT_SELECT)
    .eq('isActive', true)
    .eq('ProductCategory.slug', slug)
    .order('createdAt', { ascending: false })

  if (error) { console.error('getProductsByCategory:', error.message); return [] }
  return (data ?? []).map(mapProduct)
}

// ── Single product by ID ──────────────────────────────────────────────────────
export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('Product')
    .select(PRODUCT_SELECT)
    .eq('id', id)
    .single()

  if (error) { console.error('getProductById:', error.message); return null }
  return data ? mapProduct(data) : null
}

// ── Best sellers (top N by reviewCount or order volume) ───────────────────────
export async function getBestSellerProducts(limit = 8): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('Product')
    .select(PRODUCT_SELECT)
    .eq('isActive', true)
    .order('reviewCount', { ascending: false })
    .limit(limit)

  if (error) { console.error('getBestSellerProducts:', error.message); return [] }
  return (data ?? []).map(mapProduct)
}

// ── All product IDs (for generateStaticParams) ────────────────────────────────
export async function getAllProductIds(): Promise<string[]> {
  const supabase = await createClient()
  const { data } = await supabase.from('Product').select('id').eq('isActive', true)
  return (data ?? []).map((r) => r.id)
}
