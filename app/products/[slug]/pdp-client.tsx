'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Check, ShieldCheck, Truck, RotateCcw, Minus, Plus } from 'lucide-react';
import { useCart } from '@/lib/cart-store';
import { formatINR } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/lib/products';

export default function PDPClient({ product, related }: { product: Product; related: Product[] }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);
  const add = useCart((s) => s.add);
  const variant = product.variants.find((v) => v.id === variantId)!;

  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_ids: [product.id],
        content_name: product.name,
        content_type: 'product',
        currency: 'INR',
        value: variant.price_paise / 100,
      });
    }
  }, [product.id, product.name, variant.price_paise]);

  function onAdd() {
    add(
      {
        variantId: variant.id,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        variantLabel: variant.label,
        image: product.images[0],
        unit_price_paise: variant.price_paise,
      },
      qty,
    );
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'AddToCart', {
        currency: 'INR',
        value: (variant.price_paise * qty) / 100,
        content_ids: [product.id],
        content_type: 'product',
        num_items: qty,
      });
    }
  }

  return (
    <div className="bg-cream-50 pb-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-6 text-[13px] text-clay-700">
        <Link href="/products" className="hover:text-ink">Catalogue</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8 mt-6 grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* GALLERY */}
        <div>
          <div className="relative aspect-square bg-white rounded-xl2 overflow-hidden border border-cream-200">
            <Image
              src={product.images[imgIdx]}
              alt={product.name}
              fill
              priority
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 grid grid-cols-5 gap-3">
              {product.images.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => setImgIdx(i)}
                  className={`relative aspect-square rounded-md overflow-hidden border ${
                    imgIdx === i ? 'border-ember-500' : 'border-cream-200'
                  }`}
                >
                  <Image src={src} alt="" fill sizes="20vw" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DETAILS */}
        <div className="lg:pt-4">
          <div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-ember-600">
            <span>{label(product.category)}</span>
          </div>
          <h1 className="mt-3 font-display text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.015em] text-ink">{product.name}</h1>
          <p className="mt-2 italic text-clay-700 text-[17px]">{product.tagline}</p>

          <div className="mt-4 flex items-center gap-2 text-[14px]">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'fill-ember-500 text-ember-500' : 'text-cream-200'}`} />
              ))}
            </div>
            <span className="text-ink">{product.rating.toFixed(1)}</span>
            <span className="text-clay-700">({product.rating_count})</span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <div className="font-display text-3xl text-ink">{formatINR(variant.price_paise)}</div>
            {product.compare_at_price && (
              <div className="text-clay-700 line-through">{formatINR(product.compare_at_price * 100)}</div>
            )}
            <span className="text-[12px] uppercase tracking-[0.18em] text-success">In stock</span>
          </div>

          <p className="mt-6 text-[15.5px] leading-[1.7] text-clay-700">{product.description}</p>

          {product.variants.length > 1 && (
            <div className="mt-7">
              <div className="text-[12px] uppercase tracking-[0.18em] text-clay-700 mb-2">Size</div>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setVariantId(v.id)}
                    className={`px-4 py-2.5 rounded-full text-[13px] border transition-colors ${
                      v.id === variantId ? 'border-ink bg-ink text-cream-50' : 'border-cream-200 bg-white hover:border-ink/40'
                    }`}
                  >
                    {v.label} · {formatINR(v.price_paise)}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-3">
            <div className="inline-flex items-center border border-cream-200 rounded-full bg-white">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-11 h-11 flex items-center justify-center hover:bg-cream-100 rounded-l-full" aria-label="Decrease">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-11 h-11 flex items-center justify-center hover:bg-cream-100 rounded-r-full" aria-label="Increase">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button onClick={onAdd} className="btn-primary flex-1">
              Add to cart · {formatINR(variant.price_paise * qty)}
            </button>
          </div>

          {product.notes && (
            <div className="mt-10 grid grid-cols-3 gap-3 text-center">
              {(['top', 'heart', 'base'] as const).map((k) =>
                product.notes![k] && (
                  <div key={k} className="bg-white border border-cream-200 rounded-md p-4">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-clay-700">{k} notes</div>
                    <div className="mt-1 text-[14px] text-ink">{product.notes![k]!.join(', ')}</div>
                  </div>
                ),
              )}
            </div>
          )}

          <div className="mt-8 grid grid-cols-2 gap-3">
            {product.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2 text-[14px] text-clay-700">
                <Check className="w-4 h-4 text-ember-500 shrink-0" /> {h}
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 text-[12px] text-clay-700">
            <div className="flex items-start gap-2"><Truck className="w-4 h-4 mt-0.5 text-ember-500" /><span>Ships in 48 hrs across India</span></div>
            <div className="flex items-start gap-2"><RotateCcw className="w-4 h-4 mt-0.5 text-ember-500" /><span>Easy 7-day returns</span></div>
            <div className="flex items-start gap-2"><ShieldCheck className="w-4 h-4 mt-0.5 text-ember-500" /><span>Toxin-free, soy-only</span></div>
          </div>

          <details className="mt-10 group border-t border-cream-200 pt-6">
            <summary className="flex items-center justify-between cursor-pointer text-ink">
              <span className="font-medium">Ingredients &amp; care</span>
              <span className="text-clay-700 group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
            </summary>
            <ul className="mt-3 text-[14px] text-clay-700 space-y-1.5">
              {product.ingredients.map((i) => <li key={i}>· {i}</li>)}
              <li className="pt-2">Trim wick to 5 mm before each burn. Burn for at least 1 hr on first light.</li>
            </ul>
          </details>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <h2 className="font-display text-[28px] md:text-[36px] text-ink">You might also like</h2>
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function label(c: string) {
  return c
    .split('-')
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join(' ');
}
