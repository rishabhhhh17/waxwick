'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { useCart } from '@/lib/cart-store';
import { formatINR } from '@/lib/utils';
import type { Product } from '@/lib/products';
import { getMinVariantPaise } from '@/lib/products';

export default function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const min = getMinVariantPaise(product);
  const v0 = product.variants[0];

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    add({
      variantId: v0.id,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      variantLabel: v0.label,
      image: product.images[0],
      unit_price_paise: v0.price_paise,
    });
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'AddToCart', {
        currency: 'INR',
        value: v0.price_paise / 100,
        content_ids: [product.id],
        content_type: 'product',
      });
    }
  }

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] bg-cream-100 rounded-xl2 overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <button
          onClick={quickAdd}
          aria-label={`Add ${product.name} to cart`}
          className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white text-ink shadow-soft flex items-center justify-center hover:bg-ember-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          <Plus className="w-4 h-4" />
        </button>
        {product.compare_at_price && (
          <span className="absolute top-3 left-3 bg-ember-500 text-white text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full">
            Sale
          </span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-[20px] leading-tight text-ink">{product.name}</h3>
          <p className="text-[13px] text-clay-700 mt-0.5 line-clamp-1">{product.tagline}</p>
        </div>
        <div className="text-right shrink-0">
          {product.compare_at_price && (
            <div className="text-[12px] text-clay-700 line-through">{formatINR(product.compare_at_price * 100)}</div>
          )}
          <div className="text-[15px] font-medium text-ink">{formatINR(min)}</div>
        </div>
      </div>
    </Link>
  );
}
