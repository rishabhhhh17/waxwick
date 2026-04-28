import { NextResponse } from 'next/server';
import { verifyOrderSignature } from '@/lib/razorpay';
import { fireServerPurchase } from '@/lib/meta';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  let body: {
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
    event_id?: string;
    customer?: { email?: string; phone?: string };
    items?: Array<{ product_id: string; qty: number; line_paise: number }>;
    total_paise?: number;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, event_id } = body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 });
  }

  const ok = await verifyOrderSignature({
    order_id: razorpay_order_id,
    payment_id: razorpay_payment_id,
    signature: razorpay_signature,
  });
  if (!ok) {
    return NextResponse.json({ ok: false, error: 'bad_signature' }, { status: 400 });
  }

  // Fire CAPI Purchase. If the webhook fires the same event_id, Meta dedupes.
  if (event_id && body.items && body.total_paise) {
    const num_items = body.items.reduce((a, l) => a + l.qty, 0);
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    await fireServerPurchase({
      event_id,
      email: body.customer?.email,
      phone: body.customer?.phone,
      value_inr: body.total_paise / 100,
      content_ids: body.items.map((i) => i.product_id),
      num_items,
      client_ip: ip,
      client_user_agent: req.headers.get('user-agent') ?? undefined,
      source_url: req.headers.get('referer') ?? undefined,
    });
  }

  return NextResponse.json({ ok: true });
}
