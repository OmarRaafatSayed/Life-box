import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.productCategory.findMany({
      orderBy: { displayOrder: "asc" },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    return NextResponse.json({
      categories: categories.map((cat) => ({
        ...cat,
        productCount: cat._count.products,
      })),
    });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nameEn, nameAr, slug, descEn, descAr, isActive, image, icon, parentId } = body;

    // Get the highest display order
    const maxOrder = await prisma.productCategory.findMany({
      orderBy: { displayOrder: "desc" },
      take: 1,
    });

    const displayOrder = maxOrder.length > 0 ? maxOrder[0].displayOrder + 1 : 0;

    const category = await prisma.productCategory.create({
      data: {
        nameEn,
        nameAr,
        slug,
        descEn,
        descAr,
        isActive: isActive ?? true,
        displayOrder,
        image,
        icon,
        parentId,
      },
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    console.error("Failed to create category:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
