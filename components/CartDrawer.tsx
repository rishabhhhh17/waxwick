'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart-store';
import { formatINR } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function CartDrawer() {
  const {
    open, setOpen, lines, setQty, remove,
    subtotalPaise, discountCode, discountPaise, finalTotalPaise,
    applyCode, removeCode,
  } = useCart();
  const router = useRouter();
  const subtotal = subtotalPaise();
  const discount = discountPaise();
  const total = finalTotalPaise();

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

            <div className="border-t border-cream-200 px-5 py-5 bg-cream-50 space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-clay-700">Subtotal</span>
                <span className="font-medium text-ink">{formatINR(subtotal)}</span>
              </div>
              {discountCode && discount > 0 ? (
                <div className="flex items-center justify-between text-sm text-ember-600">
                  <span>
                    Discount{' '}
                    <span className="font-mono text-xs">({discountCode})</span>
                  </span>
                  <span className="font-medium">−{formatINR(discount)}</span>
                </div>
              ) : null}
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink">Total</span>
                <span className="font-medium text-ink">{formatINR(total)}</span>
              </div>
              <CouponInput
                discountCode={discountCode}
                applyCode={applyCode}
                removeCode={removeCode}
              />
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

function CouponInput({
  discountCode,
  applyCode,
  removeCode,
}: {
  discountCode: string | null;
  applyCode: (code: string) => { ok: true } | { ok: false; error: string };
  removeCode: () => void;
}) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (discountCode) {
    return (
      <div className="flex items-center justify-between border border-ember-300 bg-ember-50 px-3 py-2 text-xs rounded-md">
        <span>
          Code applied:{' '}
          <span className="font-mono font-semibold tracking-wider">{discountCode}</span>
        </span>
        <button
          type="button"
          onClick={removeCode}
          aria-label="Remove discount code"
          className="h-6 w-6 grid place-items-center hover:bg-cream-100 rounded-full"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        const result = applyCode(value);
        if (result.ok) setValue('');
        else setError(result.error);
      }}
      className="space-y-1"
    >
      <div className="flex border border-cream-200 bg-white rounded-md overflow-hidden">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value.toUpperCase());
            if (error) setError(null);
          }}
          placeholder="Discount code"
          autoComplete="off"
          spellCheck={false}
          className="flex-1 bg-transparent px-3 py-2 text-sm uppercase tracking-wider focus:outline-none"
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="px-4 text-xs uppercase tracking-widest text-ink hover:bg-cream-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Apply
        </button>
      </div>
      {error ? (
        <p role="alert" className="text-[11px] text-ember-700">
          {error}
        </p>
      ) : null}
    </form>
  );
}
