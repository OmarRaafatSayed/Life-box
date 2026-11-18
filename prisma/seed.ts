import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create default categories
  const categories = [
    {
      nameEn: 'Home Utilities',
      nameAr: 'أدوات المنزل',
      slug: 'home-utilities',
      descEn: 'Essential home utility products',
      descAr: 'منتجات أساسية للمنزل',
      isActive: true,
      displayOrder: 0,
    },
    {
      nameEn: 'Housewares',
      nameAr: 'أواني منزلية',
      slug: 'housewares',
      descEn: 'Quality housewares and kitchen items',
      descAr: 'أواني منزلية ومطبخية عالية الجودة',
      isActive: true,
      displayOrder: 1,
    },
    {
      nameEn: 'Home Textiles',
      nameAr: 'منسوجات منزلية',
      slug: 'home-textiles',
      descEn: 'Comfortable and stylish home textiles',
      descAr: 'منسوجات منزلية مريحة وأنيقة',
      isActive: true,
      displayOrder: 2,
    },
    {
      nameEn: 'Decorative Items',
      nameAr: 'ديكورات',
      slug: 'decorative-items',
      descEn: 'Beautiful decorative items for your home',
      descAr: 'ديكورات جميلة لمنزلك',
      isActive: true,
      displayOrder: 3,
    },
  ];

  console.log('📁 Creating categories...');
  for (const category of categories) {
    await prisma.productCategory.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  // Create default site settings
  console.log('⚙️  Creating site settings...');
  await prisma.siteSettings.upsert({
    where: { id: 'site_settings' },
    update: {},
    create: {
      id: 'site_settings',
      storeName: 'Life Box',
      storeNameAr: 'صندوق الحياة',
      primaryColor: '#3D1A6E',
      secondaryColor: '#E91E8C',
      currency: 'EGP',
      currencySymbol: '£',
      taxRate: 0,
      shippingFee: 50,
      freeShippingMin: 500,
      maintenanceMode: false,
      contactEmail: 'info@lifebox.com',
      contactPhone: '+20 123 456 7890',
      contactAddress: 'Cairo, Egypt',
    },
  });

  // Create default API integrations
  console.log('🔌 Creating API integrations...');
  const integrations = [
    { name: 'stripe', displayName: 'Stripe Payment Gateway' },
    { name: 'paymob', displayName: 'Paymob (Egypt)' },
    { name: 'fawry', displayName: 'Fawry (Egypt)' },
    { name: 'whatsapp', displayName: 'WhatsApp Business API' },
    { name: 'shipping', displayName: 'Shipping & Fulfillment' },
  ];

  for (const integration of integrations) {
    await prisma.apiIntegration.upsert({
      where: { name: integration.name },
      update: {},
      create: integration,
    });
  }

  // Create sample banner
  console.log('🖼️  Creating sample banner...');
  await prisma.banner.create({
    data: {
      titleEn: 'Welcome to Life Box',
      titleAr: 'مرحباً بك في صندوق الحياة',
      descEn: 'Quality home products at your fingertips',
      descAr: 'منتجات منزلية عالية الجودة في متناول يدك',
      image: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=1200',
      isActive: true,
      displayOrder: 0,
      placement: 'hero',
    },
  });

  // Create sample customer
  console.log('👤 Creating sample customer...');
  const customer = await prisma.customer.create({
    data: {
      email: 'customer@example.com',
      fullName: 'Ahmed Hassan',
      phone: '+20 123 456 7890',
    },
  });

  console.log('✅ Database seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`  - ${categories.length} categories created`);
  console.log(`  - ${integrations.length} API integrations configured`);
  console.log('  - 1 sample banner created');
  console.log('  - 1 sample customer created');
  console.log('  - Site settings initialized');
  console.log('\n🎉 Your admin dashboard is ready to use!');
  console.log('   Visit: http://localhost:3000/admin');
  console.log('   Default password: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
