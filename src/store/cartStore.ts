import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '@/types'

interface CartState {
  items: CartItem[]
  addItem: (product: Product, quantity?: number, color?: string, size?: string) => void
  removeItem: (productId: string, color?: string, size?: string) => void
  updateQuantity: (productId: string, quantity: number, color?: string, size?: string) => void
  clearCart: () => void
  itemCount: () => number
  subtotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1, color, size) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.product.id === product.id && i.color === color && i.size === size
          )
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id && i.color === color && i.size === size
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            }
          }
          return { items: [...state.items, { product, quantity, color, size }] }
        })
      },
      removeItem: (productId, color, size) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.product.id === productId && i.color === color && i.size === size)
          ),
        })),
      updateQuantity: (productId, quantity, color, size) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId && i.color === color && i.size === size
              ? { ...i, quantity: Math.max(1, quantity) }
              : i
          ),
        })),
      clearCart: () => set({ items: [] }),
      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    { name: 'life-box-cart' }
  )
)
