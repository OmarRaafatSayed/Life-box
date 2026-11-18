# Design Document

## Overview

Life Box is a Next.js 15 App Router application with TypeScript, using Tailwind CSS v4, shadcn/ui, Framer Motion, next-intl, Zustand, Supabase, and Prisma. The architecture follows a file-system-routed structure under `src/app/[locale]/` to serve bilingual AR/EN content with full RTL support. All data is seeded in Supabase; the admin dashboard uses Server Actions for mutations.

---

## Architecture

### Directory Layout

```
src/
├── app/
│   ├── [locale]/               # Locale-prefixed customer routes
│   │   ├── layout.tsx          # Root layout: sets dir, fonts, providers
│   │   ├── page.tsx            # Home page
│   │   ├── products/
│   │   │   └── page.tsx        # Global search results
│   │   ├── category/
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Category listing
│   │   ├── product/
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Product Detail Page
│   │   ├── cart/
│   │   │   └── page.tsx        # Full cart page
│   │   ├── wishlist/
│   │   │   └── page.tsx        # Wishlist page
│   │   ├── checkout/
│   │   │   └── page.tsx        # Multi-step checkout
│   │   └── order-success/
│   │       └── page.tsx        # Order confirmation
│   ├── admin/                  # Admin dashboard (not locale-prefixed)
│   │   ├── layout.tsx          # Admin layout + simple password gate
│   │   ├── page.tsx            # Dashboard overview
│   │   ├── products/
│   │   │   ├── page.tsx        # Product list
│   │   │   ├── new/page.tsx    # Create product
│   │   │   └── [id]/edit/page.tsx  # Edit product
│   │   ├── orders/
│   │   │   └── page.tsx        # Order list + status update
│   │   └── customers/
│   │       └── page.tsx        # Customer list
│   └── api/                    # Route handlers for search, etc.
├── components/
│   ├── ui/                     # shadcn/ui primitives re-exported
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── CartDrawer.tsx
│   │   └── LanguageToggle.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── CategoryShowcase.tsx
│   │   ├── FeaturedProducts.tsx
│   │   └── PromoBanner.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductFilters.tsx
│   │   ├── SortDropdown.tsx
│   │   ├── ImageGallery.tsx
│   │   └── RelatedProducts.tsx
│   ├── checkout/
│   │   ├── CheckoutStepper.tsx
│   │   ├── DeliveryForm.tsx
│   │   ├── PaymentForm.tsx
│   │   └── ReviewStep.tsx
│   └── admin/
│       ├── AdminSidebar.tsx
│       ├── StatsCard.tsx
│       └── ProductForm.tsx
├── lib/
│   ├── prisma.ts               # Prisma client singleton
│   ├── supabase.ts             # Supabase client
│   ├── actions/                # Server Actions
│   │   ├── products.ts
│   │   ├── orders.ts
│   │   └── admin.ts
│   └── utils.ts                # cn(), formatCurrency(), etc.
├── store/
│   ├── cartStore.ts            # Zustand cart + localStorage sync
│   └── wishlistStore.ts        # Zustand wishlist + localStorage sync
├── i18n/
│   ├── messages/
│   │   ├── en.json
│   │   └── ar.json
│   └── routing.ts              # next-intl locale config
├── types/
│   └── index.ts                # Shared TypeScript interfaces
└── prisma/
    ├── schema.prisma
    └── seed.ts
```

### Data Flow

```
Browser (Zustand store + React state)
    ↕
Next.js Server Components / Route Handlers
    ↕
Server Actions (lib/actions/*.ts)
    ↕
Prisma ORM
    ↕
Supabase PostgreSQL
```

---

## Data Models

### Prisma Schema

```prisma
model Product {
  id          String   @id @default(cuid())
  nameEn      String
  nameAr      String
  descEn      String   @db.Text
  descAr      String   @db.Text
  price       Decimal  @db.Decimal(10, 2)
  category    Category
  images      String[]
  colors      String[]
  sizes       String[]
  stock       Int      @default(0)
  rating      Decimal  @db.Decimal(3, 2) @default(0)
  reviewCount Int      @default(0)
  featured    Boolean  @default(false)
  sku         String   @unique
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  orderItems  OrderItem[]
}

enum Category {
  HOME_UTILITIES
  HOUSEWARES
  HOME_TEXTILES
  DECORATIVE_ITEMS
}

model Order {
  id          String      @id @default(cuid())
  orderNumber String      @unique
  fullName    String
  email       String
  phone       String
  address     Json        // { street, city, region, postal, country }
  notes       String?
  items       OrderItem[]
  subtotal    Decimal     @db.Decimal(10, 2)
  shipping    Decimal     @db.Decimal(10, 2)
  total       Decimal     @db.Decimal(10, 2)
  status      OrderStatus @default(PENDING)
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

model OrderItem {
  id        String   @id @default(cuid())
  orderId   String
  order     Order    @relation(fields: [orderId], references: [id])
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  quantity  Int
  price     Decimal  @db.Decimal(10, 2)
  color     String?
  size      String?
}
```

