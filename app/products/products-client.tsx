'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS, CATEGORIES } from '@/lib/products';
import { cn } from '@/lib/utils';

type Sort = 'featured' | 'price-asc' | 'price-desc';

export default function ProductsClient() {
  const search = useSearchParams();
  const initial = search.get('c') ?? 'all';
  const [cat, setCat] = useState<string>(initial);
  const [sort, setSort] = useState<Sort>('featured');

  const products = useMemo(() => {
    let xs = PRODUCTS.filter((p) => p.is_active);
    if (cat !== 'all') xs = xs.filter((p) => p.category === cat);
    if (sort === 'price-asc') xs = [...xs].sort((a, b) => Math.min(...a.variants.map((v) => v.price_paise)) - Math.min(...b.variants.map((v) => v.price_paise)));
    if (sort === 'price-desc') xs = [...xs].sort((a, b) => Math.min(...b.variants.map((v) => v.price_paise)) - Math.min(...a.variants.map((v) => v.price_paise)));
    if (sort === 'featured') xs = [...xs].sort((a, b) => Number(b.is_featured) - Number(a.is_featured));
    return xs;
  }, [cat, sort]);

  return (
    <div className="bg-cream-50">
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-12 md:pt-16 pb-6">
        <span className="text-[12px] uppercase tracking-[0.22em] text-ember-600 font-medium">The catalogue</span>
        <h1 className="mt-3 font-display text-[40px] md:text-[64px] leading-[1.02] tracking-[-0.02em] text-ink">
          Every candle, in one place.
        </h1>
        <p className="mt-4 max-w-[58ch] text-clay-700">
          Hand-poured soy candles in four collections — pick by scent, by season, or by the room you want to slow down.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8 sticky top-16 z-20 bg-cream-50/95 backdrop-blur border-b border-cream-200">
        <div className="flex flex-wrap items-center justify-between gap-3 py-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
            <Pill active={cat === 'all'} onClick={() => setCat('all')}>All</Pill>
            {CATEGORIES.map((c) => (
              <Pill key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)}>
                {c.label}
              </Pill>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="text-[13px] border border-cream-200 bg-white rounded-full px-4 py-2 text-ink"
            aria-label="Sort products"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
          </select>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8 py-10 md:py-14">
        {products.length === 0 ? (
          <div className="py-24 text-center text-clay-700">No candles match this filter.</div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function Pill({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'whitespace-nowrap rounded-full px-4 py-2 text-[13px] transition-colors border',
        active
          ? 'bg-ink text-cream-50 border-ink'
          : 'bg-white text-ink border-cream-200 hover:border-ink/30',
      )}
    >
      {children}
    </button>
  );
}
