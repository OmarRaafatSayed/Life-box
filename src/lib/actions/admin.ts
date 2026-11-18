import { prisma } from '@/lib/prisma'
import type { DashboardStats, CustomerSummary, OrderStatus } from '@/types'

export async function getDashboardStats(): Promise<DashboardStats> {
  const totalProducts = await prisma.product.count()
  const orders = await prisma.order.findMany({
    select: { status: true, total: true, email: true },
  })

  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum: number, o: any) => sum + Number(o.total), 0)
  const totalCustomers = new Set(orders.map((o: any) => o.email)).size

  const ordersByStatus: Record<OrderStatus, number> = {
    PENDING: 0,
    PROCESSING: 0,
    SHIPPED: 0,
    DELIVERED: 0,
    CANCELLED: 0,
  }

  orders.forEach((o: any) => {
    if (ordersByStatus[o.status as OrderStatus] !== undefined) {
      ordersByStatus[o.status as OrderStatus]++
    }
  })

  return { totalOrders, totalRevenue, totalProducts, totalCustomers, ordersByStatus }
}

export async function getCustomers(): Promise<CustomerSummary[]> {
  const orders = await prisma.order.findMany({
    select: { fullName: true, email: true },
    orderBy: { createdAt: 'desc' },
  })

  const map = new Map<string, { fullName: string; email: string; count: number }>()

  orders.forEach((o: any) => {
    if (!map.has(o.email)) {
      map.set(o.email, { fullName: o.fullName, email: o.email, count: 0 })
    }
    const entry = map.get(o.email)
    if (entry) {
      entry.count++
    }
  })

  return Array.from(map.values()).map((c) => ({
    fullName: c.fullName,
    email: c.email,
    orderCount: c.count,
  }))
}
