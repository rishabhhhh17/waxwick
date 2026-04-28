'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS, CATEGORIES, getMinVariantPaise } from '@/lib/products';
import { cn } from '@/lib/utils';
import { ArrowRight, X, SlidersHorizontal } from 'lucide-react';

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'rating';
const PRICE_BUCKETS = [
  { id: 'all', label: 'Any price', min: 0, max: Infinity },
  { id: 'under500', label: 'Under ₹500', min: 0, max: 50000 },
  { id: '500-900', label: '₹500–₹900', min: 50000, max: 90000 },
  { id: 'over900', label: 'Over ₹900', min: 90000, max: Infinity },
] as const;

export default function ProductsClient() {
  const router = useRouter();
  const search = useSearchParams();

  const [cat, setCat] = useState<string>(search.get('c') ?? 'all');
  const [price, setPrice] = useState<string>('all');
  const [sort, setSort] = useState<Sort>('featured');

  // Sync URL when category changes (so the navbar links + back-button work)
  useEffect(() => {
    const params = new URLSearchParams();
    if (cat !== 'all') params.set('c', cat);
    const qs = params.toString();
    router.replace(qs ? `/products?${qs}` : '/products', { scroll: false });
  }, [cat, router]);

  const products = useMemo(() => {
    let xs = PRODUCTS.filter((p) => p.is_active);
    if (cat !== 'all') xs = xs.filter((p) => p.category === cat);
    const bucket = PRICE_BUCKETS.find((b) => b.id === price)!;
    xs = xs.filter((p) => {
      const m = getMinVariantPaise(p);
      return m >= bucket.min && m < bucket.max;
    });
    if (sort === 'price-asc')  xs = [...xs].sort((a, b) => getMinVariantPaise(a) - getMinVariantPaise(b));
    if (sort === 'price-desc') xs = [...xs].sort((a, b) => getMinVariantPaise(b) - getMinVariantPaise(a));
    if (sort === 'rating')     xs = [...xs].sort((a, b) => b.rating - a.rating);
    if (sort === 'featured')   xs = [...xs].sort((a, b) => Number(b.is_featured) - Number(a.is_featured));
    return xs;
  }, [cat, price, sort]);

  const filtersActive = cat !== 'all' || price !== 'all' || sort !== 'featured';
  const catLabel = cat === 'all' ? null : CATEGORIES.find((c) => c.slug === cat)?.label;
  const priceLabel = PRICE_BUCKETS.find((b) => b.id === price)?.label;

  function clearAll() { setCat('all'); setPrice('all'); setSort('featured'); }

  return (
    <div className="bg-cream-50">
      {/* Page header */}
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 pt-12 md:pt-20 pb-8 md:pb-12 grid md:grid-cols-[1.2fr_1fr] gap-10 items-end">
        <div>
          <span className="text-[12px] uppercase tracking-[0.22em] text-ember-600 font-medium">The catalogue</span>
          <h1 className="mt-3 font-display text-[44px] md:text-[80px] leading-[0.98] tracking-[-0.025em] text-ink">
            Every candle.<br />
            <span className="italic text-ember-500">In one place.</span>
          </h1>
        </div>
        <p className="text-clay-700 max-w-[52ch] text-[16px] leading-[1.7]">
          Hand-poured soy candles in four collections — pick by scent, by season, or by the room
          you want to slow down. Free shipping on orders over ₹999.
        </p>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-[68px] z-20 bg-cream-50/95 backdrop-blur border-y border-cream-200">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-4 flex flex-wrap items-center gap-3">
          <SlidersHorizontal className="w-4 h-4 text-clay-700 hidden md:block" />
          <span className="text-[12px] uppercase tracking-[0.18em] text-clay-700 hidden md:inline">Filter</span>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 flex-1 min-w-0">
            <Pill active={cat === 'all'} onClick={() => setCat('all')}>All</Pill>
            {CATEGORIES.map((c) => (
              <Pill key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)}>
                {c.label}
              </Pill>
            ))}
          </div>

          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="text-[13px] border border-cream-200 bg-white rounded-full px-4 py-2 text-ink h-[38px] min-w-[140px]"
            aria-label="Filter by price"
          >
            {PRICE_BUCKETS.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="text-[13px] border border-cream-200 bg-white rounded-full px-4 py-2 text-ink h-[38px] min-w-[150px]"
            aria-label="Sort products"
          >
            <option value="featured">Sort: Featured</option>
            <option value="rating">Highest rated</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
          </select>
          {filtersActive && (
            <button onClick={clearAll} className="text-[13px] text-ember-600 hover:text-ember-700 underline decoration-ember-500/40 underline-offset-4 inline-flex items-center">
              Clear <X className="w-3.5 h-3.5 ml-1" />
            </button>
          )}
        </div>
      </div>

      {/* Active filter summary + count */}
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 mt-6 flex flex-wrap items-center gap-2">
        <span className="text-[13px] text-clay-700">
          Showing <span className="text-ink font-medium">{products.length}</span>
          {products.length === 1 ? ' candle' : ' candles'}
        </span>
        {catLabel && <FilterChip label={catLabel} onClear={() => setCat('all')} />}
        {priceLabel && price !== 'all' && <FilterChip label={priceLabel} onClear={() => setPrice('all')} />}
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-10 md:py-14">
        {products.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-3xl text-ink">No candles match this filter.</p>
            <p className="mt-2 text-clay-700">Try clearing one of your filters above.</p>
            <button onClick={clearAll} className="btn-primary mt-6">
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="mt-16 bg-cream-100 border border-cream-200 rounded-[24px] p-8 md:p-12 text-center">
              <span className="text-[12px] uppercase tracking-[0.22em] text-ember-600 font-medium">Need a hand?</span>
              <h2 className="mt-2 font-display text-[28px] md:text-[40px] leading-tight text-ink">
                Not sure which scent fits your room?
              </h2>
              <p className="mt-3 text-clay-700 max-w-[52ch] mx-auto">
                Email <a href="mailto:hello@waxwick.in" className="underline">hello@waxwick.in</a> with the room and the mood — we’ll recommend a candle in one reply.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/products?c=heritage-gifting" className="btn-primary">Shop gift duos <ArrowRight className="w-4 h-4 ml-2" /></Link>
                <Link href="/contact" className="btn-outline">Talk to us</Link>
              </div>
            </div>
          </>
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
        'whitespace-nowrap rounded-full px-4 py-2 text-[13px] transition-colors border h-[38px] inline-flex items-center',
        active
          ? 'bg-ink text-cream-50 border-ink'
          : 'bg-white text-ink border-cream-200 hover:border-ink/30',
      )}
    >
      {children}
    </button>
  );
}

function FilterChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-cream-100 border border-cream-200 rounded-full pl-3 pr-1 py-1 text-[12px] text-ink">
      {label}
      <button onClick={onClear} aria-label={`Clear ${label}`} className="w-5 h-5 rounded-full hover:bg-cream-200 flex items-center justify-center">
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}
