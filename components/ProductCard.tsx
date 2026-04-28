'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Plus, Star } from 'lucide-react';
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
      <div className="relative aspect-[4/5] bg-cream-100 rounded-[22px] overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width:1024px) 22vw, (min-width:640px) 33vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.compare_at_price && (
            <span className="bg-ember-500 text-white text-[10px] font-semibold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full">
              Sale
            </span>
          )}
          {product.is_featured && !product.compare_at_price && (
            <span className="bg-cream-50/95 backdrop-blur text-ink text-[10px] font-semibold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full">
              Bestseller
            </span>
          )}
        </div>

        {/* Quick add */}
        <button
          onClick={quickAdd}
          aria-label={`Add ${product.name} to cart`}
          className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-cream-50/95 backdrop-blur text-ink shadow-soft flex items-center justify-center hover:bg-ember-500 hover:text-white hover:scale-105 transition-all duration-200 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 focus:opacity-100 focus:translate-y-0"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[11.5px] text-clay-700">
            <Star className="w-3 h-3 fill-ember-500 text-ember-500" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-clay-700/70">({product.rating_count})</span>
          </div>
          <h3 className="mt-1 font-display text-[20px] md:text-[22px] leading-tight text-ink">
            {product.name}
          </h3>
          <p className="text-[13px] text-clay-700 mt-0.5 line-clamp-1 italic">{product.tagline}</p>
        </div>
        <div className="text-right shrink-0">
          {product.compare_at_price && (
            <div className="text-[12px] text-clay-700 line-through">
              {formatINR(product.compare_at_price * 100)}
            </div>
          )}
          <div className="text-[15px] font-semibold text-ink">{formatINR(min)}</div>
        </div>
      </div>
    </Link>
  );
}
