'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

export default function StickyShopBar() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (dismissed) return;
      const y = window.scrollY;
      const h = window.innerHeight;
      // Show after 1.2 viewports of scroll
      setShow(y > h * 1.2);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-30 transition-all duration-300 ease-out px-4 ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
      }`}
      role="region"
      aria-label="Shop quick action"
    >
      <div className="bg-clay-900 text-cream-50 rounded-full shadow-warm flex items-center gap-1 pl-5 pr-1.5 py-1.5 border border-cream-100/10">
        <span className="hidden sm:inline text-[13px] tracking-wide text-cream-50/85 mr-2">
          Hand-poured fresh, ships in 48 hrs
        </span>
        <Link
          href="/products"
          className="bg-ember-500 hover:bg-ember-600 text-white font-medium text-[13px] px-4 py-2 rounded-full inline-flex items-center min-h-[40px] transition-colors"
        >
          Shop now <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
        </Link>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="ml-1 w-8 h-8 rounded-full hover:bg-cream-50/10 flex items-center justify-center text-cream-50/70"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
