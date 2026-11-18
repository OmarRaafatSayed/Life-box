# Migration Notes - Admin Dashboard Implementation

## ⚠️ Important: Schema Migration Required

The admin dashboard introduces a **breaking change** to the database schema. The hardcoded `Category` enum has been replaced with a dynamic `ProductCategory` model.

### What Changed

#### Before (Old Schema):
```prisma
enum Category {
  HOME_UTILITIES
  HOUSEWARES
  HOME_TEXTILES
  DECORATIVE_ITEMS
}

model Product {
  category Category  // Enum field
}
```

#### After (New Schema):
```prisma
model ProductCategory {
  id       String
  nameEn   String
  slug     String
  products Product[]
}

model Product {
  categoryId String
  category   ProductCategory @relation(...)  // Relation field
}
```

### Migration Steps

#### Option 1: Fresh Start (Recommended for Development)

If you're starting fresh or can afford to lose existing data:

```bash
# Drop and recreate database
npx prisma migrate reset

# Run seed to populate initial data
npm run seed
```

#### Option 2: Data Preservation Migration

If you have existing products and need to preserve them:

1. **Backup your current database**
   ```bash
   pg_dump lifebox > backup.sql
   ```

2. **Create migration script** (`prisma/migrations/category-to-relation.ts`):

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function migrate() {
  // 1. Create categories based on existing enum values
  const categoryMap = {
    'HOME_UTILITIES': { nameEn: 'Home Utilities', nameAr: 'أدوات المنزل', slug: 'home-utilities' },
    'HOUSEWARES': { nameEn: 'Housewares', nameAr: 'أواني منزلية', slug: 'housewares' },
    'HOME_TEXTILES': { nameEn: 'Home Textiles', nameAr: 'منسوجات منزلية', slug: 'home-textiles' },
    'DECORATIVE_ITEMS': { nameEn: 'Decorative Items', nameAr: 'ديكورات', slug: 'decorative-items' },
  };

  const createdCategories: Record<string, string> = {};

  for (const [enumValue, data] of Object.entries(categoryMap)) {
    const category = await prisma.productCategory.create({
      data: { ...data, isActive: true, displayOrder: Object.keys(createdCategories).length },
    });
    createdCategories[enumValue] = category.id;
  }

  // 2. Fetch all existing products (before schema change)
  const products = await prisma.$queryRaw`SELECT id, category FROM "Product"`;

  // 3. Update products with new categoryId
  for (const product of products as any[]) {
    const categoryId = createdCategories[product.category];
    if (categoryId) {
      await prisma.$executeRaw`UPDATE "Product" SET "categoryId" = ${categoryId} WHERE id = ${product.id}`;
    }
  }

  console.log('✅ Migration completed successfully');
}

migrate();
```

3. **Run the custom migration**
4. **Update schema and run Prisma migration**
   ```bash
   npx prisma migrate dev --name category_to_relation
   ```

### Required Code Updates

The following files need updates to work with the new schema:

#### ❌ Files with Compatibility Issues:
- `src/lib/actions/products.ts` - Update category handling
- `src/lib/actions/orders.ts` - Fix address type compatibility  
- `src/app/[locale]/category/[slug]/page.tsx` - Update category queries
- Any component using the old Category enum

#### ✅ Admin Dashboard (Already Compatible):
- All `/admin/*` pages use the new ProductCategory model
- API routes are fully compatible
- No changes needed for admin functionality

### Quick Fix for Existing Code

To make existing frontend code work temporarily:

```typescript
// src/lib/categoryCompat.ts
export async function getCategoryBySlug(slug: string) {
  return await prisma.productCategory.findUnique({
    where: { slug },
  });
}

export async function getProductsByCategory(categoryId: string) {
  return await prisma.product.findMany({
    where: { categoryId },
  });
}
```

Then update your page.tsx files to use these helpers instead of enum-based queries.

### Testing After Migration

1. **Verify categories exist:**
   ```bash
   npx prisma studio
   # Check ProductCategory table has 4 entries
   ```

2. **Test admin dashboard:**
   - Visit `/admin/categories`
   - Verify categories are listed
   - Try adding a new category

3. **Test product creation:**
   - Visit `/admin/products`
   - Create a new product
   - Verify category selection works

4. **Test frontend:**
   - Visit category pages
   - Verify products display correctly
   - Check filters work

### Rollback Plan

If issues occur:

```bash
# Restore from backup
psql lifebox < backup.sql

# Revert code to previous commit
git checkout HEAD~1 src/
```

### Future Compatibility

The new dynamic category system provides:
- ✅ Add unlimited categories without code changes
- ✅ Hierarchical categories (parent/child)
- ✅ Bilingual category names
- ✅ SEO-friendly category pages
- ✅ Real-time visibility control
- ✅ Custom category ordering

---

## Summary

**Status:** The admin dashboard is **fully functional** with the new schema. The migration is **required** for integrating with existing frontend code.

**Recommendation:** 
- For new projects: Use the new schema from the start
- For existing projects: Follow Option 2 migration steps
- Consider creating a separate admin-only instance initially to test functionality

**Support:** If you encounter issues, refer to the Prisma documentation on handling relation migrations: https://www.prisma.io/docs/guides/migrate/developing-with-prisma-migrate
