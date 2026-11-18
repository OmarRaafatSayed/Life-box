# Life Box Admin Dashboard - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database running
- npm or yarn package manager

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment

Create a `.env` file in the root directory:

```env
# Database Configuration (Prisma v7)
DATABASE_URL="postgresql://username:password@localhost:5432/lifebox"

# Admin Dashboard Password
ADMIN_PASSWORD="your_secure_admin_password"

# Optional: For production
NODE_ENV="development"
```

### Step 3: Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Create database schema (run migrations)
npx prisma migrate dev --name initial_setup

# Seed initial data (categories, settings, integrations)
npm run seed
# OR manually:
npx ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts
```

### Step 4: Run Development Server

```bash
npm run dev
```

Visit: **http://localhost:3000/admin**

Default credentials:
- Password: `admin123` (or your ADMIN_PASSWORD from .env)

---

## 📁 Project Structure

```
src/
├── app/
│   ├── admin/                    # Admin Dashboard
│   │   ├── categories/           # ✅ Feature 1: Categories Manager
│   │   ├── products/             # ✅ Feature 1: Products Manager
│   │   ├── banners/              # ✅ Feature 2: Banner Management
│   │   ├── navigation/           # ✅ Feature 3: Navigation Manager
│   │   ├── branding/             # ✅ Feature 4: Brand Identity
│   │   ├── visibility/           # ✅ Feature 5: Visibility Control
│   │   ├── integrations/         # ✅ Feature 6: API Integrations
│   │   ├── settings/             # ✅ Feature 7: General Settings
│   │   ├── marketing/            # ✅ Feature 8: Marketing Hub
│   │   ├── financials/           # ✅ Feature 9: Financial Analytics
│   │   ├── best-sellers/         # ✅ Feature 10: Best Sellers
│   │   ├── analytics/            # ✅ Feature 11: Business Intelligence
│   │   ├── orders/               # ✅ Feature 12: Order Management
│   │   └── customers/            # Customer Management
│   │
│   ├── api/admin/                # Admin API Routes
│   │   ├── categories/
│   │   ├── banners/
│   │   ├── settings/
│   │   ├── integrations/
│   │   ├── marketing/
│   │   ├── financials/
│   │   ├── best-sellers/
│   │   └── analytics/
│   │
│   └── [locale]/                 # Public Frontend
│
├── components/
│   └── admin/
│       └── AdminComponents.tsx   # Reusable UI Components
│
├── lib/
│   └── prisma.ts                 # Prisma Client Configuration
│
prisma/
├── schema.prisma                 # Database Schema (v7)
├── prisma.config.ts              # Prisma v7 Configuration
└── seed.ts                       # Database Seeding Script
```

---

## 🎯 Feature Checklist

### ✅ Core Features Implemented

- [x] **1. Dynamic Categories & Products Manager**
  - Add/Edit/Delete categories dynamically
  - Toggle visibility (show/hide)
  - Reorder categories
  - Product count tracking

- [x] **2. Banner & Visual Assets Management**
  - Upload and schedule banners
  - Multiple placements (hero, sidebar, popup)
  - Start/End date scheduling
  - Toggle active/inactive

- [x] **3. Navbar & Layout Customizer**
  - Dynamic navigation items
  - Hierarchical menu structure
  - Placeholder ready for full implementation

- [x] **4. Logo & Brand Identity Manager**
  - Upload logo and favicon
  - Customize brand colors (primary/secondary)
  - Color picker integration

- [x] **5. Category Visibility Control**
  - Centralized visibility dashboard
  - Quick toggle for all content types
  - Cross-feature visibility management

- [x] **6. API Integrations Hub**
  - Pre-configured: Stripe, Paymob, Fawry, WhatsApp, Shipping
  - API key management (masked fields)
  - Enable/Disable per integration
  - Webhook URL configuration

- [x] **7. General Settings & Configuration**
  - Store identity
  - Currency and tax settings
  - Shipping configuration
  - Contact information
  - Social media links
  - Maintenance mode toggle

- [x] **8. Marketing & Content Hub**
  - Promotional popups
  - Discount banners
  - Announcement campaigns
  - Schedule content (start/end dates)
  - Bilingual support (EN/AR)

- [x] **9. Financials & Sales Analytics**
  - Revenue tracking
  - Profit calculations
  - Average order value
  - Monthly trend charts
  - Revenue by category
  - Export reports (CSV)

- [x] **10. Best-Sellers & Product Performance**
  - Top performers by sales
  - Slow-moving inventory
  - Low stock alerts
  - Inventory turnover rate
  - Trend indicators

- [x] **11. Advanced Business Intelligence**
  - Conversion rate tracking
  - Cart abandonment analytics
  - Customer retention rate
  - Customer lifetime value
  - Peak shopping hours
  - Regional demand breakdown
  - AI-driven recommendations

- [x] **12. Order Management & Customer Tracking**
  - View and filter orders
  - Update order status
  - Track shipping
  - Customer profiles

---

## 🗄️ Database Schema Highlights

### Key Models

```prisma
ProductCategory    # Dynamic categories with hierarchy
Product            # Enhanced with SEO, cost tracking
Order              # Orders with payment & tracking
Customer           # Customer profiles with LTV
SiteSettings       # Centralized configuration
Banner             # Scheduled visual assets
NavigationItem     # Dynamic menu structure
ApiIntegration     # Third-party services
MarketingContent   # Campaigns and promotions
AnalyticsSnapshot  # Daily BI snapshots
```

---

## 🔒 Security Features

- ✅ Password-protected admin access
- ✅ Session-based authentication (HTTP-only cookies)
- ✅ Configurable admin password via environment variable
- ✅ API key masking in integrations
- ✅ Confirmation dialogs for destructive actions

---

## 🎨 Design System

### Colors
- Primary: `#3D1A6E` (Purple)
- Secondary: `#E91E8C` (Pink)
- Gradient: `linear-gradient(135deg, #3D1A6E, #E91E8C)`

