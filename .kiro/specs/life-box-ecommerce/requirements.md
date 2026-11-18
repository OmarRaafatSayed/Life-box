# Requirements Document

## Introduction

Life Box is a bilingual (Arabic/English) e-commerce website specializing in home utilities, housewares, home textiles, and decorative items. The site provides a cheerful, vibrant, modern shopping experience with full RTL support, seamless user flow from browsing to checkout, and an admin dashboard for product and order management.

## Requirements

### 1. Project Foundation & Tech Stack

#### 1.1 Framework and Tooling
The system MUST be built with Next.js 15 (App Router) and TypeScript as the primary framework.

#### 1.2 Styling
The system MUST use Tailwind CSS v4 for all styling with the brand color palette:
- Deep Plum: `#3D1A6E` (primary)
- Magenta: `#E91E8C` (accent)
- Teal: `#00BCD4` (accent)
- Warm Orange: `#FF6B35` (accent)

#### 1.3 Component Library
The system MUST integrate shadcn/ui (latest) with Radix UI primitives for accessible UI components.

#### 1.4 Animation
The system MUST use Framer Motion v11+ for page transitions, hover states, and micro-interactions.

#### 1.5 Icons
The system MUST use Lucide React for all iconography.

#### 1.6 Internationalization
The system MUST use next-intl for bilingual AR/EN support with full RTL layout switching.

#### 1.7 State Management
The system MUST use Zustand for client-side cart and wishlist state.

#### 1.8 Database
The system MUST use Supabase as the database backend with Prisma as the ORM.

---

### 2. Design System & Visual Identity

#### 2.1 Aesthetic Language
The system MUST implement a cheerful, vibrant, welcoming aesthetic ("مبهج") with heavy border-radius (rounded-2xl minimum), pill-shaped buttons, soft organic shapes, and zero sharp edges anywhere on the page.

#### 2.2 Typography
The system MUST use an Arabic-compatible typeface stack that displays correctly in RTL and LTR modes.

#### 2.3 Responsive Design
The system MUST be mobile-first responsive, rendering correctly on screens from 320px to 1920px wide.

#### 2.4 RTL / LTR Support
The system MUST switch the entire page layout (direction, alignment, margins, paddings, icons, text) when the language is toggled between Arabic and English.

#### 2.5 Micro-Interactions
The system MUST include hover animations, focus states, button press feedback, and loading skeletons throughout the UI.

---

### 3. Internationalization & Language Toggle

#### 3.1 Supported Locales
The system MUST support two locales: `ar` (Arabic, RTL) and `en` (English, LTR).

#### 3.2 Language Toggle
The system MUST display a persistent language toggle in the header that switches locale without a full page reload.

#### 3.3 URL Structure
The system MUST prefix all routes with the active locale (e.g., `/en/products`, `/ar/products`).

#### 3.4 Translation Files
The system MUST maintain separate translation JSON files for all UI strings in Arabic and English.

#### 3.5 Number & Currency Formatting
The system MUST format prices in SAR with locale-appropriate number formatting (Arabic-Indic numerals for `ar` locale).

---

### 4. Home Page

#### 4.1 Hero Section
The home page MUST display a full-width hero section with animated headline, sub-headline, and a primary CTA button linking to the shop.

#### 4.2 Category Showcase
The home page MUST display the four product categories (Home Utilities, Housewares, Home Textiles, Decorative Items) as visually distinct clickable cards.

#### 4.3 Featured Products
The home page MUST display a "Featured Products" horizontal scroll strip with at least 8 mock products.

#### 4.4 Promotional Banner
The home page MUST include at least one promotional banner section (e.g., seasonal sale, free shipping threshold).

#### 4.5 Newsletter / Footer
The home page MUST include a newsletter signup section and a site-wide footer with navigation links, social links, and legal text.

---

### 5. Product Catalog & Search

#### 5.1 Category Pages
The system MUST render a category listing page for each of the four product categories, filterable and sortable.

#### 5.2 Filtering
Category pages MUST support filtering by:
- Price range (min/max slider)
- Color
- Rating (minimum stars)
- Availability (in stock)

#### 5.3 Sorting
Category pages MUST support sorting by: Newest, Price (low–high), Price (high–low), Best Rating, Most Popular.

#### 5.4 Product Card
Each product card MUST display: product image, name (bilingual), price, star rating, and quick-add-to-cart button, plus a wishlist toggle icon.

#### 5.5 Global Search
The header MUST include a search bar that filters products by name and description across all categories, returning results in real time (client-side or server-side).

#### 5.6 Search Results Page
The system MUST render a dedicated search results page showing matched products with the same card layout as category pages.

#### 5.7 Pagination / Infinite Scroll
Category and search result pages MUST support either pagination or infinite scroll.

---

### 6. Product Detail Page (PDP)

