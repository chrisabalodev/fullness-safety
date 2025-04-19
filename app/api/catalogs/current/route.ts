import { NextResponse } from 'next/server';
import db from '@/data/db.json';

export async function GET() {
  try {
    const currentCatalog = db.catalogs.find(catalog => catalog.metadata.isCurrent);
    
    if (!currentCatalog) {
      return NextResponse.json(
        { error: 'No current catalog found' },
        { status: 404 }
      );
    }

    return NextResponse.json(currentCatalog);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch current catalog' },
      { status: 500 }
    );
  }
}