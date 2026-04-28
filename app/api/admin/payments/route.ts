import { NextResponse } from 'next/server';
import { razorpay } from '@/lib/razorpay';
import { verifyAdmin } from '@/lib/admin-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const url = new URL(req.url);
  const count = Math.min(100, Math.max(1, Number(url.searchParams.get('count') ?? '100') || 100));
  try {
    // razorpay sdk expects positional or {} options
    const res = await razorpay().payments.all({ count });
    return NextResponse.json({ items: res.items ?? [] });
  } catch (e) {
    console.error('[admin/payments] failed', e);
    return NextResponse.json({ error: 'razorpay_error' }, { status: 502 });
  }
}
