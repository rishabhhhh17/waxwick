'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ShoppingBag, Menu, X, Search, ChevronDown } from 'lucide-react';
import { useCart } from '@/lib/cart-store';
import { cn } from '@/lib/utils';

type ShopGroup = {
  label: string;
  href: string;
  blurb: string;
  items: { label: string; href: string; image: string; tagline: string }[];
};

const SHOP_MENU: ShopGroup[] = [
  {
    label: 'Whispering Heritage',
    href: '/products?c=whispering-heritage',
    blurb: '120 ml soy candles. Slow burn, classic scents.',
    items: [
      { label: 'Coffee Roast', href: '/products/coffee-roast', image: '/images/coffee-roast.jpg', tagline: 'Coorg’s heart' },
      { label: 'Sandalwood', href: '/products/sandalwood', image: '/images/sandalwood.jpg', tagline: 'Mysore, forever' },
      { label: 'Royal Kashmiri Saffron', href: '/products/royal-kashmiri-saffron', image: '/images/royal-kashmiri-saffron.jpg', tagline: 'Kashmir hills' },
      { label: 'Lily Bloom', href: '/products/lily-bloom', image: '/images/lily-bloom.jpg', tagline: 'Nilgiri morning' },
    ],
  },
  {
    label: 'Latte Collection',
    href: '/products?c=latte-collection',
    blurb: '220 ml wood-lid jars. Dessert-soft scents.',
    items: [
      { label: 'Vanilla Latte', href: '/products/vanilla-latte', image: '/images/vanilla-latte.jpg', tagline: 'Soft, sweet, all hours' },
      { label: 'Lavender Latte', href: '/products/lavender-latte', image: '/images/lavender-latte.jpg', tagline: 'Calm, served warm' },
      { label: 'Iced Latte', href: '/products/iced-latte', image: '/images/iced-latte.jpg', tagline: 'Cool brew, warm glow' },
      { label: 'Biscoff Caramel', href: '/products/biscoff-caramel-latte', image: '/images/biscoff-caramel-latte.jpg', tagline: 'Spiced cookie crumble' },
    ],
  },
  {
    label: 'Heritage Gifting',
    href: '/products?c=heritage-gifting',
    blurb: 'Pre-wrapped duos in our navy gift box.',
    items: [
      { label: 'Coffee × Saffron', href: '/products/heritage-gift-coffee-saffron', image: '/images/heritage-gift-coffee-saffron.jpg', tagline: 'Bestselling duo' },
      { label: 'Sandal × Lily', href: '/products/heritage-gift-sandal-lily', image: '/images/heritage-gift-sandal-lily.jpg', tagline: 'Warm-then-fresh' },
      { label: 'Premium Duo', href: '/products/heritage-gift-duo-premium', image: '/images/heritage-gift-duo-premium.jpg', tagline: 'Saffron + Sandal' },
      { label: 'Classic Duo', href: '/products/heritage-gift-duo-classic', image: '/images/heritage-gift-duo-classic.jpg', tagline: 'Pick any two' },
    ],
  },
  {
    label: 'Bespoke Diwali',
    href: '/products?c=bespoke-diwali',
    blurb: 'Hand-sculpted festive centrepieces, 5–7 wicks.',
    items: [
      { label: 'Gulmohar', href: '/products/gulmohar', image: '/images/gulmohar.jpg', tagline: 'Festive flame' },
      { label: 'Kamal Vatika', href: '/products/kamal-vatika', image: '/images/kamal-vatika.jpg', tagline: 'A garden of lotuses' },
      { label: 'Kamal Pushp', href: '/products/kamal-pushp', image: '/images/kamal-pushp.jpg', tagline: 'Cluster of blossoms' },
      { label: 'Neel Pushp', href: '/products/neel-pushp', image: '/images/neel-pushp.jpg', tagline: 'A single blue rose' },
    ],
  },
];

const ANNOUNCE = [
  '✦ Free shipping on orders over ₹999',
  '✦ Hand-poured to order in Bangalore',
  '✦ 100% natural soy wax · toxin-free',
];

