'use server'

import { prisma } from '@/lib/prisma'
import type { CartItem, CheckoutFormData, Order, OrderStatus } from '@/types'

// ---------------------------------------------------------------------------
// Map helper — converts a Prisma order record to the app's Order type.
// The address field is stored as JSON in the DB; Decimal fields are cast to
// number to match the TypeScript interface.
// ---------------------------------------------------------------------------
function mapOrder(o: any): Order {
  return {
    ...o,
    address: o.address as Order['address'],
    subtotal: Number(o.subtotal),
    shipping: Number(o.shipping),
    total: Number(o.total),
    createdAt: o.createdAt.toISOString(),
    updatedAt: o.updatedAt.toISOString(),
    items:
      o.items?.map((i: any) => ({
        ...i,
        price: Number(i.price),
        product: i.product
          ? {
              ...i.product,
              price: Number(i.product.price),
              rating: Number(i.product.rating),
              createdAt: i.product.createdAt.toISOString(),
              updatedAt: i.product.updatedAt.toISOString(),
            }
          : undefined,
      })) ?? [],
  }
}

// ---------------------------------------------------------------------------
// createOrder
// Creates an Order and its nested OrderItems in a single Prisma write.
// Free shipping applies when subtotal >= 200; otherwise shipping is 25.
// ---------------------------------------------------------------------------
export async function createOrder(
  formData: CheckoutFormData,
  cartItems: CartItem[]
): Promise<Order> {
  try {
    const orderNumber = `LB-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 6)
      .toUpperCase()}`

    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
    const shipping = subtotal >= 200 ? 0 : 25
    const total = subtotal + shipping

    const address: Order['address'] = {
      street: formData.street,
      city: formData.city,
      region: formData.region,
      postal: formData.postal,
      country: formData.country,
    }

    const created = await prisma.order.create({
      data: {
        orderNumber,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address,
        notes: formData.notes,
        subtotal,
        shipping,
        total,
        items: {
          create: cartItems.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
            color: item.color,
            size: item.size,
          })),
        },
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    })

    return mapOrder(created)
  } catch (err) {
    throw err instanceof Error
      ? err
      : new Error('Failed to create order')
  }
}

// ---------------------------------------------------------------------------
// getOrders
// Returns all orders, newest first, with their items and products.
// ---------------------------------------------------------------------------
export async function getOrders(): Promise<Order[]> {
  const orders = await prisma.order.findMany({
    include: {
      items: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return orders.map(mapOrder)
}

// ---------------------------------------------------------------------------
// getOrderById
// Returns a single order by ID, or null if not found.
// ---------------------------------------------------------------------------
export async function getOrderById(id: string): Promise<Order | null> {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: { product: true },
      },
    },
  })

  return order ? mapOrder(order) : null
}

// ---------------------------------------------------------------------------
// updateOrderStatus
// Updates the status field of an existing order and returns the updated Order.
// ---------------------------------------------------------------------------
export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<Order> {
  const updated = await prisma.order.update({
    where: { id },
    data: { status },
    include: {
      items: {
        include: { product: true },
      },
    },
  })

  return mapOrder(updated)
}
