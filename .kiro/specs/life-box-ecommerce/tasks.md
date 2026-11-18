# Implementation Plan: Life Box E-Commerce Website

## Overview

Build a complete bilingual (AR/EN) Next.js 15 e-commerce application for Life Box from the ground up. Tasks progress from project scaffolding → data layer → shared layout → customer-facing pages → cart/wishlist/checkout → admin dashboard → polish and integration.

## Tasks

- [x] 1. Scaffold project and configure tooling
  - [x] 1.1 Initialize Next.js 15 App Router project with TypeScript, install all dependencies (Tailwind CSS v4, shadcn/ui, Framer Motion v11+, Lucide React, next-intl, Zustand, Prisma, Supabase client, react-hook-form, zod, fast-check, Vitest, Playwright)
    - Run `npx create-next-app@latest` with TypeScript and App Router; then install each dependency
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8_

  - [x] 1.2 Configure Tailwind CSS v4 with brand color tokens and design system
    - Add CSS custom properties for `--color-plum`, `--color-magenta`, `--color-teal`, `--color-orange` in `globals.css`
    - Configure Tailwind to reference these tokens; set default border-radius to `rounded-2xl` as base
    - Define soft multi-layer shadow utility token
    - _Requirements: 1.2, 2.1, 2.5_

  - [x] 1.3 Configure next-intl for AR/EN with RTL support
    - Create `i18n/routing.ts` with `defineRouting({ locales: ['en','ar'], defaultLocale: 'en' })`
    - Create `src/middleware.ts` using `createMiddleware(routing)` to handle locale-prefixed routes
    - Create `i18n/messages/en.json` and `i18n/messages/ar.json` with all translation keys (nav, home, product, cart, checkout, admin, errors sections)
    - _Requirements: 1.6, 3.1, 3.2, 3.3, 3.4_

  - [x] 1.4 Set up Prisma schema and Supabase connection
    - Write `prisma/schema.prisma` with `Product`, `Order`, `OrderItem` models and `Category`, `OrderStatus` enums
    - Create `lib/prisma.ts` singleton; configure `.env` with `DATABASE_URL` pointing to Supabase
    - _Requirements: 1.8, 12.1_

  - [x] 1.5 Write and run seed script with mock data
    - Write `prisma/seed.ts` inserting 20 products (5 per category) with bilingual names, descriptions, `picsum.photos` images, colors, sizes, prices 25–450 SAR, realistic ratings, and 5 flagged as `featured: true`
    - Insert 5 mock orders referencing random products with varied statuses
    - _Requirements: 12.1, 12.2_

  - [x] 1.6 Create shared TypeScript interfaces
    - Write `types/index.ts` with `Product`, `CartItem`, `Address`, `Order`, `OrderItem`, `CheckoutFormData`, `PaymentFormData`, `ProductFilters`, `DashboardStats`, `CustomerSummary` interfaces
    - _Requirements: 1.1_

- [x] 2. Checkpoint — environment ready
  - Confirm Prisma migrations run, seed completes without error, and `next dev` starts without TypeScript errors. Ask the user if any setup questions arise.

- [x] 3. Build shared layout and navigation
  - [x] 3.1 Create root locale layout (`src/app/[locale]/layout.tsx`)
    - Set `<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>`
    - Wrap with `NextIntlClientProvider`
    - Load Arabic + Latin font stacks via `next/font`
    - _Requirements: 2.2, 2.4, 3.1_

  - [x] 3.2 Build Header component
    - Render logo, search bar (links to `/[locale]/products?q=`), LanguageToggle, wishlist icon (badge from Zustand), cart icon (badge + opens CartDrawer)
    - Hamburger menu on mobile with slide-in nav panel using Framer Motion
    - Apply RTL-aware flex direction with `[dir=rtl]:` Tailwind variant
    - _Requirements: 5.5, 3.2, 2.3, 2.4_

  - [x] 3.3 Build LanguageToggle component
    - Toggle button in header that calls `useRouter().replace()` preserving current path with alternate locale prefix
    - Display current locale label ("EN" / "عربي")
    - _Requirements: 3.2, 3.3_

  - [x] 3.4 Build Footer component
    - Four-column grid: brand description, quick links, category links, contact/social
    - Newsletter email signup input (UI only, no backend)
    - Copyright and legal text
    - Collapses to stacked layout on mobile; RTL-aware
    - _Requirements: 4.5, 2.3_

  - [ ]* 3.5 Write unit tests for LanguageToggle and Header locale switching
    - Verify `dir` attribute is `rtl` when locale is `ar`
    - Verify badge counts match Zustand store
    - _Requirements: 3.1, 3.2_