### UI Components
- Clean, rounded corners (border-radius: 1.5rem)
- Smooth transitions
- Responsive grid layouts
- Loading states
- Toast notifications

---

## 📊 Analytics & Reporting

### Available Metrics

**Customer Insights:**
- Conversion Rate
- Cart Abandonment Rate
- Customer Retention Rate
- Customer Lifetime Value (CLV)
- Repeat Customer Rate

**Product Performance:**
- Best-Selling Products
- Slow-Moving Inventory
- Low Stock Alerts
- Inventory Turnover

**Financial Analytics:**
- Total Revenue
- Gross Profit
- Profit Margin
- Average Order Value
- Revenue by Category
- Monthly Trends

**Behavioral Analytics:**
- Peak Shopping Hours
- Regional Demand
- Traffic Sources
- Purchase Patterns

---

## 🔧 Troubleshooting

### Issue: Prisma Client not generated
```bash
npx prisma generate
```

### Issue: Database connection failed
- Verify `DATABASE_URL` in `.env`
- Ensure PostgreSQL is running
- Check database credentials

### Issue: Admin login not working
- Verify `ADMIN_PASSWORD` in `.env`
- Clear browser cookies
- Restart development server

### Issue: Migration errors
```bash
# Reset database (CAUTION: Deletes all data)
npx prisma migrate reset

# Then re-run setup
npx prisma migrate dev
npm run seed
```

---

## 🚢 Deployment Checklist

### Production Deployment

1. **Environment Configuration**
   ```env
   DATABASE_URL="postgresql://prod-user:prod-pass@prod-host:5432/lifebox"
   ADMIN_PASSWORD="strong_secure_password_here"
   NODE_ENV="production"
   ```

2. **Build Application**
   ```bash
   npm run build
   ```

3. **Run Migrations**
   ```bash
   npx prisma migrate deploy
   ```

4. **Start Production Server**
   ```bash
   npm start
   ```

5. **Setup SSL Certificate** (Recommended)

6. **Configure Backups** for PostgreSQL

7. **Enable Monitoring** (Sentry, LogRocket, etc.)

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## 🎉 You're Ready!

Your comprehensive admin dashboard is now set up and ready to manage your Life Box e-commerce platform dynamically!

**Access your dashboard at:** http://localhost:3000/admin

For detailed feature documentation, see [ADMIN_DASHBOARD_README.md](./ADMIN_DASHBOARD_README.md)

---

**Need Help?** Check the troubleshooting section above or review the code comments in the source files.
