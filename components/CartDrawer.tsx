'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart-store';
import { formatINR } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function CartDrawer() {
  const { open, setOpen, lines, setQty, remove, subtotalPaise } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-ink/40 z-40 transition-opacity ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-cream-50 z-50 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="px-5 h-16 flex items-center justify-between border-b border-cream-200">
          <h3 className="font-display text-xl text-ink">Your cart</h3>
          <button onClick={() => setOpen(false)} aria-label="Close cart" className="p-2 rounded-full hover:bg-cream-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-cream-100 flex items-center justify-center mb-4">
              <ShoppingBag className="w-6 h-6 text-ember-500" />
            </div>
            <h4 className="font-display text-2xl text-ink">Your cart is empty</h4>
            <p className="mt-2 text-clay-700 text-sm max-w-[28ch]">
              Pick a candle and we’ll hand-pour it fresh for your order.
            </p>
            <button
              onClick={() => { setOpen(false); router.push('/products'); }}
              className="btn-primary mt-6"
            >
              Browse candles
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {lines.map((l) => (
                <div key={l.variantId} className="flex gap-4">
                  <div className="relative w-20 h-24 shrink-0 bg-cream-100 rounded-md overflow-hidden">
                    <Image src={l.image} alt={l.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${l.slug}`} onClick={() => setOpen(false)} className="block font-display text-lg text-ink truncate">
                      {l.name}
                    </Link>
                    <div className="text-[12px] text-clay-700 mt-0.5">{l.variantLabel}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center border border-cream-200 rounded-full">
                        <button onClick={() => setQty(l.variantId, l.qty - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-cream-100 rounded-l-full" aria-label="Decrease">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm">{l.qty}</span>
                        <button onClick={() => setQty(l.variantId, l.qty + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-cream-100 rounded-r-full" aria-label="Increase">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-sm font-medium text-ink">{formatINR(l.unit_price_paise * l.qty)}</div>
                    </div>
                    <button onClick={() => remove(l.variantId)} className="text-[12px] text-clay-700 underline mt-2">Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-cream-200 px-5 py-5 bg-cream-50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-clay-700">Subtotal</span>
                <span className="font-medium text-ink">{formatINR(subtotalPaise())}</span>
              </div>
              <div className="text-[12px] text-clay-700 mt-1">Shipping &amp; taxes calculated at checkout.</div>
              <button
                onClick={() => { setOpen(false); router.push('/checkout'); }}
                className="btn-primary w-full mt-4"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
