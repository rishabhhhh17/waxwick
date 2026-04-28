import { NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/razorpay';
import { fireServerPurchase } from '@/lib/meta';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const raw = await req.text(); // signature is over raw bytes
  const sig = req.headers.get('x-razorpay-signature') ?? '';
  if (!sig) return NextResponse.json({ error: 'missing_signature' }, { status: 400 });

  let ok = false;
  try {
    ok = await verifyWebhookSignature(raw, sig);
  } catch (e) {
    console.error('[webhook] verify error', e);
    return NextResponse.json({ error: 'verify_failed' }, { status: 500 });
  }
  if (!ok) return NextResponse.json({ error: 'bad_signature' }, { status: 400 });

  let event: { event?: string; payload?: any };
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const name = event.event;
  if (name !== 'payment.captured' && name !== 'order.paid') {
    return NextResponse.json({ ignored: name });
  }

  try {
    const payment = event.payload?.payment?.entity;
    const order = event.payload?.order?.entity;
    const notes = (payment?.notes || order?.notes) ?? {};
    const event_id = notes.event_id as string | undefined;
    const email = notes.customer_email as string | undefined;
    const phone = notes.customer_phone as string | undefined;
    let items: Array<{ product_id: string; qty: number }> = [];
    try {
      items = JSON.parse((notes.items as string) ?? '[]');
    } catch {
      items = [];
    }
    const amount: number = payment?.amount ?? order?.amount_paid ?? 0;

    if (event_id) {
      await fireServerPurchase({
        event_id,
        email,
        phone,
        value_inr: amount / 100,
        content_ids: items.map((i) => i.product_id),
        num_items: items.reduce((a, i) => a + (i.qty || 1), 0),
      });
    }
  } catch (e) {
    console.error('[webhook] handler error (ignored)', e);
  }

  return NextResponse.json({ ok: true });
}
