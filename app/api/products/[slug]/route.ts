import { NextResponse } from 'next/server';
import { PRODUCTS, getProductBySlug } from '@/lib/products';

export const dynamic = 'force-static';
export const revalidate = 3600;

export function generateStaticParams() {
  return PRODUCTS.filter((p) => p.is_active).map((p) => ({ slug: p.slug }));
}

export function GET(_req: Request, { params }: { params: { slug: string } }) {
  const p = getProductBySlug(params.slug);
  if (!p) return NextResponse.json({ error: 'not_found' }, { status: 404 });
  return NextResponse.json({ product: p });
}