---

## Component Design

### Layout & Navigation

**Header** renders: logo (bilingual), search bar, language toggle, wishlist icon (badge), cart icon (badge, opens CartDrawer). On mobile it collapses to a hamburger menu. Direction is driven by `dir` prop from the locale.

**CartDrawer** is a Framer Motion `AnimatePresence`-driven slide panel from the right (LTR) or left (RTL). It reads Zustand `cartStore` and allows quantity change, item removal, and navigates to `/[locale]/checkout`.

**LanguageToggle** switches locale by calling `useRouter().replace()` with the alternate locale prefix, preserving the current path segment.

### Home Page Sections

**HeroSection**: Full-viewport gradient background using brand colors. Headline and CTA animate in via Framer Motion `fadeInUp` variants. CTA is a pill button linking to `/[locale]/category/home-utilities`.

**CategoryShowcase**: 4 cards with large emoji/icon, category name, and product count. Hover triggers a scale + shadow animation.

**FeaturedProducts**: Horizontally scrollable row (CSS `overflow-x: auto`, hidden scrollbar) of `ProductCard` components. Scroll snap enabled.

**PromoBanner**: Full-width banner with gradient, promotional text, and CTA. Uses Framer Motion for text marquee effect.

### Product Card

```tsx
<motion.div whileHover={{ y: -4, boxShadow: "..." }}>
  <Image />           // Next.js optimized
  <WishlistToggle />  // Zustand wishlistStore
  <Name />            // locale-aware: product.nameEn | product.nameAr
  <Price />           // formatCurrency(price, locale)
  <StarRating />
  <QuickAddButton />  // Zustand cartStore.addItem()
</motion.div>
```

### Product Filters

Client component using `useSearchParams` / `useRouter` to push filter state into URL query params. Filters: price range (shadcn Slider), color swatches (toggle buttons), min rating (star buttons), in-stock checkbox.

### Checkout Flow

Multi-step implemented as a client component with local step state (0=Delivery, 1=Payment, 2=Review). Each step renders a form validated with react-hook-form + zod. On step 2 submit, a Server Action `createOrder()` writes to Supabase, generates an order number, and returns it. The page then navigates to `/[locale]/order-success?order=<id>`.

### Admin Dashboard

Simple password gate: a hardcoded env var `ADMIN_PASSWORD`. On first visit, renders a password form; on correct entry, sets a cookie `admin_session=1` valid for 24 hours. All admin pages check this cookie via middleware.

Product CRUD uses Server Actions (`createProduct`, `updateProduct`, `deleteProduct`). The product form uses react-hook-form with bilingual field pairs.

---

## Internationalization Architecture

### next-intl Configuration

```ts
// i18n/routing.ts
export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
});
```

Root layout sets `<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>`.

Tailwind v4 uses `[dir=rtl]:` variant for RTL-specific overrides (e.g., flipping margins, icon positions).

### Translation Keys Structure

```json
// en.json (abbreviated)
{
  "nav": { "home": "Home", "shop": "Shop", "cart": "Cart" },
  "home": { "hero": { "title": "...", "subtitle": "...", "cta": "Shop Now" } },
  "product": { "addToCart": "Add to Cart", "saveToWishlist": "Save to Wishlist" },
  "checkout": { "delivery": "Delivery", "payment": "Payment", "review": "Review" },
  "errors": { "required": "This field is required" }
}
```

---

## State Management

### Cart Store (Zustand)

```ts
interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, qty: number, color?: string, size?: string) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  toggleDrawer: () => void;
  subtotal: () => number;
}
// persisted to localStorage via zustand/middleware persist
```

### Wishlist Store (Zustand)

```ts
interface WishlistState {
  items: Product[];
  toggle: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCart: (productId: string) => void;
}
// persisted to localStorage via zustand/middleware persist
```

---

## Seed Data

The seed script (`prisma/seed.ts`) inserts 20 products (5 per category) with:
- Bilingual names and descriptions
- Prices between 25–450 SAR
- `picsum.photos` URLs for images
- 1–3 color variants, optional size variants
- Realistic ratings (3.5–5.0) and review counts
- 5 of them flagged as `featured: true`

5 mock orders reference random products with PENDING/PROCESSING/SHIPPED statuses.

---

## Correctness Properties

### Property 1: Cart Subtotal Consistency
For any set of cart items, the computed subtotal MUST equal the sum of `(item.price × item.quantity)` for all items. This is a universal invariant over all possible cart states.
**Validates: Requirements 7.3**

### Property 2: Wishlist Toggle Idempotency
Toggling the same product into the wishlist twice returns the wishlist to its original state. For any product P and wishlist state W: `toggle(toggle(W, P), P) = W`.
**Validates: Requirements 8.1, 8.3**