- [x] 4. Implement Zustand stores with localStorage persistence
  - [x] 4.1 Implement cart store (`store/cartStore.ts`)
    - Implement `addItem`, `removeItem`, `updateQty`, `clearCart`, `toggleDrawer`, `subtotal` (computed as sum of `item.price × item.quantity`)
    - Use `zustand/middleware`'s `persist` targeting `localStorage`, with `skipHydration: true`
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [ ]* 4.2 Write property test for cart subtotal consistency (Property 1)
    - **Property 1: Cart Subtotal Consistency**
    - **Validates: Requirements 7.3**
    - Use fast-check to generate arbitrary arrays of `{price, quantity}` and assert `subtotal() === Σ(price × quantity)`

  - [x] 4.3 Implement wishlist store (`store/wishlistStore.ts`)
    - Implement `toggle`, `isInWishlist`, `moveToCart` (calls `cartStore.addItem` then removes from wishlist)
    - Persist to localStorage
    - _Requirements: 8.1, 8.2, 8.3_

  - [ ]* 4.4 Write property test for wishlist toggle idempotency (Property 2)
    - **Property 2: Wishlist Toggle Idempotency**
    - **Validates: Requirements 8.1, 8.3**
    - Use fast-check to generate arbitrary product arrays and assert `toggle(toggle(W, P), P)` equals original state

  - [ ]* 4.5 Write property test for cart persistence (Property 5)
    - **Property 5: Cart Persistence**
    - **Validates: Requirements 7.4**
    - Serialize cart state to JSON, deserialize, assert all items and quantities match

- [x] 5. Build CartDrawer and cart utility components
  - [x] 5.1 Build CartDrawer component
    - Framer Motion `AnimatePresence` slide panel from right (LTR) / left (RTL)
    - Shows each cart item with image, name, quantity stepper, remove button, line price
    - Footer: subtotal, shipping estimate, total; CTA "Proceed to Checkout" → `/[locale]/checkout`
    - Empty cart state with friendly illustration and "Continue Shopping" link
    - _Requirements: 7.1, 7.2, 7.3, 7.6_

  - [ ]* 5.2 Write unit tests for CartDrawer
    - Test that drawer renders items from store; quantity change updates store; remove button removes item
    - _Requirements: 7.1, 7.2_

