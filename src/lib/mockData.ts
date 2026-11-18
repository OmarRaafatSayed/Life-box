import type { Product } from "@/types";

export const MOCK_PRODUCTS: Product[] = [
  // ── HOME UTILITIES ──────────────────────────────────────────────────────
  {
    id: "hu-001", sku: "LB-HU-001", category: "HOME_UTILITIES", featured: true,
    nameEn: "Professional Kitchen Knife Set", nameAr: "طقم سكاكين المطبخ الاحترافي",
    descEn: "Six forged stainless-steel knives with ergonomic handles. Stays sharp through daily professional use.",
    descAr: "ستة سكاكين مطبخ من الفولاذ المقاوم للصدأ بمقابض مريحة. تبقى حادة طوال الاستخدام اليومي.",
    price: 285, images: ["/images/bestsellers/bestseller-07.jpg", "/images/bestsellers/bestseller-07.jpg"],
    colors: ["Silver", "Black"], sizes: [], stock: 45, rating: 4.8, reviewCount: 128, createdAt: "2024-01-01", updatedAt: "2024-01-01",
  },
  {
    id: "hu-002", sku: "LB-HU-002", category: "HOME_UTILITIES", featured: false,
    nameEn: "Stackable Storage Organizer Set", nameAr: "طقم منظمات تخزين قابلة للتكديس",
    descEn: "Six modular polypropylene bins that lock together. Dishwasher-safe with an easy-grip handle.",
    descAr: "ستة صناديق معيارية تُقفل معًا. آمنة في غسالة الأطباق مع مقبض سهل الإمساك.",
    price: 95, images: ["/images/bestsellers/bestseller-06.jpg", "/images/bestsellers/bestseller-06.jpg"],
    colors: ["White", "Grey", "Beige"], sizes: ["Small", "Medium", "Large"], stock: 60, rating: 4.5, reviewCount: 89, createdAt: "2024-01-02", updatedAt: "2024-01-02",
  },
  {
    id: "hu-003", sku: "LB-HU-003", category: "HOME_UTILITIES", featured: false,
    nameEn: "Stainless Steel Measuring Cup Set", nameAr: "طقم أكواب قياس من الفولاذ",
    descEn: "Seven nested measuring cups in heavy-gauge stainless steel with engraved markings.",
    descAr: "سبعة أكواب قياس متداخلة من الفولاذ الثقيل بعلامات محفورة.",
    price: 55, images: ["/images/bestsellers/bestseller-05.jpg", "/images/bestsellers/bestseller-05.jpg"],
    colors: ["Silver"], sizes: [], stock: 75, rating: 4.6, reviewCount: 54, createdAt: "2024-01-03", updatedAt: "2024-01-03",
  },
  {
    id: "hu-004", sku: "LB-HU-004", category: "HOME_UTILITIES", featured: false,
    nameEn: "Foldable Dish Drying Rack", nameAr: "حامل تجفيف الأطباق القابل للطي",
    descEn: "Rust-proof coated steel wire rack with removable drip tray. Folds flat in seconds.",
    descAr: "حامل من السلك الفولاذي المطلي المقاوم للصدأ مع صينية قابلة للإزالة.",
    price: 75, images: ["/images/bestsellers/bestseller-01.jpg", "/images/bestsellers/bestseller-01.jpg"],
    colors: ["Silver", "Matte Black"], sizes: [], stock: 40, rating: 4.3, reviewCount: 38, createdAt: "2024-01-04", updatedAt: "2024-01-04",
  },
  {
    id: "hu-005", sku: "LB-HU-005", category: "HOME_UTILITIES", featured: false,
    nameEn: "Multi-Surface Cleaning Spray", nameAr: "بخاخ تنظيف متعدد الأسطح",
    descEn: "Plant-based formula that cuts through grease on any hard surface. Fresh citrus scent.",
    descAr: "تركيبة نباتية تقضي على الشحوم على أي سطح صلب بعطر الحمضيات.",
    price: 35, images: ["/images/bestsellers/bestseller-06.jpg", "/images/bestsellers/bestseller-06.jpg"],
    colors: ["Green", "Blue"], sizes: ["250ml", "500ml"], stock: 90, rating: 4.2, reviewCount: 71, createdAt: "2024-01-05", updatedAt: "2024-01-05",
  },
  // ── HOUSEWARES ───────────────────────────────────────────────────────────
  {
    id: "hw-001", sku: "LB-HW-001", category: "HOUSEWARES", featured: true,
    nameEn: "Artisan Ceramic Mug Set", nameAr: "طقم أكواب سيراميك حرفية",
    descEn: "Four hand-glazed 350 ml ceramic mugs with C-shaped handles and a speckled glaze finish.",
    descAr: "أربعة أكواب سيراميك 350 مل مطلية يدويًا بطلاء مرقط فريد.",
    price: 120, images: ["/images/bestsellers/bestseller-03.jpg", "/images/bestsellers/bestseller-03.jpg"],
    colors: ["Terracotta", "Sage Green", "Sky Blue", "Cream"], sizes: [], stock: 55, rating: 4.9, reviewCount: 165, createdAt: "2024-01-06", updatedAt: "2024-01-06",
  },
  {
    id: "hw-002", sku: "LB-HW-002", category: "HOUSEWARES", featured: false,
    nameEn: "Non-Stick Marble Cookware Set", nameAr: "طقم قدور رخامي غير لاصق",
    descEn: "Five-piece set with marble-coated interiors that heat evenly and clean with one wipe.",
    descAr: "طقم خمس قطع بداخل رخامي يسخن بالتساوي وينظف بمسحة واحدة.",
    price: 450, images: ["/images/bestsellers/bestseller-01.jpg", "/images/bestsellers/bestseller-01.jpg"],
    colors: ["Marble White", "Graphite"], sizes: [], stock: 20, rating: 4.9, reviewCount: 203, createdAt: "2024-01-07", updatedAt: "2024-01-07",
  },
  {
    id: "hw-003", sku: "LB-HW-003", category: "HOUSEWARES", featured: false,
    nameEn: "Borosilicate Glass Bowl Set", nameAr: "طقم أوعية زجاج البورسيليكات",
    descEn: "Three nesting mixing bowls with pour spout and measurement markings. Freezer-to-oven safe.",
    descAr: "ثلاثة أوعية خلط متداخلة بفوهة سكب وعلامات قياس. تتحمل الفريزر والفرن.",
    price: 145, images: ["/images/bestsellers/bestseller-06.jpg", "/images/bestsellers/bestseller-06.jpg"],
    colors: ["Clear"], sizes: ["500ml", "1L", "2L"], stock: 35, rating: 4.6, reviewCount: 89, createdAt: "2024-01-08", updatedAt: "2024-01-08",
  },
  {
    id: "hw-004", sku: "LB-HW-004", category: "HOUSEWARES", featured: false,
    nameEn: "Acacia Wood Cutting Board", nameAr: "لوح تقطيع من خشب الأكاسيا",
    descEn: "End-grain acacia board gentle on knives with juice grooves along the perimeter.",
    descAr: "لوح خشب أكاسيا لطيف على السكاكين مع أخاديد عصير على المحيط.",
    price: 155, images: ["/images/bestsellers/bestseller-08.jpg", "/images/bestsellers/bestseller-08.jpg"],
    colors: ["Natural Wood"], sizes: ["Medium", "Large"], stock: 30, rating: 4.7, reviewCount: 112, createdAt: "2024-01-09", updatedAt: "2024-01-09",
  },
  {
    id: "hw-005", sku: "LB-HW-005", category: "HOUSEWARES", featured: false,
    nameEn: "Carbon Steel Baking Tray", nameAr: "صينية خبز من الفولاذ الكربوني",
    descEn: "Micro-textured surface promotes even browning. Rolled edges prevent warping at high heat.",
    descAr: "سطح مُنقَّش يعزز التحمير المتساوي وحواف ملفوفة تمنع التشوه.",
    price: 85, images: ["/images/bestsellers/bestseller-05.jpg", "/images/bestsellers/bestseller-05.jpg"],
    colors: ["Dark Grey"], sizes: ["30x20cm", "40x30cm"], stock: 50, rating: 4.5, reviewCount: 61, createdAt: "2024-01-10", updatedAt: "2024-01-10",
  },
  // ── HOME TEXTILES ────────────────────────────────────────────────────────
  {
    id: "ht-001", sku: "LB-HT-001", category: "HOME_TEXTILES", featured: true,
    nameEn: "Egyptian Cotton Bath Towel Set", nameAr: "طقم مناشف القطن المصري",
    descEn: "Four ultra-plush bath towels from long-staple Egyptian cotton. Stays fluffy after hundreds of washes.",
    descAr: "أربعة مناشف استحمام من القطن المصري طويل التيلة. تبقى ناعمة بعد مئات الغسيل.",
    price: 180, images: ["/images/bestsellers/bestseller-02.jpg", "/images/bestsellers/bestseller-02.jpg"],
    colors: ["White", "Sand", "Sage", "Navy"], sizes: ["Bath", "Hand", "Face"], stock: 65, rating: 4.8, reviewCount: 190, createdAt: "2024-01-11", updatedAt: "2024-01-11",
  },
  {
    id: "ht-002", sku: "LB-HT-002", category: "HOME_TEXTILES", featured: false,
    nameEn: "Percale Bed Sheet Set", nameAr: "طقم ملاءات سرير بيركيل",
    descEn: "400-thread-count percale set: fitted sheet, flat sheet, two pillowcases. Fits mattresses up to 40 cm.",
    descAr: "طقم بيركيل 400 خيط: ملاءة مشدودة ومسطحة وكيسَي وسادة. يناسب المراتب حتى 40 سم.",
    price: 220, images: ["/images/bestsellers/bestseller-05.jpg", "/images/bestsellers/bestseller-05.jpg"],
    colors: ["White", "Ivory", "Stone Grey", "Dusty Rose"], sizes: ["Single", "Double", "Queen", "King"], stock: 40, rating: 4.7, reviewCount: 145, createdAt: "2024-01-12", updatedAt: "2024-01-12",
  },
  {
    id: "ht-003", sku: "LB-HT-003", category: "HOME_TEXTILES", featured: false,
    nameEn: "Linen Blackout Curtain Pair", nameAr: "زوج ستائر كتان معتمة",
    descEn: "Two fully-lined blackout curtains blocking 99% of light with a triple-pinch pleat heading.",
    descAr: "ستارتان معتمتان تحجبان 99% من الضوء مع رأس ثني ثلاثي.",
    price: 310, images: ["/images/bestsellers/bestseller-03.jpg", "/images/bestsellers/bestseller-03.jpg"],
    colors: ["Ecru", "Charcoal", "Forest Green", "Blush"], sizes: ["140x240cm", "140x270cm"], stock: 25, rating: 4.5, reviewCount: 78, createdAt: "2024-01-13", updatedAt: "2024-01-13",
  },
  {
    id: "ht-004", sku: "LB-HT-004", category: "HOME_TEXTILES", featured: false,
    nameEn: "Chunky Knit Throw Blanket", nameAr: "بطانية محاكة بغرزة سميكة",
    descEn: "Hand-loomed 100% merino wool throw. 130×170 cm for lightweight all-year warmth.",
    descAr: "بطانية منسوجة يدويًا 100% صوف ميرينو. 130×170 سم لدفء خفيف طوال العام.",
    price: 195, images: ["/images/bestsellers/bestseller-04.jpg", "/images/bestsellers/bestseller-04.jpg"],
    colors: ["Oatmeal", "Rust", "Slate Blue"], sizes: [], stock: 30, rating: 4.9, reviewCount: 157, createdAt: "2024-01-14", updatedAt: "2024-01-14",
  },
  {
    id: "ht-005", sku: "LB-HT-005", category: "HOME_TEXTILES", featured: false,
    nameEn: "Embroidered Table Runner", nameAr: "مفرش طاولة مطرز",
    descEn: "45×180 cm 100% cotton with hand-embroidered geometric patterns in metallic thread.",
    descAr: "مفرش 45×180 سم قطن 100% مع أنماط هندسية مطرزة بخيط معدني.",
    price: 65, images: ["/images/bestsellers/bestseller-07.jpg", "/images/bestsellers/bestseller-07.jpg"],
    colors: ["Ivory", "Gold", "Silver"], sizes: [], stock: 55, rating: 4.4, reviewCount: 43, createdAt: "2024-01-15", updatedAt: "2024-01-15",
  },
  // ── DECORATIVE ITEMS ─────────────────────────────────────────────────────
  {
    id: "di-001", sku: "LB-DI-001", category: "DECORATIVE_ITEMS", featured: true,
    nameEn: "Handblown Glass Vase", nameAr: "مزهرية زجاج منفوخ يدويًا",
    descEn: "Asymmetric handblown vase in gradient amber-to-clear. Each piece is unique.",
    descAr: "مزهرية منفوخة يدويًا بتدرج من العنبر إلى الشفاف. كل قطعة فريدة.",
    price: 165, images: ["/images/bestsellers/bestseller-02.jpg", "/images/bestsellers/bestseller-02.jpg"],
    colors: ["Amber", "Cobalt Blue", "Smoke Grey"], sizes: [], stock: 20, rating: 4.8, reviewCount: 94, createdAt: "2024-01-16", updatedAt: "2024-01-16",
  },
  {
    id: "di-002", sku: "LB-DI-002", category: "DECORATIVE_ITEMS", featured: false,
    nameEn: "Silent Sweep Wall Clock", nameAr: "ساعة حائط صامتة",
    descEn: "30 cm diameter clock with silent sweep movement. Minimalist brushed-brass dial.",
    descAr: "ساعة حائط 30 سم بحركة صامتة ووجه نحاسي بسيط.",
    price: 125, images: ["/images/bestsellers/bestseller-04.jpg", "/images/bestsellers/bestseller-04.jpg"],
    colors: ["Brass", "Matte Black", "Rose Gold"], sizes: [], stock: 35, rating: 4.6, reviewCount: 110, createdAt: "2024-01-17", updatedAt: "2024-01-17",
  },
  {
    id: "di-003", sku: "LB-DI-003", category: "DECORATIVE_ITEMS", featured: false,
    nameEn: "Gallery Wall Photo Frame Set", nameAr: "طقم براويز صور معرض",
    descEn: "Five solid oak frames in coordinating sizes for a gallery wall. Real glass fronts.",
    descAr: "خمسة براويز بلوط بأحجام متناسقة لجدار معرض مع واجهات زجاجية.",
    price: 210, images: ["/images/bestsellers/bestseller-08.jpg", "/images/bestsellers/bestseller-08.jpg"],
    colors: ["Natural Oak", "Walnut", "Painted White"], sizes: [], stock: 28, rating: 4.7, reviewCount: 72, createdAt: "2024-01-18", updatedAt: "2024-01-18",
  },
  {
    id: "di-004", sku: "LB-DI-004", category: "DECORATIVE_ITEMS", featured: false,
    nameEn: "Geometric Candle Holder Trio", nameAr: "ثلاثي حاملات شمع هندسية",
    descEn: "Three graduated-height candle holders with faceted antique brass finish.",
    descAr: "ثلاثة حاملات شمع بارتفاعات متدرجة بتشطيب نحاسي عتيق.",
    price: 95, images: ["/images/bestsellers/bestseller-04.jpg", "/images/bestsellers/bestseller-04.jpg"],
    colors: ["Antique Brass", "Gunmetal", "Copper"], sizes: [], stock: 42, rating: 4.5, reviewCount: 58, createdAt: "2024-01-19", updatedAt: "2024-01-19",
  },
  {
    id: "di-005", sku: "LB-DI-005", category: "DECORATIVE_ITEMS", featured: true,
    nameEn: "Textured Ceramic Plant Pot", nameAr: "أصيص نباتات سيراميك مزخرف",
    descEn: "Hand-textured 15 cm matte ceramic pot with drainage hole and matching saucer.",
    descAr: "أصيص سيراميك مطفي 15 سم منقوش يدويًا مع ثقب تصريف وطبق مطابق.",
    price: 55, images: ["/images/bestsellers/bestseller-08.jpg", "/images/bestsellers/bestseller-08.jpg"],
    colors: ["Terracotta", "Sage", "Cream", "Black"], sizes: ["Small", "Medium"], stock: 70, rating: 4.6, reviewCount: 136, createdAt: "2024-01-20", updatedAt: "2024-01-20",
  },
];

export const FEATURED_PRODUCTS = MOCK_PRODUCTS.filter((p) => p.featured);

export function getProductsByCategory(category: string) {
  const map: Record<string, string> = {
    "home-utilities": "HOME_UTILITIES",
    "housewares": "HOUSEWARES",
    "home-textiles": "HOME_TEXTILES",
    "decorative-items": "DECORATIVE_ITEMS",
  };
  const cat = map[category] ?? category.toUpperCase().replace(/-/g, "_");
  return MOCK_PRODUCTS.filter((p) => p.category === cat);
}

export function getProductById(id: string) {
  return MOCK_PRODUCTS.find((p) => p.id === id) ?? null;
}

export function searchProducts(query: string) {
  const q = query.toLowerCase();
  return MOCK_PRODUCTS.filter(
    (p) =>
      p.nameEn.toLowerCase().includes(q) ||
      p.nameAr.includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}
