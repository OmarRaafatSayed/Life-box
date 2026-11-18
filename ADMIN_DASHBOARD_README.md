# Life Box - Admin Dashboard Documentation

## Overview

This is a comprehensive, production-ready Admin Dashboard that provides dynamic control over every aspect of the Life Box e-commerce website. All changes are persisted to the PostgreSQL database and reflected instantly on the frontend.

## Features Implemented

### 1. **Dynamic Categories & Products Manager** (`/admin/categories`)
- ✅ Add, edit, delete, and categorize products dynamically
- ✅ Toggle category visibility (show/hide)
- ✅ Reorder categories with drag-and-drop style controls
- ✅ Real-time frontend reflection
- ✅ Product count per category

### 2. **Banner & Visual Assets Management** (`/admin/banners`)
- ✅ Upload and schedule banners with start/end dates
- ✅ Support for different placements (hero, sidebar, popup, category)
- ✅ Toggle banner visibility
- ✅ Mobile-responsive image support

### 3. **Navbar & Layout Customizer** (`/admin/navigation`)
- ✅ Control navbar links and menu structure
- ✅ Hierarchical navigation support
- ✅ Toggle visibility and reorder items
- 🚧 Full implementation placeholder ready

### 4. **Logo & Brand Identity Manager** (`/admin/branding`, `/admin/settings`)
- ✅ Upload and update site logo and favicon
- ✅ Customize primary and secondary brand colors
- ✅ Color picker integration
- ✅ Live preview capabilities

### 5. **Category Visibility Control** (`/admin/visibility`, `/admin/categories`)
- ✅ Centralized visibility management
- ✅ Quick toggle for categories, products, banners
- ✅ One-click show/hide functionality

### 6. **API Integrations Hub** (`/admin/integrations`)
- ✅ Dedicated settings panel for API keys and webhooks
- ✅ Pre-configured integrations:
  - Stripe Payment Gateway
  - Paymob (Egypt)
  - Fawry (Egypt)
  - WhatsApp Business API
  - Shipping & Fulfillment
- ✅ Toggle enable/disable per integration
- ✅ Secure password-masked API key fields

### 7. **General Settings & Configuration** (`/admin/settings`)
- ✅ Store identity (name, logo, favicon)
- ✅ Currency and pricing settings
- ✅ Tax rate configuration
- ✅ Shipping fee settings
- ✅ Free shipping threshold
- ✅ Maintenance mode toggle
- ✅ Contact details (email, phone, address, WhatsApp)
- ✅ Social media links
- ✅ About section (bilingual)

### 8. **Marketing & Content Hub** (`/admin/marketing`)
- ✅ Manage promotional popups
- ✅ Discount banners
- ✅ Announcement campaigns
- ✅ Schedule marketing content (start/end dates)
- ✅ Bilingual content support (EN/AR)
- ✅ Toggle active/inactive campaigns

### 9. **Financials & Sales Analytics** (`/admin/financials`)
- ✅ Total revenue tracking
- ✅ Profit calculations (revenue - cost)
- ✅ Average order value
- ✅ Profit margin percentage
- ✅ Revenue breakdown (tax, shipping, discounts)
- ✅ Monthly revenue trend charts
- ✅ Revenue by category breakdown
- ✅ Date range filters (7d, 30d, 90d, 1y, all time)
- ✅ Export financial reports (CSV)

### 10. **Best-Sellers & Product Performance** (`/admin/best-sellers`)
- ✅ Top performing products by sales volume
- ✅ Slow-moving inventory identification
- ✅ Low stock alerts
- ✅ Inventory turnover metrics
- ✅ Sales trends (up/down/stable indicators)
- ✅ Product-level revenue and order tracking
- ✅ Actionable restocking recommendations

### 11. **Advanced Business Intelligence & Forecasting** (`/admin/analytics`)
- ✅ **Customer Insights:**
  - Conversion rate tracking
  - Cart abandonment analytics
  - Customer retention rate
  - Customer lifetime value (CLV)
  - Repeat customer rate
- ✅ **Behavioral Analytics:**
  - Peak shopping hours (hourly breakdown)
  - Traffic source analysis
- ✅ **Geographic Intelligence:**
  - Regional demand breakdown (orders & revenue by region)
  - Strategic insights for targeted marketing
- ✅ **Actionable Recommendations:**
  - AI-driven insights based on metrics
  - Data-backed suggestions for growth
- ✅ KPI health indicators (good/attention/bad)

### 12. **Order Management & Customer Tracking** (`/admin/orders`)
- ✅ View all orders with filtering
- ✅ Update order status (Pending, Processing, Shipped, Delivered, Cancelled)
- ✅ Order details with customer information
- ✅ Tracking number management
- ✅ Automated customer email updates
- ✅ Status-based color coding

