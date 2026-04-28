import { notFound } from 'next/navigation';
import { PRODUCTS, getProductBySlug, getRelatedProducts } from '@/lib/products';
import PDPClient from './pdp-client';

export const revalidate = 3600;

export function generateStaticParams() {
  return PRODUCTS.filter((p) => p.is_active).map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProductBySlug(params.slug);
  if (!p) return { title: 'Not found · Wic & Whisper' };
  return {
    title: `${p.name} — ${p.tagline} · Wic & Whisper`,
    description: p.description,
  };
}

export default function PDPPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  const related = getRelatedProducts(params.slug, 4);
  return <PDPClient product={product} related={related} />;
}