- [ ] 6. Build home page sections
  - [x] 6.1 Build HeroSection component
    - Full-viewport gradient using brand colors (Plum → Magenta)
    - Bilingual headline and sub-headline (from next-intl); `fadeInUp` Framer Motion variants
    - Pill CTA button "Shop Now" / "تسوق الآن" linking to shop
    - _Requirements: 4.1, 2.1, 2.5_

  - [x] 6.2 Build CategoryShowcase component
    - 4 cards (Home Utilities, Housewares, Home Textiles, Decorative Items) with icon, bilingual label, hover scale + shadow animation
    - Each links to `/[locale]/category/[slug]`
    - _Requirements: 4.2, 2.1, 2.5_

  - [ ] 6.3 Build FeaturedProducts component
    - Fetch featured products via `getFeaturedProducts()` Server Action
    - Horizontally scrollable row with scroll snap, hidden scrollbar
    - Renders `ProductCard` for each product
    - _Requirements: 4.3, 5.4_

  - [x] 6.4 Build PromoBanner component
    - Full-width banner with Magenta/Teal gradient and promotional text marquee via Framer Motion
    - CTA button linking to shop
    - _Requirements: 4.4, 2.5_

  - [ ] 6.5 Assemble home page (`app/[locale]/page.tsx`)
    - Compose HeroSection → CategoryShowcase → FeaturedProducts → PromoBanner → Footer
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 7. Build product listing and filtering
  - [ ] 7.1 Build ProductCard component
    - Display: optimized `<Image>`, wishlist toggle icon (Zustand wishlistStore), bilingual name, price (locale-formatted SAR), star rating, quick-add-to-cart button
    - `whileHover={{ y: -4 }}` Framer Motion animation
    - _Requirements: 5.4, 2.5, 3.5, 13.1_

  - [ ] 7.2 Build ProductFilters component
    - Price range shadcn Slider, color swatch toggles, minimum rating star buttons, in-stock checkbox
    - Push filter state to URL query params via `useRouter` + `useSearchParams`
    - _Requirements: 5.2, 5.1_

  - [ ] 7.3 Build SortDropdown component
    - shadcn Select with options: Newest, Price ↑, Price ↓, Best Rating, Most Popular
    - Pushes `sort` param to URL
    - _Requirements: 5.3_

  - [ ] 7.4 Build ProductGrid component with pagination
    - Responsive grid (2 cols mobile → 3 cols tablet → 4 cols desktop)
    - Render `ProductCard` array; show skeleton loaders while fetching
    - Pagination component at bottom (or infinite scroll via Intersection Observer)
    - _Requirements: 5.4, 5.7, 13.3_

  - [ ] 7.5 Build category listing page (`app/[locale]/category/[slug]/page.tsx`)
    - Server Component: derive `Category` enum value from slug; call `getProductsByCategory()` with parsed URL filter params
    - Render `ProductFilters` + `SortDropdown` sidebar and `ProductGrid`
    - _Requirements: 5.1, 5.2, 5.3_

  - [ ] 7.6 Build search results page (`app/[locale]/products/page.tsx`)
    - Server Component: read `q` query param; call `searchProducts(q)`; render `ProductGrid`
    - Display "X results for '…'" heading
    - _Requirements: 5.5, 5.6_

  - [ ]* 7.7 Write unit tests for ProductCard
    - Verify renders correct locale name (en vs ar); verify wishlist toggle calls store; verify add-to-cart calls store
    - _Requirements: 5.4_

- [ ] 8. Build Product Detail Page
  - [ ] 8.1 Build ImageGallery component
    - Main image with zoom-on-hover (`transform scale`); thumbnail strip below
    - Framer Motion crossfade on thumbnail select
    - _Requirements: 6.1, 2.5_

  - [ ] 8.2 Build PDP page (`app/[locale]/product/[id]/page.tsx`)
    - Server Component: fetch product by ID; render ImageGallery, bilingual name, price, descriptions, rating badge, SKU, availability badge
    - Color swatch selector and size button selector (client sub-component)
    - Quantity stepper (client sub-component)
    - "Add to Cart" and "Save to Wishlist" buttons with Framer Motion bounce feedback
    - _Requirements: 6.2, 6.3, 6.4, 6.5_

  - [ ] 8.3 Build RelatedProducts component
    - Fetch products from same category (excluding current); display as horizontal scroll row of ProductCards
    - _Requirements: 6.6_

- [ ] 9. Checkpoint — customer browsing complete
  - Verify home page, category pages, search, and PDP all render correctly with seed data. Test language toggle switches locale and direction. Ask the user if questions arise.

- [ ] 10. Build full cart page and wishlist page
  - [ ] 10.1 Build cart page (`app/[locale]/cart/page.tsx`)
    - Full-page layout mirroring CartDrawer functionality: item list with quantity/remove controls, order summary sidebar, prominent "Checkout" CTA
    - Empty state with illustration
    - _Requirements: 7.5, 7.6_

  - [ ] 10.2 Build wishlist page (`app/[locale]/wishlist/page.tsx`)
    - Grid of saved products (ProductCard variant with "Move to Cart" button instead of quick-add)
    - Empty state with illustration
    - _Requirements: 8.1, 8.2, 8.3_