#### 6.1 Image Gallery
The PDP MUST display a main image with thumbnail navigation and zoom-on-hover.

#### 6.2 Product Information
The PDP MUST display: name (bilingual), price, short description, full description, star rating with review count, SKU, and availability badge.

#### 6.3 Variant Selection
The PDP MUST support color and size variant selection where applicable.

#### 6.4 Quantity Selector
The PDP MUST include a quantity selector (increment/decrement) before add-to-cart.

#### 6.5 Add to Cart & Wishlist
The PDP MUST include an "Add to Cart" button and a "Save to Wishlist" toggle button, both with animated feedback.

#### 6.6 Related Products
The PDP MUST display a "You may also like" section with at least 4 related products from the same category.

---

### 7. Cart

#### 7.1 Slide-out Cart Drawer
The system MUST implement a slide-out cart drawer (accessible from the header cart icon) showing all items currently in the cart.

#### 7.2 Cart Item Management
The cart drawer MUST allow: changing item quantity, removing individual items, and clearing the entire cart.

#### 7.3 Cart Summary
The cart drawer MUST display: subtotal, estimated shipping, and total.

#### 7.4 Persistent Cart
The cart state MUST persist across page refreshes using localStorage.

#### 7.5 Cart Page
The system MUST also render a full `/cart` page with the same functionality as the drawer plus a prominent checkout CTA.

#### 7.6 Empty Cart State
When the cart is empty, the system MUST display a friendly illustrated empty-state with a CTA to continue shopping.

---

### 8. Wishlist

#### 8.1 Wishlist Page
The system MUST render a `/wishlist` page displaying all saved items.

#### 8.2 Wishlist to Cart
The wishlist page MUST allow users to move individual items directly to the cart.

#### 8.3 Persistent Wishlist
The wishlist state MUST persist across page refreshes using localStorage.

---

### 9. Checkout

#### 9.1 Guest Checkout Only
The system MUST support guest checkout without requiring user account creation or login.

#### 9.2 Checkout Form
The checkout page MUST collect: full name, email, phone number, delivery address (street, city, region, postal code, country), and order notes (optional).

#### 9.3 Form Validation
All required fields MUST display inline validation errors with clear bilingual error messages.

#### 9.4 Simulated Payment
The checkout MUST include a payment step showing card input fields (name on card, card number, expiry, CVV) that are visually styled but do NOT process real payments — the system simulates a successful payment.

#### 9.5 Order Summary Sidebar
The checkout page MUST display a persistent order summary sidebar (or collapsible panel on mobile) showing all cart items and totals.

#### 9.6 Checkout Steps
The checkout MUST be presented as a multi-step flow (minimum: Delivery → Payment → Review) with a visible step indicator.

---

### 10. Order Success Page

#### 10.1 Confirmation Display
After simulated payment, the system MUST redirect to an order success page displaying: a generated order number, order summary, and delivery address.

#### 10.2 Animated Celebration
The order success page MUST include a celebratory animation (confetti or similar).

#### 10.3 Continue Shopping CTA
The order success page MUST include a CTA button returning the user to the home page or shop.

---

### 11. Admin Dashboard

#### 11.1 Admin Route
The system MUST expose an `/admin` route group for the dashboard, protected by a simple hardcoded password (no full auth system required).

#### 11.2 Product Management (CRUD)
The admin dashboard MUST allow: listing all products, creating new products, editing existing products, and deleting products.

#### 11.3 Product Form Fields
The product creation/edit form MUST include: name (AR + EN), description (AR + EN), price, category, images (URL input), color variants, size variants, stock quantity, featured flag.

#### 11.4 Order Management
The admin dashboard MUST display all submitted orders with: order number, customer name, date, total, and status.

#### 11.5 Order Status Update
The admin dashboard MUST allow updating an order's status (Pending → Processing → Shipped → Delivered → Cancelled).

#### 11.6 Customer View
The admin dashboard MUST display a list of customers derived from guest checkout submissions (name, email, order count).

#### 11.7 Dashboard Overview
The admin dashboard MUST include a summary overview page with: total orders, total revenue, total products, and total customers.

---

### 12. Mock Data

#### 12.1 Seed Data
The system MUST include seed data with at least 20 mock products across the four categories, each with bilingual names, descriptions, prices, images (using placeholder/stock image URLs), ratings, and variants.

#### 12.2 Mock Orders
The seed data MUST include at least 5 mock orders for the admin dashboard demo.

---

### 13. Performance & Accessibility

#### 13.1 Image Optimization
The system MUST use Next.js `<Image>` for all product images with appropriate `width`, `height`, and `alt` attributes.

#### 13.2 Accessibility
All interactive elements MUST have accessible labels, keyboard navigation support, and ARIA attributes where required.

#### 13.3 Loading States
The system MUST display skeleton loaders or spinners during data fetching operations.
