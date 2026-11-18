# Requirements Document

## Introduction

The Life Box admin dashboard currently operates on hardcoded mock data across 14 feature areas (analytics, banners, best-sellers, branding, categories, customers, financials, integrations, marketing, navigation, orders, products, settings, visibility) and renders entirely in English. This spec defines the transition to live database-backed data, full Arabic (RTL) localization of the admin UI, real CRUD operations with persistence, and a clean, error-free codebase. The existing Prisma schema already contains models for all affected entities (Product, ProductCategory, Order, OrderItem, Customer, Banner, NavigationItem, ApiIntegration, MarketingContent, SiteSettings, AnalyticsSnapshot), so no schema redesign is required; the work is to wire the UI to these models, localize it, and remove all mock-data artifacts.

## Requirements

### 1. Mock Data Elimination

#### 1.1 Remove Mock Data Sources
The system MUST remove all imports of and references to src/lib/mockData.ts (e.g., MOCK_PRODUCTS, FEATURED_PRODUCTS, getProductsByCategory, getProductById, searchProducts) from every admin page and component.

#### 1.2 Eliminate Inline Hardcoded Data
The system MUST remove all inline hardcoded mock arrays, dummy statistics, and placeholder JSON objects from admin pages (e.g., the getStats() function returning hardcoded numbers in src/app/admin/page.tsx, and local interface-based fake arrays in analytics, financials, best-sellers, banners, marketing, integrations, and settings pages).

#### 1.3 Delete Mock Data File
The system MUST delete src/lib/mockData.ts once no references remain, to prevent reintroduction of mock data.

#### 1.4 No Placeholder Images for Real Records
The system MUST NOT fall back to /placeholder.jpg for records that have a real image URL stored in the database. Where a real image URL exists, it MUST be used; the placeholder is only a fallback for genuinely missing images.

### 2. Real Data Integration

#### 2.1 Dashboard Overview (Real Stats)
The admin overview page (src/app/admin/page.tsx) MUST fetch real aggregate statistics from the database via Server Actions: total orders, total revenue (sum of order totals), total products, total customers, and a breakdown of orders by status. No hardcoded numbers.

#### 2.2 Products Page (Real Data)
The products list page MUST fetch all products from the database via a Server Action (e.g., getProducts()), displaying real product records with image thumbnail, SKU, Arabic name, category, price, stock, and featured state.

#### 2.3 Orders Page (Real Data)
The orders page MUST fetch all orders from the database via a Server Action (e.g., getOrders()), displaying real order number, customer name, date, total, and status. Real-time data on page load.

#### 2.4 Customers Page (Real Data)
The customers page MUST fetch customers from the database (via Customer records or derived from orders by distinct email), displaying real name, email, and order count.

#### 2.5 Analytics Page (Real Data)
The analytics page MUST compute its metrics from real database records: revenue trends from Order, traffic/peak hours and regional breakdowns from AnalyticsSnapshot (where available) or derived from order data, conversion metrics, and top products/categories. Where AnalyticsSnapshot rows are insufficient, the system MUST derive what it can from live orders rather than display fabricated data.

#### 2.6 Financials Page (Real Data)
The financials page MUST compute revenue, order counts, average order value, tax totals, shipping totals, and discounts from real Order records. No fabricated financial figures.

#### 2.7 Best Sellers Page (Real Data)
The best-sellers page MUST compute top-selling products, slow-moving products, and low-stock alerts from real OrderItem (sales quantities) and Product (stock) records. No hardcoded product rankings.

#### 2.8 Banners Page (Real Data)
The banners page MUST fetch and display real Banner records from the database.

#### 2.9 Categories Page (Real Data)
The categories page MUST fetch and display real ProductCategory records from the database.

#### 2.10 Settings Page (Real Data)
The settings page MUST load and display real SiteSettings record(s) from the database on mount.

#### 2.11 Marketing Page (Real Data)
The marketing page MUST fetch and display real MarketingContent records from the database.

#### 2.12 Navigation Page (Real Data)
The navigation management page MUST fetch and display real NavigationItem records from the database.

