'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Truck, Mail, Sparkles } from 'lucide-react';
import { formatINR } from '@/lib/utils';

type Payload = {
  event_id: string;
  order_id: string;
  payment_id: string;
  total_paise: number;
  currency: string;
  customer: { name: string; email: string; phone: string };
  items: Array<{
    product_id: string;
    name: string;
    variant: string;
    qty: number;
    unit_paise: number;
    line_paise: number;
    image: string;
  }>;
};

export default function ConfirmationClient() {
  const params = useParams<{ orderId: string }>();
  const search = useSearchParams();
  const [payload, setPayload] = useState<Payload | null>(null);
  const [loading, setLoading] = useState(true);
  const fired = useRef(false);
  const paymentId = search.get('p') ?? '';

  useEffect(() => {
    const key = `fb_purchase_${params.orderId}`;
    let p: Payload | null = null;
    try {
      const raw = sessionStorage.getItem(key);
      if (raw) p = JSON.parse(raw);
    } catch {}
    setPayload(p);
    setLoading(false);

    if (!fired.current && p && typeof window !== 'undefined' && window.fbq) {
      fired.current = true;
      window.fbq('track', 'Purchase', {
        currency: p.currency,
        value: p.total_paise / 100,
        content_ids: p.items.map((i) => i.product_id),
        content_type: 'product',
        num_items: p.items.reduce((a, i) => a + i.qty, 0),
      }, { eventID: p.event_id });
      // Don't clear the storage immediately — useRef guard is enough for strict-mode replay,
      // and a refresh of the thank-you page will still show details.
    }
  }, [params.orderId]);

  return (
    <div className="bg-cream-50 min-h-[70vh]">
      <div className="mx-auto max-w-3xl px-5 md:px-8 py-16 md:py-24">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-ember-100 text-ember-600">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h1 className="mt-5 font-display text-[40px] md:text-[56px] leading-[1.05] text-ink">Thank you.</h1>
          <p className="mt-3 text-clay-700 max-w-[48ch] mx-auto">
            Your order is confirmed and we’ve started hand-pouring it. Save this page or
            screenshot it — your order ID is your reference.
          </p>
        </div>

        <div className="mt-10 bg-white border border-cream-200 rounded-xl2 p-6 md:p-8">
          <div className="grid sm:grid-cols-2 gap-4 text-[13px]">
            <div>
              <div className="text-clay-700 uppercase tracking-[0.18em] text-[11px]">Order ID</div>
              <div className="font-mono text-ink mt-1 break-all">{params.orderId}</div>
            </div>
            <div>
              <div className="text-clay-700 uppercase tracking-[0.18em] text-[11px]">Payment ID</div>
              <div className="font-mono text-ink mt-1 break-all">{paymentId || '—'}</div>
            </div>
          </div>

          {!loading && payload && (
            <>
              <div className="mt-6 border-t border-cream-200 pt-6">
                <div className="text-clay-700 uppercase tracking-[0.18em] text-[11px] mb-3">Items</div>
                <ul className="space-y-3">
                  {payload.items.map((it, i) => (
                    <li key={i} className="flex gap-3 items-center">
                      <div className="relative w-14 h-16 rounded-md overflow-hidden bg-cream-100 shrink-0">
                        <Image src={it.image} alt={it.name} fill sizes="56px" className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-ink text-[14px] truncate">{it.name}</div>
                        <div className="text-[12px] text-clay-700">{it.variant} · Qty {it.qty}</div>
                      </div>
                      <div className="text-[14px] text-ink">{formatINR(it.line_paise)}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-5 border-t border-cream-200 pt-4 flex justify-between text-ink font-medium">
                <span>Total paid</span>
                <span>{formatINR(payload.total_paise)}</span>
              </div>
            </>
          )}
          {!loading && !payload && (
            <p className="mt-6 text-clay-700 text-[14px]">
              We have your payment. Item details aren’t available on this device — email us with your order ID and we’ll send confirmation.
            </p>
          )}
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          <Step icon={<Sparkles className="w-4 h-4" />} t="Hand poured" d="We pour your candle within 48 hours." />
          <Step icon={<Truck className="w-4 h-4" />} t="Ships to you" d="Tracked across India in 3–5 working days." />
          <Step icon={<Mail className="w-4 h-4" />} t="Need help?" d={`Email hello@wicwhisper.com with order ID ${params.orderId.slice(-8)}.`} />
        </div>

        <div className="mt-12 text-center">
          <Link href="/products" className="btn-outline">Back to the catalogue</Link>
        </div>
      </div>
    </div>
  );
}

function Step({ icon, t, d }: { icon: React.ReactNode; t: string; d: string }) {
  return (
    <div className="bg-white border border-cream-200 rounded-md p-4 text-left">
      <div className="w-8 h-8 rounded-full bg-cream-100 flex items-center justify-center text-ember-500">{icon}</div>
      <div className="mt-3 font-medium text-ink text-[14px]">{t}</div>
      <p className="text-[13px] text-clay-700 mt-1">{d}</p>
    </div>
  );
}
