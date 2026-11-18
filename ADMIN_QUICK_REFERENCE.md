# Admin Dashboard - Quick Reference Guide

## 🚪 Access

**URL:** `http://localhost:3000/admin`  
**Default Password:** `admin123`

---

## 📋 Feature Overview

| Feature | Location | Quick Actions |
|---------|----------|---------------|
| **Dashboard** | `/admin` | View stats, recent orders, alerts |
| **Categories** | `/admin/categories` | Add, Edit, Delete, Reorder, Toggle visibility |
| **Products** | `/admin/products` | Manage inventory, pricing, SEO |
| **Banners** | `/admin/banners` | Upload, Schedule, Toggle display |
| **Navigation** | `/admin/navigation` | Customize menu structure |
| **Branding** | `/admin/branding` | Logo, colors (see Settings) |
| **Visibility** | `/admin/visibility` | Quick toggle hub |
| **Integrations** | `/admin/integrations` | Configure APIs, payments, shipping |
| **Settings** | `/admin/settings` | Store config, taxes, contact |
| **Marketing** | `/admin/marketing` | Popups, banners, campaigns |
| **Financials** | `/admin/financials` | Revenue, profit, exports |
| **Best Sellers** | `/admin/best-sellers` | Top products, low stock |
| **Analytics** | `/admin/analytics` | BI insights, forecasting |
| **Orders** | `/admin/orders` | Manage, track, update status |
| **Customers** | `/admin/customers` | View profiles, LTV |

---

## ⚡ Common Tasks

### Add a New Category
1. Go to **Categories** → Click **Add Category**
2. Enter English & Arabic names
3. Set slug (e.g., `home-decor`)
4. Toggle **Active** checkbox
5. Click **Save Category**

### Upload a Banner
1. Go to **Banners** → Click **Add Banner**
2. Enter image URL (or upload to CDN first)
3. Set title, placement (hero/sidebar/popup)
4. Optional: Set start/end dates
5. Toggle **Active** → Click **Save Banner**

### Configure Payment Gateway
1. Go to **Integrations**
2. Find your gateway (Stripe, Paymob, Fawry)
3. Toggle **Enable** switch
4. Enter API Key & Secret
5. Add Webhook URL (if applicable)
6. Click **Save Changes**

### Update Site Settings
1. Go to **Settings**
2. Update store name, logo, colors
3. Set currency, tax rate, shipping fee
4. Add contact info, social media
5. Click **Save Changes** at top

### View Financial Reports
1. Go to **Financials**
2. Select date range (7d, 30d, 90d, 1y)
3. View revenue, profit, breakdown
4. Click **Export Report** for CSV

### Check Low Stock Products
1. Go to **Best Sellers**
2. Scroll to **Low Stock Alert** section
3. Click **Restock Now** for quick edit
4. Update stock quantity

### Launch Marketing Campaign
1. Go to **Marketing** → Click **Add Content**
2. Choose type: Popup, Banner, or Announcement
3. Enter bilingual content
4. Set schedule (start/end dates)
5. Toggle **Active** → Click **Save**

---

## 🎯 Dashboard Widgets

### Main Dashboard Cards
- **Total Revenue** - with % change indicator
- **Total Orders** - with trend arrow
- **Total Products** - inventory count
- **Total Customers** - user base size

### Alert Cards
- **Pending Orders** - needs processing
- **Low Stock Products** - restock alerts

### Recent Activity
- **Recent Orders** table with status
- **Top Products** by sales volume

---

## 🔍 Search & Filter

### Products
- Search by name, SKU
- Filter by category, price range
- Sort by date, sales, stock

### Orders
- Filter by status (Pending, Shipped, etc.)
- Search by order number, customer
- Date range filtering

### Customers
- Search by name, email
- Sort by lifetime value, order count

---

## 💡 Tips & Tricks

### Performance Tips
- Use **Low Stock Alerts** to prevent stockouts
- Check **Peak Shopping Hours** to schedule promotions
- Monitor **Cart Abandonment** rate to optimize checkout
- Track **Best Sellers** to focus inventory