#### 2.13 Integrations Page (Real Data)
The integrations page MUST fetch and display real ApiIntegration records from the database.

#### 2.14 Branding and Visibility Pages (Real Data)
The branding page MUST read brand colors and logo from real SiteSettings. The visibility page MUST read maintenance mode and category visibility state from real SiteSettings and ProductCategory records.

#### 2.15 Server-Side Data Fetching
Pages that do not require client interactivity for initial render SHOULD fetch data server-side (Server Components) to avoid unnecessary client-side fetching. Pages with interactive CRUD forms MAY be client components that invoke Server Actions.

#### 2.16 Loading States
Each page that fetches data MUST display a loading state (skeleton or spinner) while data is being fetched, and an empty state when no records exist, rather than showing fabricated placeholder content.

### 3. Full Arabic Localization and RTL Support

#### 3.1 Admin Layout RTL
The admin layout (src/app/admin/layout.tsx) MUST set dir="rtl" and lang="ar" on the <html> element so the entire admin dashboard renders right-to-left.

#### 3.2 Arabic Typography
The admin UI MUST use an Arabic-compatible font stack (e.g., Cairo or the existing --font-arabic variable) that renders correctly in RTL for all admin text.

#### 3.3 Complete Arabic Translation of UI Strings
All admin UI labels, headers, buttons, navigation menu items, tooltips, status badges, table column headers, form labels, placeholders, and empty-state messages MUST be in professional Arabic. Examples include: لوحة التحكم (Dashboard), المنتجات (Products), الطلبات (Orders), الإيرادات (Revenue), العملاء (Customers), الفئات (Categories), البانرات (Banners), التحليلات (Analytics), المالية (Financials), الأكثر مبيعا (Best Sellers), التسويق (Marketing), التكاملات (Integrations), العلامة التجارية (Branding), التنقل (Navigation), الإعدادات (Settings), الظهور (Visibility).

#### 3.4 Sidebar Navigation in Arabic
The AdminSidebar.tsx navigation labels and section group headers MUST be in Arabic.

#### 3.5 Header in Arabic
The AdminHeader.tsx search placeholder, notifications, and profile badge labels MUST be in Arabic.

#### 3.6 Stats Cards in Arabic
Dashboard overview stats card titles, subtitles, and trend labels MUST be in Arabic.

#### 3.7 Data Tables in Arabic
All table column headers and row action labels (e.g., تعديل (Edit), حذف (Delete), عرض (View)) MUST be in Arabic.

#### 3.8 Forms in Arabic
All form field labels, placeholders, validation error messages, and submit buttons MUST be in Arabic.

#### 3.9 Status Badges in Arabic
Order and entity statuses (Pending to قيد الانتظار, Processing to قيد المعالجة, Shipped to تم الشحن, Delivered to تم التوصيل, Cancelled to ملغي, Active to نشط, Inactive to غير نشط) MUST display in Arabic.

#### 3.10 Arabic Data Display
Where entities have bilingual fields (e.g., 
ameEn/
ameAr, 	itleEn/	itleAr), the admin MUST display the Arabic field (
ameAr, 	itleAr, contentAr) as the primary display value in tables and lists.

#### 3.11 Number, Currency, and Date Formatting
Currency values MUST be formatted with the configured currency symbol (from SiteSettings.currencySymbol) and Arabic-friendly number formatting. Dates MUST be displayed in a clear format (Gregorian) appropriate for the Arabic locale.

#### 3.12 RTL Layout Alignment
All flex/grid layouts, icon positions, padding/margin directions, dropdown/drawer slide directions, and table alignment MUST be RTL-correct (e.g., sidebar on the right, icons mirrored where directionally meaningful, text right-aligned by default).

### 4. CRUD Operations and Data Persistence

#### 4.1 Products CRUD
The admin MUST support creating, reading, updating, and deleting products via Server Actions that perform real Prisma database operations against the Product model. Changes MUST persist to the database and reflect immediately in the products list and overview stats.