export default function Navbar() {
  const { setOpen, count } = useCart();
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
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

  // Close menu on Escape, and on route change
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setHoverIdx(null); setMobile(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {/* Animated announcement bar */}
      <div className="bg-clay-900 text-cream-100 text-[12px] tracking-wide overflow-hidden">
        <div className="flex gap-12 kbd-marquee whitespace-nowrap py-2.5">
          {[...ANNOUNCE, ...ANNOUNCE, ...ANNOUNCE].map((t, i) => (
            <span key={i} className="px-6 uppercase tracking-[0.20em] text-[11.5px]">{t}</span>
          ))}
        </div>
      </div>

      {/* Sticky main header */}
      <header
        onMouseLeave={() => setHoverIdx(null)}
        className={cn(
          'sticky top-0 z-40 transition-all border-b',
          scrolled ? 'bg-cream-50/95 backdrop-blur-md border-cream-200 shadow-soft' : 'bg-cream-50/80 backdrop-blur-sm border-transparent',
        )}
      >
        <div className="mx-auto max-w-[1400px] px-5 md:px-8 h-[68px] flex items-center justify-between gap-6">
          {/* Mobile / tablet menu trigger (hidden once desktop nav appears at lg) */}
          <button
            className="lg:hidden p-2 -ml-2 text-ink hover:bg-cream-100 rounded-full transition-colors shrink-0"
            onClick={() => setMobile(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo — left-aligned, in flow */}
          <Link
            href="/"
            className="font-display text-[24px] md:text-[26px] tracking-[-0.01em] text-ink shrink-0 leading-none whitespace-nowrap"
          >
            Wic <span className="italic text-ember-500">&amp;</span> Whisper<span className="text-ember-500">.</span>
          </Link>

          {/* Desktop primary nav — between logo and utilities */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {SHOP_MENU.map((g, i) => (
              <button
                key={g.href}
                onMouseEnter={() => setHoverIdx(i)}
                onFocus={() => setHoverIdx(i)}
                onClick={() => { window.location.href = g.href; }}
                className={cn(
                  'inline-flex items-center gap-1 px-3 py-2 text-[13.5px] tracking-wide text-clay-700 hover:text-ink rounded-full transition-colors whitespace-nowrap',
                  hoverIdx === i && 'text-ink bg-cream-100',
                )}
              >
                {g.label}
                <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', hoverIdx === i && 'rotate-180')} />
              </button>
            ))}
            <Link href="/about" className="px-3 py-2 text-[13.5px] text-clay-700 hover:text-ink rounded-full whitespace-nowrap">
              Our story
            </Link>
          </nav>

          {/* Right utilities */}
          <div className="flex items-center gap-1 shrink-0">
            <Link href="/products" className="hidden md:inline-flex p-2 hover:bg-cream-100 rounded-full text-ink transition-colors" aria-label="Search products">
              <Search className="w-[18px] h-[18px]" />
            </Link>
            <Link href="/products" className="hidden md:inline-flex btn-primary btn-sm ml-1">
              Shop now
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open cart"
              className="relative p-2 rounded-full hover:bg-cream-100 transition-colors text-ink"
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              {c > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-ember-500 text-white text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-semibold">
                  {c}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mega-menu panel */}
        <div
          className={cn(
            'hidden md:block absolute left-0 right-0 top-full bg-cream-50 border-b border-cream-200 transition-all duration-200 ease-out origin-top',
            hoverIdx === null
              ? 'opacity-0 -translate-y-1 pointer-events-none'
              : 'opacity-100 translate-y-0',
          )}
          onMouseEnter={() => { /* keep open */ }}
        >
          {hoverIdx !== null && (
            <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-8 grid grid-cols-[260px_1fr] gap-12">
              <div>
                <p className="text-[12px] uppercase tracking-[0.22em] text-ember-600 font-medium">
                  Collection
                </p>
                <h3 className="mt-2 font-display text-[28px] leading-tight text-ink">
                  {SHOP_MENU[hoverIdx].label}
                </h3>
                <p className="mt-3 text-[14px] text-clay-700 max-w-[28ch]">
                  {SHOP_MENU[hoverIdx].blurb}
                </p>
                <Link
                  href={SHOP_MENU[hoverIdx].href}
                  className="mt-5 inline-flex items-center text-[13px] text-ink underline decoration-ember-500/40 underline-offset-4 hover:decoration-ember-500"
                  onClick={() => setHoverIdx(null)}
                >
                  Shop the collection →
                </Link>
              </div>
              <div className="grid grid-cols-4 gap-5">
                {SHOP_MENU[hoverIdx].items.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    onClick={() => setHoverIdx(null)}
                    className="group block"
                  >
                    <div className="relative aspect-square rounded-md overflow-hidden bg-cream-100">
                      <Image
                        src={it.image}
                        alt={it.label}
                        fill
                        sizes="200px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="mt-2 text-[14px] text-ink leading-tight">{it.label}</div>
                    <div className="text-[12px] text-clay-700">{it.tagline}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-50 md:hidden transition-opacity',
          mobile ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
      >
        <div
          onClick={() => setMobile(false)}
          className="absolute inset-0 bg-ink/30"
        />
        <aside
          className={cn(
            'absolute left-0 top-0 bottom-0 w-[88%] max-w-sm bg-cream-50 shadow-2xl transition-transform duration-300',
            mobile ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <div className="px-5 h-[68px] flex items-center justify-between border-b border-cream-200">
            <Link href="/" onClick={() => setMobile(false)} className="font-display text-2xl tracking-tight whitespace-nowrap">
              Wic <span className="italic text-ember-500">&amp;</span> Whisper<span className="text-ember-500">.</span>
            </Link>
            <button onClick={() => setMobile(false)} aria-label="Close menu" className="p-2 -mr-2 rounded-full hover:bg-cream-100">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="overflow-y-auto h-[calc(100vh-68px)] px-5 py-6">
            <Link
              href="/products"
              onClick={() => setMobile(false)}
              className="btn-primary w-full mb-6"
            >
              Shop all candles
            </Link>
            <p className="text-[12px] uppercase tracking-[0.22em] text-clay-700 mb-3">Collections</p>
            <ul className="divide-y divide-cream-200">
              {SHOP_MENU.map((g) => (
                <li key={g.href}>
                  <Link
                    href={g.href}
                    onClick={() => setMobile(false)}
                    className="flex items-center justify-between py-4 text-ink"
                  >
                    <div>
                      <div className="font-display text-[22px] leading-tight">{g.label}</div>
                      <div className="text-[12.5px] text-clay-700 mt-0.5">{g.blurb}</div>
                    </div>
                    <span className="text-clay-700">→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-[12px] uppercase tracking-[0.22em] text-clay-700 mt-8 mb-3">Brand</p>
            <ul className="divide-y divide-cream-200">
              {[
                { href: '/about', label: 'Our story' },
                { href: '/wholesale', label: 'Wholesale & gifting' },
                { href: '/contact', label: 'Contact' },
                { href: '/shipping', label: 'Shipping & returns' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={() => setMobile(false)} className="block py-3.5 text-[15px] text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
