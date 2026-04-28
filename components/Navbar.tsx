'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/lib/cart-store';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/products', label: 'Shop all' },
  { href: '/products?c=whispering-heritage', label: 'Heritage' },
  { href: '/products?c=latte-collection', label: 'Latte' },
  { href: '/products?c=heritage-gifting', label: 'Gifting' },
  { href: '/products?c=bespoke-diwali', label: 'Diwali' },
];

export default function Navbar() {
  const { setOpen, count } = useCart();
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [c, setC] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const unsub = useCart.subscribe((s) => setC(s.lines.reduce((a, l) => a + l.qty, 0)));
    setC(count());
    return () => unsub();
  }, [count]);

  return (
    <>
      <div className="bg-clay-900 text-cream-100 text-[12px] tracking-wide">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-2.5 flex items-center justify-center text-center">
          Free shipping on orders over ₹999 · Hand-poured in Bangalore
        </div>
      </div>

      <header
        className={cn(
          'sticky top-0 z-40 border-b transition-all backdrop-blur',
          scrolled
            ? 'bg-cream-50/90 border-cream-200'
            : 'bg-cream-50/70 border-transparent',
        )}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8 h-16 flex items-center justify-between gap-6">
          <button
            className="md:hidden p-2 -ml-2 text-ink"
            onClick={() => setMobile(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="font-display text-2xl tracking-tight text-ink">
            waxwick<span className="text-ember-500">.</span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[14px] text-clay-700 hover:text-ink transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/products" className="hidden md:inline-flex btn-primary btn-sm">
              Shop now
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open cart"
              className="relative p-2 rounded-full hover:bg-cream-100 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-ink" />
              {c > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-ember-500 text-white text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-medium">
                  {c}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {mobile && (
        <div className="fixed inset-0 z-50 bg-cream-50">
          <div className="px-5 h-16 flex items-center justify-between border-b border-cream-200">
            <Link href="/" onClick={() => setMobile(false)} className="font-display text-2xl">
              waxwick<span className="text-ember-500">.</span>
            </Link>
            <button onClick={() => setMobile(false)} aria-label="Close menu" className="p-2">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex flex-col p-5 gap-1">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobile(false)}
                className="font-display text-3xl py-3 border-b border-cream-200 text-ink"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/products"
              onClick={() => setMobile(false)}
              className="btn-primary mt-6"
            >
              Shop now
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
