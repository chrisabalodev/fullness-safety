import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/db';

// Force cette route à être dynamique (SSR)
export const dynamic = 'force-dynamic'; // <-- Solution clé

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('category');
    const subCategoryId = searchParams.get('subcategory');

    const products = await getProducts(categoryId || undefined, subCategoryId || undefined);
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}