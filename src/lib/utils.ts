export { cn } from "cn"

// ── Currency ─────────────────────────────────────────────────────────────────
export const CURRENCY_EN = "جنيه"
export const CURRENCY_AR = "جنيه"

export function formatPrice(amount: number | string, locale?: string): string {
  return `${amount} جنيه`
}