- [ ] 11. Build multi-step checkout
  - [ ] 11.1 Build CheckoutStepper component
    - Visual step indicator (numbered pills) for Delivery → Payment → Review
    - Active step highlighted in Magenta; completed steps show checkmark
    - _Requirements: 9.6_

  - [ ] 11.2 Build DeliveryForm component
    - react-hook-form + zod schema for: fullName, email, phone, street, city, region, postal, country, notes
    - Inline bilingual validation error messages via next-intl
    - _Requirements: 9.2, 9.3_

  - [ ] 11.3 Build PaymentForm component
    - Card number, name on card, expiry, CVV — visually styled fields with card brand icon detection
    - Fields are UI-only; no real payment processing
    - Zod validation for field formats (card number pattern, expiry MM/YY, CVV 3–4 digits)
    - _Requirements: 9.4_

  - [ ] 11.4 Build ReviewStep component
    - Summary of delivery address + payment (masked card) + order items + totals
    - "Place Order" button triggers `createOrder()` Server Action
    - _Requirements: 9.5, 9.6_

  - [ ] 11.5 Assemble checkout page (`app/[locale]/checkout/page.tsx`)
    - Client component orchestrating step state, persistent `OrderSummarySidebar` (collapsible on mobile), and step components
    - On `createOrder()` success, redirect to `/[locale]/order-success?order=<id>`
    - _Requirements: 9.1, 9.5, 9.6_

  - [ ]* 11.6 Write unit tests for checkout form validation
    - Test zod schemas: required fields, email format, phone pattern, card number pattern, expiry format
    - _Requirements: 9.3, 9.4_

- [ ] 12. Implement Server Actions
  - [x] 12.1 Implement product Server Actions (`lib/actions/products.ts`)
    - `getProducts`, `getProductById`, `getProductsByCategory`, `getFeaturedProducts`, `searchProducts`, `createProduct`, `updateProduct`, `deleteProduct`
    - Apply filter and sort logic server-side via Prisma query options
    - _Requirements: 5.1, 5.2, 5.3, 5.5, 11.2_

  - [x] 12.2 Implement order Server Actions (`lib/actions/orders.ts`)
    - `createOrder`: generate unique `orderNumber` (e.g., `LB-{timestamp}-{random4}`), write Order + OrderItems to DB, return full order
    - `getOrders`, `getOrderById`, `updateOrderStatus`
    - _Requirements: 9.1, 10.1, 11.4, 11.5_

  - [ ]* 12.3 Write property test for order number uniqueness (Property 4)
    - **Property 4: Order Number Uniqueness**
    - **Validates: Requirements 10.1**
    - Use fast-check to generate multiple order creation timestamps and assert all generated order numbers are unique

  - [ ] 12.4 Implement admin Server Actions (`lib/actions/admin.ts`)
    - `getDashboardStats`: count products, orders, customers (distinct emails), sum total revenue
    - `getCustomers`: group orders by email, return name, email, order count
    - _Requirements: 11.6, 11.7_

- [ ] 13. Build order success page
  - [ ] 13.1 Build order success page (`app/[locale]/order-success/page.tsx`)
    - Read `order` query param; fetch order from DB; display order number, item summary, delivery address
    - Confetti animation using Framer Motion `useAnimate` or a lightweight confetti library
    - "Continue Shopping" CTA → home page
    - Clear cart store on mount
    - _Requirements: 10.1, 10.2, 10.3_

- [ ] 14. Build admin dashboard
  - [ ] 14.1 Build admin auth middleware and layout
    - `app/admin/layout.tsx`: check `admin_session` cookie; render password gate form if absent
    - Password gate validates against `process.env.ADMIN_PASSWORD`; on success sets cookie and reloads
    - `AdminSidebar` with links to Overview, Products, Orders, Customers
    - _Requirements: 11.1_

  - [ ] 14.2 Build admin overview page (`app/admin/page.tsx`)
    - Fetch `getDashboardStats()`; render 4 `StatsCard` components (total orders, revenue, products, customers)
    - Minimal bar chart of orders by status using CSS/SVG (no charting library required)
    - _Requirements: 11.7_

  - [ ] 14.3 Build admin products list page and delete action
    - Table of all products with columns: image thumbnail, SKU, name (EN), category, price, stock, featured toggle
    - Delete button with confirmation dialog (shadcn AlertDialog)
    - Links to Create and Edit pages
    - _Requirements: 11.2_

  - [ ] 14.4 Build ProductForm component and create/edit pages
    - react-hook-form with bilingual field pairs (nameEn, nameAr, descEn, descAr), price, category select, image URL inputs (add/remove rows), color tags input, size tags input, stock number, featured checkbox
    - Shared by `/admin/products/new` and `/admin/products/[id]/edit`
    - Calls `createProduct` or `updateProduct` Server Action on submit
    - _Requirements: 11.2, 11.3_

  - [ ] 14.5 Build admin orders page (`app/admin/orders/page.tsx`)
    - Table: order number, customer name, date, total, status badge
    - Inline status dropdown per row; onChange calls `updateOrderStatus` Server Action
    - _Requirements: 11.4, 11.5_

  - [ ] 14.6 Build admin customers page (`app/admin/customers/page.tsx`)
    - Table: name, email, order count
    - Fetches `getCustomers()` Server Action
    - _Requirements: 11.6_

