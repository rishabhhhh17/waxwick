'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-store';
import { formatINR } from '@/lib/utils';
import { ChevronLeft, Loader2 } from 'lucide-react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay?: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, subtotalPaise, clear } = useCart();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq && lines.length > 0) {
      window.fbq('track', 'InitiateCheckout', {
        currency: 'INR',
        value: subtotalPaise() / 100,
        content_ids: lines.map((l) => l.productId),
        num_items: lines.reduce((a, l) => a + l.qty, 0),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function set<K extends keyof typeof form>(k: K, v: string) { setForm((f) => ({ ...f, [k]: v })); }
  const subtotal = subtotalPaise();
  const shipping = subtotal >= 99900 ? 0 : 6900; // free over ₹999
  const total = subtotal + shipping;

  async function pay(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (!form.name || !form.email || !form.phone || !form.line1 || !form.city || !form.state || !form.pincode) {
      setErr('Please fill all required fields.');
      return;
    }
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, '').slice(-10))) {
      setErr('Please enter a 10-digit phone number.');
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
      setErr('Please enter a valid email.');
      return;
    }

    setBusy(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          items: lines.map((l) => ({ variantId: l.variantId, qty: l.qty })),
          customer: { name: form.name, email: form.email, phone: form.phone },
          shipping: {
            line1: form.line1, line2: form.line2,
            city: form.city, state: form.state, pincode: form.pincode,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'order_failed');

      const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!key) throw new Error('Razorpay key missing');
      if (!window.Razorpay) throw new Error('Razorpay script not loaded');

      const rzp = new window.Razorpay({
        key,
        amount: data.amount,
        currency: data.currency,
        name: 'Wic & Whisper',
        description: 'Hand-poured candles',
        order_id: data.razorpay_order_id,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: '#b85f24' },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: async (resp: any) => {
          try {
            const cartPayload = {
              event_id: data.event_id,
              order_id: resp.razorpay_order_id,
              payment_id: resp.razorpay_payment_id,
              total_paise: total,
              currency: 'INR',
              customer: { name: form.name, email: form.email, phone: form.phone },
              items: lines.map((l) => ({
                product_id: l.productId,
                name: l.name,
                variant: l.variantLabel,
                qty: l.qty,
                unit_paise: l.unit_price_paise,
                line_paise: l.unit_price_paise * l.qty,
                image: l.image,
              })),
            };
            const verifyRes = await fetch('/api/orders/verify', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: resp.razorpay_order_id,
                razorpay_payment_id: resp.razorpay_payment_id,
                razorpay_signature: resp.razorpay_signature,
                event_id: data.event_id,
                customer: { email: form.email, phone: form.phone },
                items: cartPayload.items,
                total_paise: total,
              }),
            });
            const verifyJson = await verifyRes.json();
            if (!verifyJson.ok) throw new Error('verify_failed');

            try {
              sessionStorage.setItem(
                `fb_purchase_${resp.razorpay_order_id}`,
                JSON.stringify(cartPayload),
              );
            } catch {}
            clear();
            router.push(`/order-confirmation/${resp.razorpay_order_id}?p=${resp.razorpay_payment_id}`);
          } catch (e) {
            console.error(e);
            setErr('Payment captured but verification failed. Please contact support with your payment ID.');
            setBusy(false);
          }
        },
        modal: {
          ondismiss: () => { setBusy(false); },
        },
      });
      rzp.open();
    } catch (e) {
      console.error(e);
      setErr(e instanceof Error ? e.message : 'Could not start payment.');
      setBusy(false);
    }
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 md:px-8 py-24 text-center">
        <h1 className="font-display text-4xl text-ink">Your cart is empty.</h1>
        <p className="mt-3 text-clay-700">Pick a candle to begin.</p>
        <Link href="/products" className="btn-primary mt-8 inline-flex">Browse candles</Link>
      </div>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-10 pb-20">
        <Link href="/products" className="inline-flex items-center text-[13px] text-clay-700 hover:text-ink">
          <ChevronLeft className="w-4 h-4 mr-1" /> Continue shopping
        </Link>
        <h1 className="mt-4 font-display text-[40px] md:text-[56px] leading-tight text-ink">Checkout</h1>

        <div className="mt-10 grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16">
          <form onSubmit={pay} className="space-y-8">
            <Section title="Contact">
              <Field label="Full name" required value={form.name} onChange={(v) => set('name', v)} />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Email" type="email" required value={form.email} onChange={(v) => set('email', v)} />
                <Field label="Phone (10 digits)" type="tel" required value={form.phone} onChange={(v) => set('phone', v)} />
              </div>
            </Section>

            <Section title="Shipping address">
              <Field label="Address line 1" required value={form.line1} onChange={(v) => set('line1', v)} />
              <Field label="Address line 2 (apartment, landmark)" value={form.line2} onChange={(v) => set('line2', v)} />
              <div className="grid sm:grid-cols-3 gap-4">
                <Field label="City" required value={form.city} onChange={(v) => set('city', v)} />
                <Field label="State" required value={form.state} onChange={(v) => set('state', v)} />
                <Field label="Pincode" required value={form.pincode} onChange={(v) => set('pincode', v)} />
              </div>
            </Section>

            {err && (
              <div className="text-[14px] text-error bg-ember-50 border border-ember-100 rounded-md p-3">
                {err}
              </div>
            )}

            <button type="submit" disabled={busy} className="btn-primary w-full">
              {busy ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Opening Razorpay…</>) : (<>Pay {formatINR(total)}</>)}
            </button>
            <p className="text-[12px] text-clay-700 text-center">
              Payments are processed securely by Razorpay. Save this page or screenshot it once your order is placed — your order ID is your reference.
            </p>
          </form>

          <aside className="bg-white border border-cream-200 rounded-xl2 p-6 h-fit lg:sticky lg:top-24">
            <h3 className="font-display text-2xl text-ink">Order summary</h3>
            <ul className="mt-4 space-y-4">
              {lines.map((l) => (
                <li key={l.variantId} className="flex gap-3">
                  <div className="relative w-16 h-20 shrink-0 rounded-md overflow-hidden bg-cream-100">
                    <Image src={l.image} alt={l.name} fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-ink text-[14px] truncate">{l.name}</div>
                    <div className="text-[12px] text-clay-700">{l.variantLabel} · Qty {l.qty}</div>
                  </div>
                  <div className="text-[14px] text-ink shrink-0">{formatINR(l.unit_price_paise * l.qty)}</div>
                </li>
              ))}
            </ul>
            <div className="border-t border-cream-200 mt-5 pt-4 space-y-2 text-[14px]">
              <Row k="Subtotal" v={formatINR(subtotal)} />
              <Row k="Shipping" v={shipping === 0 ? 'Free' : formatINR(shipping)} />
              <div className="flex justify-between text-ink font-medium border-t border-cream-200 pt-3 mt-3">
                <span>Total</span>
                <span>{formatINR(total)}</span>
              </div>
            </div>
            <p className="text-[12px] text-clay-700 mt-4">
              Hand-poured within 48 hours · Ships across India.
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-2xl text-ink">{title}</h2>
      {children}
    </section>
  );
}
function Field({ label, value, onChange, type = 'text', required = false }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-[12px] uppercase tracking-[0.18em] text-clay-700">{label}{required && ' *'}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full bg-white border border-cream-200 rounded-md px-3.5 py-3 text-[15px] text-ink focus:outline-none focus:border-ember-500 focus:ring-1 focus:ring-ember-500"
      />
    </label>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between text-clay-700"><span>{k}</span><span className="text-ink">{v}</span></div>
  );
}