### Property 3: RTL/LTR Layout Symmetry
For any page rendered in `ar` locale, the `dir` attribute on `<html>` MUST equal `"rtl"`. For `en` locale it MUST equal `"ltr"`. This holds for all routes.
**Validates: Requirements 2.4, 3.1**

### Property 4: Order Number Uniqueness
Every order created via `createOrder()` MUST receive a unique order number. For any two distinct order creation events, the resulting order numbers MUST differ.
**Validates: Requirements 10.1**

### Property 5: Cart Persistence
For any cart state S serialized to localStorage and subsequently deserialized, the resulting cart state S' MUST satisfy: `S'.items.length === S.items.length` and all item quantities and product IDs match.
**Validates: Requirements 7.4**

---

## Components and Interfaces

### Core TypeScript Interfaces

```ts
// types/index.ts

export type Category =
  | 'HOME_UTILITIES'
  | 'HOUSEWARES'
  | 'HOME_TEXTILES'
  | 'DECORATIVE_ITEMS';

export type OrderStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface Product {
  id: string;
  nameEn: string;
  nameAr: string;
  descEn: string;
  descAr: string;
  price: number;
  category: Category;
  images: string[];
  colors: string[];
  sizes: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  sku: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  color?: string;
  size?: string;
}

export interface Address {
  street: string;
  city: string;
  region: string;
  postal: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  fullName: string;
  email: string;
  phone: string;
  address: Address;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  color?: string;
  size?: string;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  region: string;
  postal: string;
  country: string;
  notes?: string;
}

export interface PaymentFormData {
  nameOnCard: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}
```

### Server Action Signatures

```ts
// lib/actions/products.ts
export async function getProducts(filters?: ProductFilters): Promise<Product[]>
export async function getProductById(id: string): Promise<Product | null>
export async function getProductsByCategory(category: Category, filters?: ProductFilters): Promise<Product[]>
export async function getFeaturedProducts(): Promise<Product[]>
export async function searchProducts(query: string): Promise<Product[]>
export async function createProduct(data: ProductFormData): Promise<Product>
export async function updateProduct(id: string, data: ProductFormData): Promise<Product>
export async function deleteProduct(id: string): Promise<void>

// lib/actions/orders.ts
export async function createOrder(data: CreateOrderInput): Promise<Order>
export async function getOrders(): Promise<Order[]>
export async function getOrderById(id: string): Promise<Order | null>
export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order>

// lib/actions/admin.ts
export async function getDashboardStats(): Promise<DashboardStats>
export async function getCustomers(): Promise<CustomerSummary[]>
```

### Component Props Interfaces

```ts
interface ProductCardProps {
  product: Product;
  locale: string;
}

interface ProductFiltersProps {
  category?: Category;
  onFilterChange: (filters: ProductFilters) => void;
}

interface CartDrawerProps {
  locale: string;
}

interface CheckoutStepperProps {
  currentStep: number;
  steps: string[];
}

interface ImageGalleryProps {
  images: string[];
  alt: string;
}
```

---

## Error Handling

- **Data fetching errors**: Server Components catch Prisma errors and render an error boundary fallback UI with a "Try again" button.
- **Form validation**: react-hook-form + zod schemas provide field-level errors with bilingual messages from next-intl.
- **Cart/wishlist hydration**: Zustand `persist` middleware uses a `skipHydration` guard to avoid SSR mismatches; a `useEffect` triggers rehydration on the client.
- **Admin auth failure**: Incorrect password returns a form error message; no sensitive information is leaked.
- **404 routes**: Each locale layout exports a `not-found.tsx` with a friendly branded page and a home link.

---

## Testing Strategy

- **Unit tests (Vitest)**: Cart store logic (subtotal computation, item deduplication, persistence), wishlist toggle idempotency, `formatCurrency` utility, and order number generation utility.
- **Property-based tests (fast-check)**: Properties 1–5 from the Correctness Properties section are encoded as fast-check properties.
- **Component tests (React Testing Library)**: ProductCard renders correct locale name, CartDrawer opens/closes, CheckoutStepper advances steps.
- **End-to-end (Playwright)**: Full checkout flow from home → PDP → cart → checkout → order success.

---

## Styling Conventions

All rounded corners use `rounded-2xl` or `rounded-full` for pill shapes. No `rounded-none` or `rounded-sm` anywhere in the codebase. Shadows use a custom soft multi-layer shadow token defined in `tailwind.config.ts`. Brand colors are exposed as CSS custom properties and Tailwind color tokens:

```css
--color-plum: #3D1A6E;
--color-magenta: #E91E8C;
--color-teal: #00BCD4;
--color-orange: #FF6B35;
```

Buttons come in three variants: `primary` (Magenta fill), `secondary` (Plum fill), `ghost` (transparent + border). All have `rounded-full` and `transition-all duration-200`.