### Marketing Tips
- Schedule banners for peak hours
- Use popups for limited-time offers
- Launch campaigns during high-traffic periods
- Target regions with highest demand

### Security Tips
- Change default admin password immediately
- Use strong passwords (16+ characters)
- Log out when not in use
- Monitor activity logs (coming in Phase 2)

### SEO Tips
- Add SEO metadata to products
- Use descriptive category slugs
- Upload high-quality banner images
- Keep product descriptions detailed

---

## ⚠️ Important Notes

### Before Making Changes
- ✅ Backup database regularly
- ✅ Test changes in dev environment first
- ✅ Understand impact of visibility toggles
- ✅ Confirm before deleting (irreversible!)

### Data Integrity
- Categories with products cannot be deleted
- Orders are linked to customers
- Products require a valid category
- Settings changes apply site-wide

### Real-Time Updates
- All changes are **instant** (no deploy needed)
- Frontend reflects updates immediately
- Database persistence guaranteed
- Cache may need clearing (browser)

---

## 🆘 Troubleshooting

### Can't Login
- Verify password in `.env` file
- Clear browser cookies
- Restart development server
- Check console for errors

### Changes Not Appearing
- Hard refresh browser (Ctrl+Shift+R)
- Check if item is set to "Active"
- Verify database connection
- Check browser console

### API Integration Not Working
- Verify API keys are correct
- Check webhook URLs
- Ensure integration is enabled
- Test with provider's sandbox

### Database Errors
- Run `npx prisma generate`
- Check `DATABASE_URL` in `.env`
- Ensure PostgreSQL is running
- Try `npx prisma migrate reset`

---

## 📞 Need Help?

1. Check the [SETUP_GUIDE.md](./SETUP_GUIDE.md)
2. Read [ADMIN_DASHBOARD_README.md](./ADMIN_DASHBOARD_README.md)
3. Review code comments in source files
4. Check browser console for errors
5. Verify database connection

---

## 🔄 Maintenance Tasks

### Daily
- ☐ Check pending orders
- ☐ Review low stock alerts
- ☐ Monitor dashboard stats

### Weekly
- ☐ Review best-selling products
- ☐ Analyze financial reports
- ☐ Check marketing campaign performance
- ☐ Update inventory levels

### Monthly
- ☐ Review customer analytics
- ☐ Export financial reports
- ☐ Backup database
- ☐ Update API integrations
- ☐ Review and optimize SEO

---

## 🎨 Customization

### Brand Colors
1. Settings → Brand Colors
2. Click color picker
3. Choose custom color or enter hex code
4. Changes apply immediately

### Store Identity
1. Settings → Store Identity
2. Update logo/favicon URLs
3. Enter store name (EN/AR)
4. Save changes

### Layout
1. Navigation → Manage menu items
2. Banners → Control visual layout
3. Visibility → Toggle sections on/off

---

## 📊 Key Metrics to Track

### Financial
- Monthly revenue growth
- Profit margin percentage
- Average order value
- Customer acquisition cost

### Product
- Inventory turnover rate
- Best-selling items
- Slow-moving stock
- Product view-to-purchase ratio

### Customer
- Conversion rate
- Cart abandonment rate
- Customer retention rate
- Lifetime value

### Marketing
- Campaign click-through rate
- Banner engagement
- Traffic source performance
- Regional demand

---

## ✅ Best Practices

1. **Regular Backups** - Automate database backups
2. **Monitor Analytics** - Check dashboard daily
3. **Update Inventory** - Keep stock levels accurate
4. **Test Changes** - Preview before publishing
5. **Optimize Images** - Compress before upload
6. **Track Metrics** - Use data for decisions
7. **Respond Quickly** - Process orders promptly
8. **Maintain SEO** - Update metadata regularly
9. **Secure Access** - Use strong passwords
10. **Document Changes** - Keep notes on updates

---

**Quick Access:** Bookmark `http://localhost:3000/admin` for easy access!

**Pro Tip:** Use browser bookmarks to save frequently used admin pages.
