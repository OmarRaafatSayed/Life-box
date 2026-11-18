'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const t = useTranslations('cart');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const subtotal = useCartStore((s) => s.subtotal);
  const itemCount = useCartStore((s) => s.itemCount);

  const count = itemCount();
  const total = subtotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            key="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed inset-y-0 right-0 z-50 flex flex-col w-96 max-w-full bg-background shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={t('title')}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">{t('title')}</h2>
                {count > 0 && (
                  <span
                    className="flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 text-[11px] font-bold text-white rounded-full"
                    style={{ backgroundColor: 'var(--color-plum)' }}
                  >
                    {count > 99 ? '99+' : count}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Close cart"
                className="p-1.5 rounded-md hover:bg-muted transition-colors text-foreground/60 hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>

            {/* Item list or empty state */}
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 gap-4 px-6 text-center">
                <ShoppingBag size={48} className="text-muted-foreground/40" />
                <p className="text-muted-foreground">{t('empty')}</p>
                <Link
                  href={`/${locale}/products`}
                  onClick={onClose}
                  className="text-sm font-medium underline underline-offset-4"
                  style={{ color: 'var(--color-plum)' }}
                >
                  {t('emptyCta')}
                </Link>
              </div>
            ) : (
              <ul className="flex-1 overflow-y-auto divide-y divide-border px-5 py-2">
                {items.map((item) => {
                  const name = locale === 'ar' ? item.product.nameAr : item.product.nameEn;
                  const imageSrc = item.product.images[0] ?? '/placeholder.png';

                  return (
                    <li
                      key={`${item.product.id}-${item.color ?? ''}-${item.size ?? ''}`}
                      className="flex gap-3 py-4"
                    >
                      {/* Product image */}
                      <div className="relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden bg-muted">
                        <Image
                          src={imageSrc}
                          alt={name}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                          unoptimized={imageSrc.startsWith('http')}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex flex-col flex-1 min-w-0 gap-1">
                        <p className="text-sm font-medium leading-snug line-clamp-2">{name}</p>
                        {item.color && (
                          <p className="text-xs text-muted-foreground capitalize">{item.color}</p>
                        )}
                        {item.size && (
                          <p className="text-xs text-muted-foreground capitalize">{item.size}</p>
                        )}
                        <p className="text-sm font-semibold" style={{ color: 'var(--color-plum)' }}>
                          {(item.product.price * item.quantity).toFixed(2)} جنيه
                        </p>

                        {/* Quantity controls + remove */}
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1, item.color, item.size)
                            }
                            aria-label="Decrease quantity"
                            disabled={item.quantity <= 1}
                            className="flex items-center justify-center w-6 h-6 rounded border border-border hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="min-w-[1.5rem] text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1, item.color, item.size)
                            }
                            aria-label="Increase quantity"
                            className="flex items-center justify-center w-6 h-6 rounded border border-border hover:bg-muted transition-colors"
                          >
                            <Plus size={12} />
                          </button>

                          <button
                            onClick={() => removeItem(item.product.id, item.color, item.size)}
                            aria-label={t('remove')}
                            className="ml-auto p-1 rounded hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border px-5 py-4 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('subtotal')}</span>
                  <span className="font-semibold">{total.toFixed(2)} جنيه</span>
                </div>
                <Link
                  href={`/${locale}/checkout`}
                  onClick={onClose}
                  className="flex items-center justify-center w-full h-11 text-sm font-semibold text-white rounded-lg transition-opacity hover:opacity-90"
                  style={{ backgroundColor: 'var(--color-plum)' }}
                >
                  {t('checkout')}
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