- [ ] 15. Checkpoint — full application wired together
  - Verify end-to-end flow: home → category → PDP → cart → checkout → order success. Verify admin dashboard CRUD and order status update. Ask the user if any issues arise.

- [ ] 16. Accessibility, loading states, and polish
  - [ ] 16.1 Add skeleton loaders and loading states
    - Create `loading.tsx` files for category, search, PDP, and cart pages using shadcn Skeleton components
    - Add Suspense boundaries around async Server Components
    - _Requirements: 13.3_

  - [ ] 16.2 Add ARIA attributes and keyboard navigation
    - Ensure all buttons, links, form fields, and modal/drawer triggers have accessible labels
    - Verify Tab/Enter/Escape keyboard navigation works for CartDrawer, modals, and dropdowns
    - _Requirements: 13.2_

  - [ ] 16.3 Apply 404 not-found pages
    - Create `not-found.tsx` in `app/[locale]/` with branded illustration, bilingual message, and home link
    - _Requirements: 2.1_

  - [ ]* 16.4 Write property test for RTL/LTR layout symmetry (Property 3)
    - **Property 3: RTL/LTR Layout Symmetry**
    - **Validates: Requirements 2.4, 3.1**
    - Use fast-check to generate locale values and assert `dir` attribute equals `rtl` for `ar` and `ltr` for `en`

  - [ ]* 16.5 Write Playwright end-to-end test for checkout flow
    - Navigate home → click featured product → add to cart → proceed to checkout → fill delivery + payment → place order → assert order success page and order number visible
    - _Requirements: 9.1, 9.2, 9.4, 10.1_

- [ ] 17. Final checkpoint — all tests pass
  - Run `vitest --run` to verify all unit and property tests pass. Run `playwright test` to verify E2E test passes. Ask the user if any final questions arise before delivery.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP delivery.
- Each task references specific requirements for full traceability to requirements.md.
- Checkpoints at tasks 2, 9, 15, and 17 ensure incremental validation at logical milestones.
- Property tests (Properties 1–5) are defined in design.md and encode universal correctness invariants.
- Unit tests validate specific examples and edge cases; both are complementary.
- The admin dashboard uses a simple cookie-based password gate — no full auth system.
- All payment processing is simulated; no real card data is transmitted or stored.
- Seed data uses `picsum.photos` for product images, requiring no external asset uploads.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3", "1.4", "1.6"] },
    { "id": 2, "tasks": ["1.5", "3.1"] },
    { "id": 3, "tasks": ["3.2", "3.3", "3.4", "4.1", "4.3"] },
    { "id": 4, "tasks": ["3.5", "4.2", "4.4", "4.5", "5.1"] },
    { "id": 5, "tasks": ["5.2", "6.1", "6.2", "6.3", "6.4", "7.1", "7.2", "7.3", "7.4"] },
    { "id": 6, "tasks": ["6.5", "7.5", "7.6", "8.1", "12.1", "12.2"] },
    { "id": 7, "tasks": ["7.7", "8.2", "12.3", "12.4"] },
    { "id": 8, "tasks": ["8.3", "10.1", "10.2", "11.1", "11.2", "11.3", "11.4"] },
    { "id": 9, "tasks": ["11.5", "13.1", "14.1", "14.3"] },
    { "id": 10, "tasks": ["11.6", "14.2", "14.4", "14.5", "14.6"] },
    { "id": 11, "tasks": ["16.1", "16.2", "16.3"] },
    { "id": 12, "tasks": ["16.4", "16.5"] }
  ]
}
```
