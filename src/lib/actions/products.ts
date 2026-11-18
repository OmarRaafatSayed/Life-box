'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import type { Product, ProductFilters, ProductFormData, Category } from '@/types'

// Map Prisma Decimal fields and Date fields to plain JS types
function mapProduct(p: any): Product {
  return {
    ...p,
    price: Number(p.price),
    rating: Number(p.rating),
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  } as Product
}

// Map URL slug to Category enum value
function slugToCategory(slug: string): string {
  const map: Record<string, string> = {
    'home-utilities': 'HOME_UTILITIES',
    'housewares': 'HOUSEWARES',
    'home-textiles': 'HOME_TEXTILES',
    'decorative-items': 'DECORATIVE_ITEMS',
  }
  return map[slug] ?? slug.toUpperCase().replace(/-/g, '_')
}

// Build a Prisma where clause from ProductFilters
function buildWhereFromFilters(filters?: ProductFilters): Record<string, any> {
  const where: Record<string, any> = {}

  if (!filters) return where

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    where.price = {}
    if (filters.minPrice !== undefined) where.price.gte = filters.minPrice
    if (filters.maxPrice !== undefined) where.price.lte = filters.maxPrice
  }

  if (filters.colors && filters.colors.length > 0) {
    where.colors = { hasSome: filters.colors }
  }

  if (filters.minRating !== undefined) {
    where.rating = { gte: filters.minRating }
  }

  if (filters.inStock === true) {
    where.stock = { gt: 0 }
  }

  if (filters.search) {
    where.OR = [
      { nameEn: { contains: filters.search, mode: 'insensitive' } },
      { nameAr: { contains: filters.search } },
    ]
  }

  return where
}

// Build a Prisma orderBy clause from the sort option
function buildOrderBy(sort?: ProductFilters['sort']): Record<string, string> {
  switch (sort) {
    case 'price_asc':
      return { price: 'asc' }
    case 'price_desc':
      return { price: 'desc' }
    case 'rating':
      return { rating: 'desc' }
    case 'popular':
      return { reviewCount: 'desc' }
    case 'newest':
    default:
      return { createdAt: 'desc' }
  }
}

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  try {
    const where = buildWhereFromFilters(filters)
    const orderBy = buildOrderBy(filters?.sort)

    const products = await prisma.product.findMany({ where, orderBy })
    return products.map(mapProduct)
  } catch (error) {
    throw new Error(
      `Failed to fetch products: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const product = await prisma.product.findUnique({ where: { id } })
    return product ? mapProduct(product) : null
  } catch (error) {
    throw new Error(
      `Failed to fetch product ${id}: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

export async function getProductsByCategory(
  category: string,
  filters?: ProductFilters
): Promise<Product[]> {
  try {
    const categoryEnum = slugToCategory(category)
    const where = {
      ...buildWhereFromFilters(filters),
      category: categoryEnum,
    }
    const orderBy = buildOrderBy(filters?.sort)

    const products = await prisma.product.findMany({ where, orderBy })
    return products.map(mapProduct)
  } catch (error) {
    throw new Error(
      `Failed to fetch products for category "${category}": ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: { featured: true },
      orderBy: { reviewCount: 'desc' },
      take: 8,
    })
    return products.map(mapProduct)
  } catch (error) {
    throw new Error(
      `Failed to fetch featured products: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { nameEn: { contains: query, mode: 'insensitive' } },
          { nameAr: { contains: query } },
        ],
      },
      take: 20,
    })
    return products.map(mapProduct)
  } catch (error) {
    throw new Error(
      `Failed to search products for "${query}": ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

export async function createProduct(data: ProductFormData): Promise<Product> {
  try {
    const product = await prisma.product.create({
      data: {
        nameEn: data.nameEn,
        nameAr: data.nameAr,
        descEn: data.descEn,
        descAr: data.descAr,
        price: data.price,
        category: data.category,
        images: data.images,
        colors: data.colors,
        sizes: data.sizes,
        stock: data.stock,
        featured: data.featured,
        // Generate a SKU from timestamp + random suffix if not provided
        sku: `SKU-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
      },
    })
    revalidatePath('/admin/products')
    return mapProduct(product)
  } catch (error) {
    throw new Error(
      `Failed to create product: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

export async function updateProduct(
  id: string,
  data: Partial<ProductFormData>
): Promise<Product> {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(data.nameEn !== undefined && { nameEn: data.nameEn }),
        ...(data.nameAr !== undefined && { nameAr: data.nameAr }),
        ...(data.descEn !== undefined && { descEn: data.descEn }),
        ...(data.descAr !== undefined && { descAr: data.descAr }),
        ...(data.price !== undefined && { price: data.price }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.images !== undefined && { images: data.images }),
        ...(data.colors !== undefined && { colors: data.colors }),
        ...(data.sizes !== undefined && { sizes: data.sizes }),
        ...(data.stock !== undefined && { stock: data.stock }),
        ...(data.featured !== undefined && { featured: data.featured }),
      },
    })
    revalidatePath('/admin/products')
    revalidatePath(`/products/${id}`)
    return mapProduct(product)
  } catch (error) {
    throw new Error(
      `Failed to update product ${id}: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    await prisma.product.delete({ where: { id } })
    revalidatePath('/admin/products')
  } catch (error) {
    throw new Error(
      `Failed to delete product ${id}: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}