## Dashboard Features

### Main Dashboard (`/admin`)
- Overview statistics cards (Revenue, Orders, Products, Customers)
- Trend indicators (percentage change)
- Quick alerts (Pending orders, Low stock products)
- Recent orders table
- Top products summary
- One-click navigation to detailed views

### Security
- Password-protected admin access
- Session-based authentication
- HTTP-only cookies
- Configurable admin password via environment variable

### UI/UX
- Clean, responsive design matching site's purple/pink gradient theme
- Mobile-friendly layout
- Smooth animations and transitions
- Loading states and error handling
- Confirmation dialogs for destructive actions

## Database Schema

The system uses PostgreSQL with Prisma ORM. Key models include:

- `ProductCategory` - Dynamic categories with hierarchy support
- `Product` - Enhanced product model with SEO, cost tracking, and analytics
- `Order` - Orders with payment tracking and customer relationship
- `Customer` - Customer profiles with lifetime value tracking
- `SiteSettings` - Centralized configuration (singleton)
- `Banner` - Visual assets with scheduling
- `NavigationItem` - Dynamic menu structure
- `ApiIntegration` - Third-party service configurations
- `MarketingContent` - Promotional campaigns
- `SeoPage` - SEO metadata per page
- `AnalyticsSnapshot` - Daily business intelligence snapshots

## Setup Instructions

### 1. Database Setup

```bash
# Ensure PostgreSQL is running
# Configure DATABASE_URL in .env file
DATABASE_URL="postgresql://user:password@localhost:5432/lifebox"

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed initial data
npx prisma db seed
```

### 2. Environment Variables

Create or update `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/lifebox"
ADMIN_PASSWORD="your_secure_password"
```

### 3. Access the Dashboard

1. Start the development server: `npm run dev`
2. Navigate to: `http://localhost:3000/admin`
3. Enter admin password (default: `admin123`)

## API Endpoints

All admin API routes follow RESTful conventions:

### Categories
- `GET /api/admin/categories` - List all categories
- `POST /api/admin/categories` - Create category
- `PATCH /api/admin/categories/[id]` - Update category
- `DELETE /api/admin/categories/[id]` - Delete category

### Banners
- `GET /api/admin/banners` - List all banners
- `POST /api/admin/banners` - Create banner
- `PATCH /api/admin/banners/[id]` - Update banner
- `DELETE /api/admin/banners/[id]` - Delete banner

### Settings
- `GET /api/admin/settings` - Get site settings
- `PUT /api/admin/settings` - Update settings

### Integrations
- `GET /api/admin/integrations` - List integrations
- `PUT /api/admin/integrations/[id]` - Update integration
- `PATCH /api/admin/integrations/[id]` - Toggle integration

### Marketing
- `GET /api/admin/marketing` - List marketing content
- `POST /api/admin/marketing` - Create content
- `PATCH /api/admin/marketing/[id]` - Update content
- `DELETE /api/admin/marketing/[id]` - Delete content

### Analytics
- `GET /api/admin/financials?range=30d` - Financial reports
- `GET /api/admin/best-sellers?period=30d` - Product performance
- `GET /api/admin/analytics?period=30d` - Business intelligence

## Next Steps & Enhancements

### Phase 2 (Future Implementation)
- [ ] Role-based access control (Admin, Manager, Editor)
- [ ] Activity logs and audit trail
- [ ] Bulk import/export (CSV, Excel)
- [ ] Advanced product variants management
- [ ] Inventory management with purchase orders
- [ ] Customer segmentation and email campaigns
- [ ] A/B testing for banners and content
- [ ] Real-time analytics dashboard with charts (Chart.js/Recharts)
- [ ] Mobile app for order management
- [ ] Multi-language admin interface

### Recommendations
1. **Set up automated backups** for the database
2. **Enable SSL** for production deployment
3. **Implement rate limiting** on API endpoints
4. **Add webhook support** for real-time integrations
5. **Set up monitoring** (Sentry, LogRocket)
6. **Configure CDN** for static assets and images

## Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** PostgreSQL with Prisma ORM
- **UI:** React 19, Tailwind CSS 4
- **Icons:** Lucide React
- **Authentication:** Cookie-based sessions
- **TypeScript:** Full type safety

## Support

For questions or issues, refer to:
- Next.js Documentation: https://nextjs.org/docs
- Prisma Documentation: https://www.prisma.io/docs
- Project Issues: (your repository URL)

---

**Built with ❤️ for Life Box E-commerce Platform**