#### 4.2 Categories CRUD
The admin MUST support creating, reading, updating, and deleting ProductCategory records via Server Actions. Category changes MUST persist and reflect immediately, including the dynamic category list used by products.

#### 4.3 Banners CRUD
The admin MUST support creating, reading, updating, and deleting Banner records via Server Actions, with persistence of title, image, placement, active state, and scheduling.

#### 4.4 Settings Persistence
The admin settings page MUST save changes to the SiteSettings record via a Server Action, persisting store name, brand colors, currency, tax rate, shipping, contact info, and social links. Changes MUST take effect immediately.

#### 4.5 Marketing CRUD
The admin MUST support creating, reading, updating, and deleting MarketingContent records via Server Actions with persistence.

#### 4.6 Navigation CRUD
The admin MUST support creating, reading, updating, and deleting NavigationItem records via Server Actions with persistence.

#### 4.7 Integrations CRUD
The admin MUST support updating ApiIntegration records (enable/disable, API keys, webhooks) via Server Actions with persistence. Secrets MUST be stored securely and not leaked to the client.

#### 4.8 Branding Persistence
The admin branding page MUST persist brand color and logo changes to SiteSettings via a Server Action.

#### 4.9 Order Status Updates
The admin MUST support updating an order's status via a Server Action (updateOrderStatus) that persists the change to the Order record and reflects it immediately in the orders table.

#### 4.10 Instant Frontend Reflection
After any create/update/delete operation succeeds, the affected list/overview MUST refresh to show the new state without requiring a full manual page reload (via revalidation, optimistic update, or refetch as appropriate).

#### 4.11 Validation and Error Handling
All CRUD forms MUST validate input before submission (using zod schemas) and display Arabic error messages on failure. Failed operations MUST NOT corrupt database state.

#### 4.12 Server Actions Architecture
All mutations MUST be implemented as Next.js Server Actions ("use server") that interact with Prisma directly. No client-side direct database access. Read operations MAY use Server Actions or direct Prisma calls in Server Components.

### 5. Code Quality and Build Integrity

#### 5.1 Zero TypeScript Compilation Errors
The project MUST compile with zero TypeScript errors. This includes resolving the pre-existing errors in 
ext.config.ts (uildActivityPosition), src/lib/actions/orders.ts (Address type incompatibility), and src/lib/actions/products.ts (Category enum vs ProductCategory relation incompatibility introduced by the dynamic-category migration).

#### 5.2 Zero Runtime Errors
The admin dashboard MUST run without runtime errors in the browser console or server logs under normal usage (navigating each section, opening forms, submitting CRUD operations).

#### 5.3 Remove Dead Mock Code
All dead mock-data code paths, unused local interfaces that existed only to type mock data, and orphaned helper functions MUST be removed.

#### 5.4 Successful Build
The production build MUST complete successfully (or the dev server MUST start and serve all admin pages without errors), confirming the fix and integration.

#### 5.5 No Regression to Main Site
The customer-facing site (/[locale] routes) MUST continue to function correctly with no regressions introduced by the admin changes (shared data models, shared Server Actions).

### 6. Non-Functional Requirements

#### 6.1 Admin Auth Preserved
The existing admin password-gate authentication (cookie dmin_session) MUST remain functional. Localization and data changes MUST NOT weaken the auth check.

#### 6.2 Responsive RTL
The Arabic RTL admin layout MUST remain responsive across viewport widths (1920px, 1280px, 768px, 375px): sidebar collapse on mobile, stats cards stacking, tables horizontally scrollable.

#### 6.3 Reuse Existing Schema
The implementation MUST reuse the existing Prisma models (ProductCategory, Product, Order, OrderItem, Customer, Banner, NavigationItem, ApiIntegration, MarketingContent, SiteSettings, AnalyticsSnapshot). No new schema models are required for this spec.

#### 6.4 Bilingual Field Support
Entities with bilingual fields (name/title/description EN/AR) MUST continue to accept and store both language variants in CRUD forms, with Arabic shown as the primary display value per requirement 3.10.